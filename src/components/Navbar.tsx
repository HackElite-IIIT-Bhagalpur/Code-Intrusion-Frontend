"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/store/useAuthStore";
import Button from "./ui/Button";
import clsx from "clsx";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout } = useAuthStore();

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/leaderboard", label: "Leaderboard" },
    ...(isAuthenticated
      ? [
          { href: "/challenges", label: "Challenges" },
          { href: "/profile", label: "Profile" },
        ]
      : []),
  ];

  const handleLogout = () => {
    logout();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 border-b border-[color:var(--border)]/80 bg-[color:var(--bg)]/95 backdrop-blur-sm shadow-[0_10px_40px_rgba(0,0,0,0.45)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center space-x-2 text-xl font-bold text-[color:var(--text)] hover:text-[color:var(--primary)] transition-colors"
          >
            <svg
              className="w-8 h-8"
              fill="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M12 3 4 7v6c0 4.5 3.2 8.7 8 10 4.8-1.3 8-5.5 8-10V7l-8-4Z"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[color:var(--primary)]"
              />
              <path
                d="M8.5 12 12 9l3.5 3-3.5 3-3.5-3Z"
                stroke="currentColor"
                strokeWidth="1.5"
                className="text-[color:var(--secondary)]"
              />
            </svg>
            <span>CTF Platform</span>
          </Link>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={clsx(
                  "px-4 py-2 rounded-md text-sm font-semibold transition-all",
                  pathname === link.href
                    ? "text-[color:var(--primary)] bg-[color:var(--surface)] border border-[color:var(--border)] shadow-[0_0_18px_rgba(0,229,255,0.2)]"
                    : "text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--surface)]/60 border border-transparent"
                )}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-4">
            {isAuthenticated ? (
              <>
                <div className="hidden sm:flex items-center space-x-2 text-sm">
                  <span className="text-[color:var(--muted)]">Welcome,</span>
                  <span className="font-semibold text-[color:var(--text)]">
                    {user?.first_name}
                  </span>
                  <span className="text-[color:var(--primary)] font-bold">
                    {user?.total_points} pts
                  </span>
                </div>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <Link href="/login">
                <Button size="sm">Login</Button>
              </Link>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-[color:var(--border)] bg-[color:var(--bg)]/95">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={clsx(
                "block px-3 py-2 rounded-md text-base font-medium transition-all",
                pathname === link.href
                  ? "text-[color:var(--primary)] bg-[color:var(--surface)] border border-[color:var(--border)]"
                  : "text-[color:var(--muted)] hover:text-[color:var(--text)] hover:bg-[color:var(--surface)]/60"
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
