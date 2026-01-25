import Link from "next/link";
import Button from "@/components/ui/Button";
import Card, { CardBody, CardHeader } from "@/components/ui/Card";

export default function Home() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)]">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-[color:var(--border)]/80">
        <div className="absolute inset-0 opacity-60">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-[color:var(--surface)]/30 to-[color:var(--bg)]" />
          <div className="absolute inset-0 mix-blend-screen" aria-hidden>
            <div className="h-full w-full" style={{ backgroundImage: "radial-gradient(circle at 20% 20%, rgba(0,229,255,0.08), transparent 18%), radial-gradient(circle at 80% 30%, rgba(79,70,229,0.08), transparent 22%)" }} />
          </div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
          <div className="max-w-3xl">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full border border-[color:var(--border)] bg-[color:var(--surface)]/60 text-xs uppercase tracking-[0.2em] text-[color:var(--muted)] mb-6">
              <span className="h-2 w-2 rounded-full bg-[color:var(--primary)] animate-pulse" />
              <span>Fast, Minimal, Secure</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-[color:var(--text)]">
              Capture The Flag for teams that move fast.
            </h1>
            <p className="mt-6 text-lg text-[color:var(--muted)] max-w-2xl">
              Train like you ship production. Crisp UI, terminal-inspired workflows, and real-world challenges that respect your time.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/login">
                <Button size="lg">Get Started</Button>
              </Link>
              <Link href="/leaderboard">
                <Button size="lg" variant="outline">
                  View Leaderboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-16 bg-[color:var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--text)] mb-3">Built for modern defenders</h2>
            <p className="text-lg text-[color:var(--muted)] max-w-2xl mx-auto">
              Structured practice, clean UI, and instant feedback so your team can sharpen skills without friction.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card variant="elevated" className="card-grid">
              <CardBody className="py-8 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[color:var(--primary)]/15 border border-[color:var(--primary)]/30 flex items-center justify-center mx-auto">
                  <svg className="w-7 h-7 text-[color:var(--primary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M12 6v6l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center">Sharper practice</h3>
                <p className="text-[color:var(--muted)] text-center">
                  Solve curated challenges across web, crypto, reversing, and forensics with clear difficulty curves.
                </p>
              </CardBody>
            </Card>

            <Card variant="elevated" className="card-grid">
              <CardBody className="py-8 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[color:var(--secondary)]/15 border border-[color:var(--secondary)]/30 flex items-center justify-center mx-auto">
                  <svg className="w-7 h-7 text-[color:var(--secondary)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M3 7l9-4 9 4-9 4-9-4zm9 5l9-4m-9 4l-9-4m9 4v9" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center">Lightning feedback</h3>
                <p className="text-[color:var(--muted)] text-center">
                  Real-time scoring, rich hints, and detailed solves to keep momentum high without noise.
                </p>
              </CardBody>
            </Card>

            <Card variant="elevated" className="card-grid">
              <CardBody className="py-8 space-y-3">
                <div className="w-12 h-12 rounded-lg bg-[color:var(--success)]/15 border border-[color:var(--success)]/30 flex items-center justify-center mx-auto">
                  <svg className="w-7 h-7 text-[color:var(--success)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.6} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-semibold text-center">Team ready</h3>
                <p className="text-[color:var(--muted)] text-center">
                  Leaderboards, roles, and progress insights that make it easy to run internal drills or public events.
                </p>
              </CardBody>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-14 bg-[color:var(--surface)]/60 border-y border-[color:var(--border)]/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[{ label: "Active Players", value: "500+" }, { label: "Challenges", value: "150+" }, { label: "Categories", value: "10+" }, { label: "Uptime", value: "24/7" }].map((item) => (
              <div key={item.label} className="p-4 rounded-lg border border-[color:var(--border)] bg-[color:var(--bg)]/60 shadow-[0_10px_30px_rgba(0,0,0,0.35)]">
                <div className="text-3xl font-bold text-[color:var(--primary)] mb-1">{item.value}</div>
                <div className="text-sm uppercase tracking-wide text-[color:var(--muted)]">{item.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="glass-surface rounded-2xl p-10 text-center relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ background: "radial-gradient(circle at 50% 20%, rgba(0,229,255,0.3), transparent 35%)" }} />
            <div className="relative">
              <h2 className="text-3xl md:text-4xl font-bold text-[color:var(--text)] mb-3">
                Ready to launch your next CTF?
              </h2>
              <p className="text-lg text-[color:var(--muted)] mb-8">
                Spin up a secure, distraction-free arena and challenge your team with production-grade scenarios.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/login">
                  <Button size="lg">Login Now</Button>
                </Link>
                <Link href="/challenges">
                  <Button size="lg" variant="secondary">
                    Browse Challenges
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
