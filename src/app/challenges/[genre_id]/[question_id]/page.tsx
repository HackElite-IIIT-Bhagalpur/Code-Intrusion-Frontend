"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
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

export default function QuestionPage() {
  const params = useParams<{ genre_id: string; question_id: string }>();
  const router = useRouter();
  const { genre_id, question_id } = params || {};
  const queryClient = useQueryClient();

  const [flag, setFlag] = useState("");
  const [feedback, setFeedback] = useState<string | null>(null);

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
