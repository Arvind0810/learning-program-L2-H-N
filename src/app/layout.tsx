import type { Metadata } from "next";
import Link from "next/link";
import Backdrop from "@/components/Backdrop";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Infra Engineer Roadmap",
  description: "Six-month plan from Hardware & Networking to modern infrastructure engineering.",
};

const NAV_LINKS = [
  { href: "/", label: "Overview" },
  { href: "/tests", label: "Tests" },
  { href: "/practice", label: "Practice" },
  { href: "/projects", label: "Projects" },
  { href: "/competencies", label: "Competencies" },
  { href: "/interview", label: "Interview prep" },
];

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="relative min-h-full flex flex-col">
        <Backdrop />
        <header className="sticky top-0 z-20 px-4 pt-4">
          <nav className="glass mx-auto flex max-w-4xl flex-wrap items-center gap-x-1 gap-y-1 rounded-2xl px-4 py-2.5 text-sm">
            <Link href="/" className="mr-auto flex items-center gap-2 font-bold">
              <span className="flex size-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-fuchsia-500 text-xs text-white">
                IR
              </span>
              <span className="text-gradient">Infra Roadmap</span>
            </Link>
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-1.5 text-zinc-600 transition-colors hover:bg-white/50 hover:text-foreground dark:text-zinc-300 dark:hover:bg-white/10"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </header>
        <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-8">{children}</main>
      </body>
    </html>
  );
}
