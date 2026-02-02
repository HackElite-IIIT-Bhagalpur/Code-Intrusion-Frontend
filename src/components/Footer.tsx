import Link from "next/link";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[color:var(--bg)] text-[color:var(--muted)] mt-auto border-t border-[color:var(--border)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-4 mb-3">
              <img src="/CollegeLogo.png" alt="IIIT Bhagalpur logo" className="w-20 rounded-full" />
              <div>
                <div className="text-[color:var(--text)] text-lg font-bold">IIIT BHAGALPUR, BIHAR</div>
                <div className="text-[color:var(--muted)] text-sm">PIN: 813210</div>
              </div>
            </div>
            <p className="text-sm text-[color:var(--muted)] mb-4">
              A competitive cybersecurity platform where you can test your
              hacking skills, learn new techniques, and compete with others.
            </p>
            <div className="flex space-x-4">
              <a
                href="https://www.linkedin.com/company/cysec-iiitbh/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--primary)] transition-colors"
                aria-label="LinkedIn"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 4 24 24"
                >
                  <path d="M4.98 3.5C4.98 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.22 8.98h4.56V24H.22V8.98zM8.98 8.98h4.37v2.05h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.48 3.04 5.48 6.99V24h-4.56v-7.87c0-1.88-.03-4.29-2.62-4.29-2.62 0-3.02 2.05-3.02 4.17V24H8.98V8.98z"/>
                </svg>
              </a>
              <a
                href="https://discord.gg/Ytuj9Cr4K"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--primary)] transition-colors"
                aria-label="Discord"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M20.317 4.37a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 00-5.487 0 12.64 12.64 0 00-.617-1.25.077.077 0 00-.079-.037A19.736 19.736 0 003.677 4.37a.07.07 0 00-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 00.031.057 19.9 19.9 0 005.993 3.03.078.078 0 00.084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 00-.041-.106 13.107 13.107 0 01-1.872-.892.077.077 0 01-.008-.128 10.2 10.2 0 00.372-.292.074.074 0 01.077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 01.078.01c.12.098.246.198.373.292a.077.077 0 01-.006.127 12.299 12.299 0 01-1.873.892.077.077 0 00-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 00.084.028 19.839 19.839 0 006.002-3.03.077.077 0 00.032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 00-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <a
                href="https://chat.whatsapp.com/DTGfqlRf8X56bQDEADfb1k"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[color:var(--primary)] transition-colors"
                aria-label="WhatsApp"
              >
                <svg
                  className="w-6 h-6"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.52 3.48A11.93 11.93 0 0012.07.5C6.2.5 1.3 5.4 1.3 11.27c0 1.99.52 3.93 1.5 5.64L.5 23.5l6.82-2.01c1.64.9 3.5 1.38 5.25 1.38 5.87 0 10.77-4.9 10.77-10.77 0-2.88-1.12-5.6-3.82-7.6zM12.07 20.3c-1.6 0-3.17-.43-4.53-1.24l-.32-.19-4.05 1.19 1.2-3.93-.21-.36A8.73 8.73 0 013.3 11.27C3.3 6.92 6.82 3.4 11.17 3.4c2.95 0 5.72 1.15 7.8 3.23 2.08 2.08 3.2 4.86 3.2 7.8 0 4.35-3.52 7.87-7.87 7.87z" />
                  <path d="M17.53 14.7c-.29-.15-1.72-.85-1.98-.95-.26-.1-.45-.15-.64.15-.19.29-.74.95-.91 1.15-.17.2-.34.22-.63.08-.29-.15-1.22-.45-2.33-1.44-.86-.77-1.44-1.72-1.61-2.01-.17-.29-.02-.45.13-.6.13-.13.29-.34.44-.51.15-.17.2-.29.3-.49.1-.19.05-.36-.03-.52-.08-.15-.64-1.54-.88-2.12-.23-.56-.47-.48-.64-.49-.17-.01-.37-.01-.57-.01-.19 0-.5.07-.76.36-.26.29-1 1-1 2.45 0 1.45 1.03 2.86 1.18 3.06.15.2 2.03 3.1 4.92 4.24 1 .43 1.77.69 2.38.88 1.01.32 1.93.27 2.66.16.81-.12 1.72-.7 1.96-1.38.24-.68.24-1.27.17-1.38-.08-.11-.29-.17-.59-.31z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-[color:var(--text)] font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/leaderboard" className="hover:text-[color:var(--primary)] transition-colors">
                  Leaderboard
                </Link>
              </li>
              <li>
                <Link href="/challenges" className="hover:text-[color:var(--primary)] transition-colors">
                  Challenges
                </Link>
              </li>
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-[color:var(--text)] font-semibold mb-4">Help</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/ctf" className="hover:text-[color:var(--primary)] transition-colors">
                  Event Details
                </Link>
              </li>
              <li>
                <Link href="/ctf#rules" className="hover:text-[color:var(--primary)] transition-colors">
                  Rules
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-[color:var(--primary)] transition-colors">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[color:var(--border)] mt-8 pt-8 text-sm text-center text-[color:var(--muted)]">
          <p>&copy; {currentYear} CTF Platform. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
