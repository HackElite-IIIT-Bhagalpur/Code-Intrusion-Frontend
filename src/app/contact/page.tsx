import Link from "next/link";

export default function ContactPage() {
  const contacts = [
    { name: "Aditya Kumar", role: "Hackelite Secretary", email: "", whatsapp: "+91 9123465569" },
    { name: "Utkarsh Singh", role: "Hackelite Lead", email: "utkarshkumar199193029@gmail.com", whatsapp: "+91 7827365765" },
    { name: "Ayush Kumar Tiwari", role: "Core member", email: "tiwariayush4373@gmail.com", whatsapp: "+91 7856812199" },
  ];

  const generalEmail = "hackelite.enyugma@gmail.com";

  return (
    <main className="max-w-3xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-4">Contact</h1>

      <p className="text-sm text-[color:var(--muted)] mb-6">
        For event queries or support, email the organizing team at{' '}
        <a href={`mailto:${generalEmail}`} className="text-[color:var(--primary)] hover:underline">{generalEmail}</a>.
        {' '}For full event details and rules, see{' '}
        <Link href="/ctf" className="text-[color:var(--primary)] hover:underline">Event Details</Link>.
      </p>

      <ul className="space-y-4">
        {contacts.map((c) => {
          const wa = (c.whatsapp || "").replace(/\D/g, "");
          const hasEmail = Boolean(c.email && c.email.includes('@'));
          const hasWa = wa.length >= 8;
          return (
            <li key={c.name} className="p-4 bg-[color:var(--surface)] border border-[color:var(--border)] rounded flex items-center justify-between">
              <div>
                <div className="font-semibold text-[color:var(--text)]">{c.name}</div>
                <div className="text-[color:var(--muted)] text-sm">{c.role}</div>
              </div>

              <div className="text-right text-sm">
                {hasEmail ? (
                  <a href={`mailto:${c.email}`} className="block hover:text-[color:var(--primary)]">{c.email}</a>
                ) : (
                  <div className="text-[color:var(--muted)]">Email: Not provided</div>
                )}

                {hasWa ? (
                  <a href={`https://wa.me/${wa}`} target="_blank" rel="noopener noreferrer" className="block hover:text-[color:var(--primary)]">{c.whatsapp}</a>
                ) : (
                  <div className="text-[color:var(--muted)]">WhatsApp: Not provided</div>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </main>
  );
}
