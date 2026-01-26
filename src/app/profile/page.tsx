"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import { authAPI } from "@/lib/apiEndpoints";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function ProfilePage() {
  const router = useRouter();
  const { user, setUser, token, logout } = useAuthStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // if (!token) {
    //   router.push("/login");
    //   return;
    // }


    if (!user) {
      authAPI.getProfile()
        .then((userData) => {
          setUser(userData);
          setIsLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch profile:", err);
          setError("Failed to load profile");
          setIsLoading(false);
          logout();
          router.push("/login");
        });
    } else {
      setIsLoading(false);
    }
  }, [token, user, setUser, logout, router]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <Button onClick={() => router.push("/login")}>Back to Login</Button>
        </div>
      </div>
    );
  }

  const fullName = [user.first_name, user.middle_name, user.last_name]
    .filter(Boolean)
    .join(" ");

  const getRankBadge = (rank: number) => {
    if (rank === 1) return { emoji: "🥇", variant: "warning" as const };
    if (rank === 2) return { emoji: "🥈", variant: "default" as const };
    if (rank === 3) return { emoji: "🥉", variant: "warning" as const };
    return { emoji: "🏅", variant: "info" as const };
  };

  const rankInfo = getRankBadge(user.current_rank);

  return (
    <div className="min-h-screen bg-[color:var(--bg)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Profile Header */}
        <Card variant="elevated" className="mb-8">
          <CardBody className="p-8">
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0 relative">
                <div className="relative w-32 h-32 bg-gradient-to-br from-[color:var(--primary)] to-[color:var(--secondary)] rounded-full flex items-center justify-center text-[#041018] text-5xl font-bold shadow-[0_0_20px_rgba(0,229,255,0.4)] ring-2 ring-[color:var(--primary)]/30">
                  {user.first_name.charAt(0).toUpperCase()}
                </div>
              </div>

              {/* User Info */}
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-3xl font-bold text-[color:var(--text)] mb-2">
                  {fullName}
                </h1>
                <p className="text-[color:var(--muted)] mb-4">{user.email}</p>

                <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                  <span className="inline-flex items-center px-3 py-1 text-sm font-semibold rounded-full border border-[#A855F7]/60 text-[#A855F7] bg-[#A855F7]/10">
                    {rankInfo.emoji} Rank #{user.current_rank}
                  </span>
                  <Badge variant="success" className="text-base px-3 py-1">
                    ✅ {user.total_solved} Solved
                  </Badge>
                  <Badge variant="info" className="text-base px-3 py-1">
                    ⭐ {user.total_points} Points
                  </Badge>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-2">
                <Link href="/challenges">
                  <Button size="sm" className="w-full">
                    View Challenges
                  </Button>
                </Link>
                <Link href="/leaderboard">
                  <Button size="sm" variant="outline" className="w-full">
                    Leaderboard
                  </Button>
                </Link>
              </div>
            </div>
          </CardBody>
        </Card>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card variant="elevated">
            <CardBody className="text-center p-6 space-y-3">
              <div className="w-14 h-14 bg-[color:var(--primary)]/15 rounded-lg flex items-center justify-center mx-auto">
                <svg
                  className="w-7 h-7 text-[color:var(--primary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-[color:var(--text)]">{user.total_solved}</div>
              <div className="text-sm text-[color:var(--muted)]">Challenges Solved</div>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody className="text-center p-6 space-y-3">
              <div className="w-14 h-14 bg-[color:var(--secondary)]/12 rounded-lg flex items-center justify-center mx-auto">
                <svg
                  className="w-7 h-7 text-[color:var(--secondary)]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-[color:var(--text)]">{user.total_points}</div>
              <div className="text-sm text-[color:var(--muted)]">Total Points</div>
            </CardBody>
          </Card>

          <Card variant="elevated">
            <CardBody className="text-center p-6 space-y-3">
              <div className="w-14 h-14 bg-[#A855F7]/15 rounded-lg flex items-center justify-center mx-auto">
                <svg
                  className="w-7 h-7 text-[#A855F7]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.8}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div className="text-3xl font-bold text-[color:var(--text)]">#{user.current_rank}</div>
              <div className="text-sm text-[color:var(--muted)]">Current Rank</div>
            </CardBody>
          </Card>
        </div>

        {/* Recent Activity / Achievement Section */}
        <Card variant="elevated">
          <CardHeader>
            <h2 className="text-xl font-bold text-[color:var(--text)]">
              Profile Information
            </h2>
          </CardHeader>
          <CardBody>
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[color:var(--muted)] mb-1">
                    First Name
                  </label>
                  <div className="text-base text-[color:var(--text)]">
                    {user.first_name}
                  </div>
                </div>

                {user.middle_name && (
                  <div>
                    <label className="block text-sm font-medium text-[color:var(--muted)] mb-1">
                      Middle Name
                    </label>
                    <div className="text-base text-[color:var(--text)]">
                      {user.middle_name}
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-[color:var(--muted)] mb-1">
                    Last Name
                  </label>
                  <div className="text-base text-[color:var(--text)]">
                    {user.last_name}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[color:var(--muted)] mb-1">
                    Email Address
                  </label>
                  <div className="text-base text-[color:var(--text)]">{user.email}</div>
                </div>
              </div>

              <div className="border-t border-[color:var(--border)] pt-6 mt-6">
                <div className="p-4 rounded-lg border border-[color:var(--border)] bg-[color:var(--surface)]/70">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-[color:var(--primary)]/15 border border-[color:var(--primary)]/30 flex items-center justify-center text-[color:var(--primary)]">
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.8}
                          d="M9 12l2 2 4-4m5 0a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-[color:var(--text)]">Keep climbing.</p>
                      <p className="text-sm text-[color:var(--muted)]">Your stats update instantly after each solve. Focus on clean runs and consistent submissions.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardBody>
        </Card>
      </div>
    </div>
  );
}
