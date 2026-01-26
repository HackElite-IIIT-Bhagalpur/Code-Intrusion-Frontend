"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import { useAuthStore } from "@/store/useAuthStore";
import Card, { CardBody } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { Genre } from "@/types";
import clsx from "clsx";

export default function ChallengesPage() {
  const { isAuthenticated, hasHydrated } = useAuthStore();
  const router = useRouter();

  useEffect(() => {
    if (!hasHydrated) return;
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [hasHydrated, isAuthenticated, router]);
  const { data: genreRaw, isLoading: genreLoading, error } = useQuery<
    Genre[] | { data?: Genre[]; genres?: Genre[] }
  >({
    queryKey: ["genres"],
    queryFn: async () => {
      const res = await api.get("/genre");
      console.log(res.data);
      return res.data;
    },
    retry: 3,
    enabled: isAuthenticated,
  });

  const genres = Array.isArray(genreRaw)
    ? genreRaw
    : Array.isArray(genreRaw?.genres)
    ? genreRaw.genres
    : Array.isArray(genreRaw?.data)
    ? genreRaw.data
    : [];

  if (!hasHydrated) {
    return null;
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-[color:var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[color:var(--text)] mb-4">
            🎯 CTF Challenges
          </h1>
          <p className="text-lg text-[color:var(--muted)]">
            Choose a category and start solving challenges
          </p>
        </div>

        {/* Genre Grid */}
        {genreLoading ? (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[color:var(--primary)]"></div>
          </div>
        ) : error ? (
          <div className="text-center text-[color:var(--muted)] py-12">
            Failed to load genre. Please refresh.
          </div>
        ) : (
          <>
            <div className="text-sm text-[color:var(--muted)] mb-4">
              {genres.length} genre available
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {genres.map((genre) => (
                <Card
                  key={genre.id}
                  variant="bordered"
                  className={clsx(
                    "cursor-pointer transition-all hover:shadow-[0_14px_45px_rgba(0,0,0,0.45)] hover:-translate-y-1"
                  )}
                  onClick={() => router.push(`/challenges/${genre.id}`)}
                >
                  <CardBody className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="text-xl font-bold text-[color:var(--text)] mb-2">
                          {genre.icon} {genre.title}
                        </h3>
                        <p className="text-sm text-[color:var(--muted)] mb-3">
                          {genre.description || "No description"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="space-y-1 text-[color:var(--muted)] text-sm">
                        <div className="flex items-center gap-2">
                          <Badge variant="info">{genre.total_questions} Challenges</Badge>
                          {genre.total_solved !== undefined && (
                            <Badge variant="success">Solved: {genre.total_solved}</Badge>
                          )}
                        </div>
                        {Array.isArray((genre as any).genres) && (
                          <div className="text-xs">Sub-genres: {(genre as any).genres.length}</div>
                        )}
                      </div>
                      <span className="text-[color:var(--primary)] font-semibold">
                        View ➜
                      </span>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
