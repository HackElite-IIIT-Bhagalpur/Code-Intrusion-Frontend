import Link from "next/link";

export default function CtfPage() {
  return (
    <div className="min-h-screen bg-[color:var(--bg)] text-[color:var(--text)] py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold mb-3">Code Intrusion (CTF) | Enyugma'26</h1>
        <div className="text-sm text-[color:var(--muted)] mb-6">Indian Institute of Information Technology (IIIT), Bhagalpur</div>

        <section id="overview" className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Overview</h2>
          <p className="text-[color:var(--muted)] leading-relaxed">
            The Code Intrusion is a 24-hour online Capture The Flag (CTF) competition designed to challenge participants’ skills in web exploitation, cryptography, reverse engineering, forensics, OSINT, and more.
            Contestants must identify, exploit, and solve vulnerabilities across different challenges to capture digital “flags.” Each flag earns points, and the leaderboard updates live as the game unfolds.
          </p>
          <p className="mt-3 font-semibold">Your goal: Find the flag. Earn the points. Climb the ranks.</p>
        </section>

        <section id="schedule" className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Schedule</h2>
          <p className="text-[color:var(--muted)]">CTF Start Time: <strong>9:00 PM, 2 February</strong></p>
          <p className="text-[color:var(--muted)]">CTF End Time: <strong>9:00 PM, 3 February</strong></p>
          <p className="text-[color:var(--muted)] mt-2">Enyuma Offline Round: <strong>Onsite finals begin 20 February</strong></p>
        </section>

        <section id="guidelines" className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">General Guidelines</h2>
          <ul className="list-disc list-inside text-[color:var(--muted)] space-y-2">
            <li>The event is conducted entirely online through the official CTF platform.</li>
            <li>Each participant must register individually.</li>
            <li>Participants must use only legal and ethical means to solve challenges.</li>
            <li>If two or more participants tie on scores, the one with the earlier submission of their last flag will be ranked higher.</li>
            <li>The competition is time-bound; no submissions are accepted after the timer ends.</li>
            <li>Any form of cheating, collusion, or sharing flags will lead to instant disqualification.</li>
            <li>The event organizers reserve the right to monitor traffic and logs for any suspicious activity.</li>
            <li>Decisions made by the judges or organizing team are final and binding.</li>
          </ul>
        </section>

        <section id="flag-format" className="mb-8">
          <h2 className="text-2xl font-semibold mb-2">Flag Format</h2>
          <p className="text-[color:var(--muted)]">All flags follow a consistent format such as: <code className="bg-[color:var(--surface)]/40 px-1 rounded">{'CTF{your_flag_here}'}</code>. Flags are case-sensitive unless otherwise mentioned. Ensure no trailing spaces or hidden characters before submission.</p>
        </section>

        <section id="rules" className="mb-12">
          <h2 className="text-2xl font-semibold mb-2">Rules of Engagement</h2>
          <ul className="list-disc list-inside text-[color:var(--muted)] space-y-2">
            <li>Brute forcing, DoS/DDoS, port scanning, or attacking the CTF platform is strictly prohibited.</li>
            <li>Only the intended challenge targets are in scope. Any attack outside the defined scope (e.g., event servers, admin panels, other participants) will lead to immediate disqualification.</li>
            <li>Automated tools (e.g., Burp Intruder, dirbuster, sqlmap) are allowed against challenge targets.</li>
            <li>Sharing flags, hints, or direct solutions during the event is not allowed.</li>
            <li>Respect all participants — any form of harassment, toxicity, or unsportsmanlike behavior will result in disqualification.</li>
          </ul>
        </section>

        <div className="flex items-center gap-4">
          <Link href="/" className="text-[color:var(--primary)] font-semibold">Back to Home</Link>
          <a className="text-[color:var(--muted)]" href="#contact">Contact / Support</a>
        </div>
      </div>
    </div>
  );
}
