import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ReactQueryProvider from "@/lib/queryClient";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-sans" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-mono" });

export const metadata: Metadata = {
  title: "HackElite - Capture The Flag Challenges",
  description: "Test your cybersecurity skills with our CTF challenges",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <link rel="icon" type="image/svg+xml" href="/facvicon.ico"/>
      <link rel="apple-touch-icon" href="/facvicon.ico" />
      <link rel="icon" type="image/png" sizes="32x32" href="/facvicon.ico" />
      <body
        className={`${spaceGrotesk.variable} ${jetBrainsMono.variable} antialiased min-h-screen flex flex-col bg-[color:var(--bg)] text-[color:var(--text)]`}
        style={{ fontFamily: "var(--font-sans)" }}
      >
        <ReactQueryProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ReactQueryProvider>
      </body>
    </html>
  );
}
