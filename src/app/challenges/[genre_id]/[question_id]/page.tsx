"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import api from "@/lib/api";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import DifficultyChip from "@/components/ui/DifficultyChip";
import Input from "@/components/ui/Input";

type Question = {
  id: string;
  title: string;
  description: string;
  points?: number;
  difficulty?: "EASY" | "MEDIUM" | "HARD";
  is_solved: boolean;
};

type InstanceStatus = {
  start_timestamp: string;
  status: "PENDING" | "RUNNING" | "TERMINATED";
  public_ip: string | null;
  extension_count: number;
};

export default function QuestionPage() {
  const params = useParams<{ genre_id: string; question_id: string }>();
  const router = useRouter();
  const { genre_id, question_id } = params || {};
  const queryClient = useQueryClient();

  const [flag, setFlag] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);
  const [now, setNow] = useState(() => Date.now());

  const { data: question, isLoading, error } = useQuery<Question>({
    queryKey: ["question", question_id],
    queryFn: async () => {
      const res = await api.get(`/question/${question_id}`);
      const payload = res.data;
      return payload?.data ?? payload;
    },
    enabled: Boolean(question_id),
    retry: 2,
  });
  let challenge_id = question_id;

  // Tick every second for countdowns
  useEffect(() => {
    const id = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const {
    data: instance,
    isLoading: isInstanceLoading,
  } = useQuery<InstanceStatus | null>({
    queryKey: ["ec2-instance", question_id],
    enabled: Boolean(question_id),
    queryFn: async () => {
      if (!question_id) return null;
      try {
        const res = await api.get(`/ec2/status-from-db/${question_id}`);
        const payload = res.data;
        return payload?.data ?? null;
      } catch (err: any) {
        if (err?.response?.status === 404) {
          return null;
        }
        throw err;
      }
    },
  });

  const submitFlagMutation = useMutation<{ is_correct: boolean }, Error, void>({
    mutationFn: async () => {
      if (!question_id) throw new Error("Missing question id");
      const res = await api.post(`/question/${question_id}/flag`, { flag });
      return res.data as { is_correct: boolean };
    },
    onSuccess: (data) => {
      if (data?.is_correct) {
        setFeedback("Correct flag! Challenge solved.");
        setFlag("");
        queryClient.invalidateQueries({ queryKey: ["question", question_id] });
        queryClient.invalidateQueries({ queryKey: ["genre-questions", genre_id] });
      } else {
        setFeedback("Incorrect flag. Try again.");
      }
    },
    onError: () => {
      setFeedback("Something went wrong while submitting the flag.");
    },
  });

  const startInstanceMutation = useMutation<{ status: string; public_ip: string | null; reused: boolean; message: string }, Error, void>({
    mutationFn: async () => {
      if (!question_id) throw new Error("Missing question id");
      const res = await api.patch(`/ec2/start/${question_id}`);
      const payload = res.data;
      return payload?.data;
    },
    onSuccess: (data) => {
      if (data?.status === "RUNNING" && data.public_ip) {
        setFeedback("Machine already running.");
      } else {
        setFeedback("Machine starting. This may take up to a minute.");
      }
      queryClient.invalidateQueries({ queryKey: ["ec2-instance", question_id] });
    },
    onError: () => {
      setFeedback("Failed to start machine.");
    },
  });

  const terminateInstanceMutation = useMutation<unknown, Error, void>({
    mutationFn: async () => {
      if (!question_id) throw new Error("Missing question id");
      await api.patch(`/ec2/terminate/${question_id}`);
    },
    onSuccess: () => {
      setFeedback("Machine terminated.");
      queryClient.invalidateQueries({ queryKey: ["ec2-instance", question_id] });
    },
    onError: () => {
      setFeedback("Failed to terminate machine.");
    },
  });

  const extendInstanceMutation = useMutation<InstanceStatus, Error, void>({
    mutationFn: async () => {
      if (!question_id) throw new Error("Missing question id");
      const res = await api.patch(`/ec2/extend/${question_id}`);
      const payload = res.data;
      return payload?.data as InstanceStatus;
    },
    onSuccess: (data) => {
      setFeedback("Extended by 1 hour.");
      queryClient.setQueryData(["ec2-instance", question_id], data);
    },
    onError: () => {
      setFeedback("Failed to extend machine.");
    },
  });

  const bootCountdownSeconds = useMemo(() => {
    if (!instance || !instance.start_timestamp || instance.status !== "PENDING") return null;
    const startMs = new Date(instance.start_timestamp).getTime();
    const elapsed = Math.floor((now - startMs) / 1000);
    const remaining = 60 - elapsed;
    return remaining > 0 ? remaining : 0;
  }, [instance, now]);

  const expiryCountdownSeconds = useMemo(() => {
    if (!instance || !instance.start_timestamp) return null;
    const startMs = new Date(instance.start_timestamp).getTime();
    const hours = 1 + (instance.extension_count || 0);
    const expiryMs = startMs + hours * 60 * 60 * 1000;
    const remaining = Math.floor((expiryMs - now) / 1000);
    return remaining > 0 ? remaining : 0;
  }, [instance, now]);
  const canExtend =
    !!instance &&
    instance.status === "RUNNING" &&
    expiryCountdownSeconds !== null &&
    expiryCountdownSeconds <= 30 * 60 &&
    expiryCountdownSeconds > 0;

  useEffect(() => {
    // Only poll once initial 60s boot window has passed and while DB status is still PENDING
    if (!question_id || !instance || instance.status !== "PENDING") return;
    if (bootCountdownSeconds && bootCountdownSeconds > 0) return;

    const interval = setInterval(async () => {
      try {
        const res = await api.get(`/ec2/status/${question_id}`);
        const payload = res.data;
        const data = payload?.data as InstanceStatus;

        if (data?.public_ip && data.status === "RUNNING") {
          queryClient.setQueryData(["ec2-instance", question_id], data);
          clearInterval(interval);
        }
      } catch {
        // ignore transient errors
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [question_id, instance, bootCountdownSeconds, queryClient]);

  if (!question_id) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[color:var(--muted)]">
        Missing question id.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--primary)] mx-auto mb-4"></div>
          <p className="text-[color:var(--muted)]">Loading question...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card variant="elevated" className="max-w-md w-full">
          <CardBody className="text-center py-10 space-y-3">
            <div className="text-[color:var(--error)] font-semibold">Failed to load question</div>
            <p className="text-[color:var(--muted)]">Please refresh the page.</p>
            <Button onClick={() => router.refresh()}>Retry</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  if (!question) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[color:var(--muted)]">
        Question not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <Button variant="ghost" onClick={() => router.back()} className="mb-4">
              ← Back
            </Button>
            <h1 className="text-4xl font-bold text-[color:var(--text)]">{question.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            {typeof question.points === "number" && (
              <Badge variant="info" className="text-xs px-3 h-8 py-1">
                {question.points} pts
              </Badge>
            )}
            {question.difficulty && <DifficultyChip level={question.difficulty} />}
            <Badge variant={question.is_solved ? "success" : "default"} className="text-base px-4 py-2">
              {question.is_solved ? "✓ Solved" : "Unsolved"}
            </Badge>
          </div>
        </div>

        {/* Question Card */}
        <Card variant="elevated" className="border border-[color:var(--border)]">
          <CardHeader>
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-[color:var(--text)]">Question Details</h2>
            </div>
          </CardHeader>
          <CardBody className="space-y-6">
            <div>
              <h3 className="text-sm font-bold text-[color:var(--muted)] uppercase mb-2">Description</h3>
              <p className="text-[color:var(--text)]/90 leading-relaxed whitespace-pre-wrap">
                {question.description || "No description provided."}
              </p>
            </div>

            <div className="mt-4 space-y-3">
              <h3 className="text-sm font-bold text-[color:var(--muted)] uppercase mb-2">Machine</h3>
              {isInstanceLoading ? (
                <p className="text-[color:var(--muted)] text-sm">Checking machine status...</p>
              ) : !instance || instance.status === "TERMINATED" ? (
                <Button
                  variant="outline"
                  onClick={() => startInstanceMutation.mutate()}
                  disabled={startInstanceMutation.isPending}
                >
                  {startInstanceMutation.isPending ? "Starting..." : "Start Machine"}
                </Button>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-[color:var(--muted)]">
                    Status: <span className="text-[color:var(--text)]">{instance.status}</span>
                  </p>
                  {instance.public_ip && (
                    <p className="text-sm text-[color:var(--muted)]">
                      Public IP: <span className="text-[color:var(--text)] font-mono">{instance.public_ip}</span>
                    </p>
                  )}
                  {instance.status === "PENDING" && bootCountdownSeconds !== null && bootCountdownSeconds > 0 && (
                    <p className="text-xs text-[color:var(--muted)]">
                      Machine is starting... approximately {bootCountdownSeconds}s remaining before status check.
                    </p>
                  )}
                  {expiryCountdownSeconds !== null && expiryCountdownSeconds > 0 && (
                    <p className="text-xs text-[color:var(--muted)]">
                      Expires in ~{Math.floor(expiryCountdownSeconds / 3600)}h {Math.floor((expiryCountdownSeconds % 3600) / 60)}m {expiryCountdownSeconds % 60}s
                    </p>
                  )}
                  <div className="flex flex-wrap gap-2 pt-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => extendInstanceMutation.mutate()}
                      disabled={extendInstanceMutation.isPending || !canExtend}
                    >
                      {extendInstanceMutation.isPending ? "Extending..." : "Extend By 1 Hour"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => terminateInstanceMutation.mutate()}
                      disabled={terminateInstanceMutation.isPending}
                    >
                      {terminateInstanceMutation.isPending ? "Terminating..." : "Terminate"}
                    </Button>
                  </div>
                  {!canExtend && instance.status === "RUNNING" && expiryCountdownSeconds !== null && expiryCountdownSeconds > 0 && (
                    <p className="text-[10px] text-[color:var(--muted)] pt-1">
                      You can extend only when 30 minutes or less are remaining.
                    </p>
                  )}
                </div>
              )}
            </div>

            {!question.is_solved && (
              <div className="mt-8 pt-6 border-t border-[color:var(--border)] space-y-4">
                <Input
                  label="Submit Flag"
                  placeholder="flag{...}"
                  value={flag}
                  onChange={(e) => setFlag(e.target.value)}
                  disabled={submitFlagMutation.isPending}
                />
                <Button
                  className="w-full"
                  onClick={() => submitFlagMutation.mutate()}
                  disabled={!flag.trim() || submitFlagMutation.isPending}
                >
                  {submitFlagMutation.isPending ? "Submitting..." : "Submit Flag"}
                </Button>
                {feedback && (
                  <p className="text-sm text-center text-[color:var(--muted)]">{feedback}</p>
                )}
              </div>
            )}

            {question.is_solved && (
              <div className="mt-8 pt-6 border-t border-[color:var(--border)]">
                <div className="text-center py-4 bg-[color:var(--success)]/10 rounded-lg border border-[color:var(--success)]/30">
                  <p className="text-[color:var(--success)] font-semibold">✓ You have solved this challenge!</p>
                </div>
              </div>
            )}
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
