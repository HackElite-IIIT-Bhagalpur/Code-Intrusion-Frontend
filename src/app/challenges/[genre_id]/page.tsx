"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import api from "@/lib/api";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

type QuestionItem = {
  id: string;
  title: string;
  is_solved: boolean;
};

export default function GenreQuestionsPage() {
  const params = useParams<{ genre_id: string }>();
  const router = useRouter();
  const genreId = params?.genre_id;

  const { data, isLoading, error } = useQuery<QuestionItem[]>({
    queryKey: ["genre-questions", genreId],
    queryFn: async () => {
      const res = await api.get(`genre/${genreId}/questions`);
      const raw = res.data;
      const items = Array.isArray(raw?.questions) ? raw.questions : raw;
      return Array.isArray(items)
        ? items.map((q: any) => ({
            id: String(q.id),
            title: q.title ?? "Untitled",
            is_solved: Boolean(q.is_solved) || Boolean((raw?.solvedSet || new Set()).has?.(q.id)) || false,
          }))
        : [];
    },
    enabled: Boolean(genreId),
    retry: 2,
  });

  if (!genreId) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[color:var(--muted)]">
        Missing genre id.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--primary)] mx-auto mb-4"></div>
          <p className="text-[color:var(--muted)]">Loading questions...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card variant="elevated" className="max-w-md w-full">
          <CardBody className="text-center py-10 space-y-3">
            <div className="text-[color:var(--error)] font-semibold">Failed to load questions</div>
            <p className="text-[color:var(--muted)]">Please refresh the page.</p>
            <Button onClick={() => router.refresh()}>Retry</Button>
          </CardBody>
        </Card>
      </div>
    );
  }

  const questions = data || [];

  return (
    <div className="min-h-screen bg-[color:var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-[color:var(--text)] mb-1">Questions</h1>
            <p className="text-sm text-[color:var(--muted)]">Genre: {genreId}</p>
          </div>
          <Button variant="ghost" onClick={() => router.back()}>Back</Button>
        </div>

        {questions.length === 0 ? (
          <Card variant="bordered">
            <CardBody className="text-center py-12 text-[color:var(--muted)]">
              No questions found for this genre.
            </CardBody>
          </Card>
        ) : (
          <div className="space-y-4">
            {questions.map((q) => (
              <Card key={q.id} variant="bordered" className="border-[color:var(--border)]">
                <CardHeader className="flex items-center justify-between cursor-pointer hover:bg-[color:var(--surface)]/50 transition-colors" onClick={() => router.push(`/challenges/${genreId}/${q.id}`)}>
                  <div className="text-[color:var(--text)] font-semibold">{q.title}</div>
                  <div className="flex items-center gap-3">
                    <Badge variant={q.is_solved ? "success" : "default"}>
                      {q.is_solved ? "Solved" : "Unsolved"}
                    </Badge>
                    <span className="text-[color:var(--primary)] text-xl">→</span>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
