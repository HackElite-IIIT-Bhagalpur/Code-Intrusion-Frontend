"use client";

import { useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import clsx from "clsx";

interface LeaderboardEntry {
  rank: number;
  first_name: string;
  middle_name?: string | null;
  last_name: string;
  email?: string | null;
  points: number;
  last_submission_timestamp?: string | null;
}

interface LeaderboardResponse {
  success: boolean;
  error?: string;
  data?: {
    leaderboard: LeaderboardEntry[];
    current_user?: LeaderboardEntry;
  };
}

export default function LeaderboardPage() {
  const { data, isLoading, error } = useQuery<LeaderboardResponse>({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await api.get("/leaderboard/1");
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
    refetchInterval: 1000 * 60 * 5,
    retry: 3,
  });

  if (isLoading || error || !data?.success) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">
            {error ? "Reconnecting to server..." : "Loading leaderboard..."}
          </p>
        </div>
      </div>
    );
  }

  const leaderboardData = data?.data?.leaderboard || [];
  const currentUser = data?.data?.current_user;

  return (
    <div className="min-h-screen bg-[color:var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[color:var(--text)] mb-3">🏁 Leaderboard</h1>
          <p className="text-lg text-[color:var(--muted)]">
            Clean, fast rankings with neon highlights for the leaders
          </p>
        </div>


        <Card variant="elevated" className="overflow-hidden">
          <CardHeader className="bg-gradient-to-r from-[color:var(--surface)] to-[color:var(--bg)]">
            <div className="flex justify-between items-center text-[color:var(--text)]">
              <div>
                <h2 className="text-2xl font-bold">Rankings</h2>
                <p className="text-sm text-[color:var(--muted)]">Updated live • {leaderboardData.length || 0} players</p>
              </div>
              <Badge variant="info" className="text-sm px-3 py-1">Realtime</Badge>
            </div>
          </CardHeader>
          <CardBody className="p-0 bg-[color:var(--bg)]">

            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-[color:var(--surface)]/80 border-b border-[color:var(--border)]">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[color:var(--muted)] uppercase tracking-wider">
                      Rank
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-bold text-[color:var(--muted)] uppercase tracking-wider">
                      Player
                    </th>
                    <th className="px-6 py-3 text-center text-xs font-bold text-[color:var(--muted)] uppercase tracking-wider">
                      Points
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[color:var(--bg)] divide-y divide-[color:var(--border)]/70">

                  {currentUser && (
                    <tr className="bg-gradient-to-r from-[color:var(--primary)]/20 to-[color:var(--secondary)]/20 border-2 border-[color:var(--primary)]/50 shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_12px_35px_rgba(34,211,238,0.2)]">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <span className="text-lg font-bold text-[color:var(--primary)]">
                            #{currentUser.rank}
                          </span>
                          <Badge variant="info" className="text-xs px-2 py-0.5">YOU</Badge>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-[#0b0f14] font-bold text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.4)] bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)]">
                            {currentUser?.first_name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-[color:var(--text)]">
                              {currentUser?.first_name} {currentUser?.last_name}
                            </div>
                            {currentUser?.email && (
                              <div className="text-xs text-[color:var(--muted)]">
                                {currentUser.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="text-lg font-bold text-[color:var(--primary)]">
                          {currentUser?.points}
                        </span>
                      </td>
                    </tr>
                  )}
                  {leaderboardData.map((entry, index) => (
                    <tr
                      key={entry.rank}
                      className={`transition-all ${
                        index === 0
                          ? "bg-[color:var(--surface)] border border-transparent shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_14px_45px_rgba(34,211,238,0.25)]"
                          : index === 1
                          ? "bg-[color:var(--surface)] border border-transparent shadow-[0_0_0_1px_rgba(96,165,250,0.25),0_12px_35px_rgba(96,165,250,0.2)]"
                          : index === 2
                          ? "bg-[color:var(--surface)] border border-transparent shadow-[0_0_0_1px_rgba(168,85,247,0.25),0_12px_30px_rgba(249,115,22,0.18)]"
                          : "hover:bg-[color:var(--surface)]/60"
                      }`}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          {entry.rank <= 3 ? (
                            <span className="text-3xl font-bold mr-3 w-10 text-center">
                              {entry.rank === 1
                                ? "🥇"
                                : entry.rank === 2
                                ? "🥈"
                                : "🥉"}
                            </span>
                          ) : (
                            <span className="text-[color:var(--muted)] font-semibold text-xl mr-2 w-10 text-right">
                              #{entry.rank}
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div
                            className={`flex-shrink-0 h-12 w-12 rounded-full flex items-center justify-center text-[#0b0f14] font-bold text-sm shadow-[0_0_0_1px_rgba(0,0,0,0.4)] ${
                              index === 0
                                ? "bg-gradient-to-br from-[#FACC15] to-[#22D3EE]"
                                : index === 1
                                ? "bg-gradient-to-br from-[#CBD5E1] to-[#60A5FA]"
                                : index === 2
                                ? "bg-gradient-to-br from-[#F97316] to-[#A855F7]"
                                : "bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)]"
                            }`}
                          >
                            {entry?.first_name?.charAt(0).toUpperCase() || "?"}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-bold text-[color:var(--text)]">
                              {entry?.first_name} {entry?.last_name}
                            </div>
                            {entry?.email && (
                              <div className="text-xs text-[color:var(--muted)]">
                                {entry.email}
                              </div>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span
                          className={`text-lg font-bold ${
                            entry?.rank === 1
                              ? "text-[#FACC15]"
                              : entry?.rank === 2
                              ? "text-[#60A5FA]"
                              : entry?.rank === 3
                              ? "text-[#F97316]"
                              : "text-[color:var(--primary)]"
                          }`}
                        >
                          {entry?.points}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>


            <div className="md:hidden space-y-4 p-4">

              {currentUser && (
                <Card
                  variant="bordered"
                  className="relative overflow-hidden shadow-[0_0_0_1px_rgba(59,130,246,0.35),0_12px_35px_rgba(34,211,238,0.2)]"
                >
                  <CardBody className="bg-gradient-to-r from-[color:var(--primary)]/20 to-[color:var(--secondary)]/20">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl font-bold text-[color:var(--primary)]">
                          #{currentUser.rank}
                        </span>
                        <div>
                          <div className="flex items-center space-x-2">
                            <div className="font-semibold text-[color:var(--text)]">
                              {currentUser?.first_name} {currentUser?.last_name}
                            </div>
                            <Badge variant="info" className="text-xs px-2 py-0.5">YOU</Badge>
                          </div>
                          {currentUser?.email && (
                            <div className="text-xs text-[color:var(--muted)]">
                              {currentUser.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[color:var(--primary)]">
                        {currentUser?.points} pts
                      </div>
                    </div>
                  </CardBody>
                </Card>
              )}
              {leaderboardData.map((entry, index) => (
                <Card
                  key={entry.rank}
                  variant="bordered"
                  className={clsx(
                    "relative overflow-hidden",
                    index === 0 && "shadow-[0_0_0_1px_rgba(250,204,21,0.35),0_12px_35px_rgba(34,211,238,0.2)]",
                    index === 1 && "shadow-[0_0_0_1px_rgba(96,165,250,0.2),0_12px_30px_rgba(96,165,250,0.18)]",
                    index === 2 && "shadow-[0_0_0_1px_rgba(168,85,247,0.2),0_12px_28px_rgba(249,115,22,0.16)]"
                  )}
                >
                  <CardBody>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        {entry.rank <= 3 ? (
                          <span className="text-3xl">
                            {entry.rank === 1 ? "🥇" : entry.rank === 2 ? "🥈" : "🥉"}
                          </span>
                        ) : (
                          <span className="text-[color:var(--muted)] font-bold text-xl">
                            #{entry.rank}
                          </span>
                        )}
                        <div>
                          <div className="font-semibold text-[color:var(--text)]">
                            {entry?.first_name} {entry?.last_name}
                          </div>
                          {entry?.email && (
                            <div className="text-xs text-[color:var(--muted)]">
                              {entry.email}
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-lg font-bold text-[color:var(--primary)]">
                        {entry?.points} pts
                      </div>
                    </div>
                  </CardBody>
                </Card>
              ))}
            </div>
          </CardBody>
        </Card>

        {(!leaderboardData || leaderboardData.length === 0) && !currentUser && (
          <Card variant="elevated" className="mt-8">
            <CardBody className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No data available yet. Be the first to solve a challenge!
              </p>
            </CardBody>
          </Card>
        )}
      </div>
    </div>
  );
}
