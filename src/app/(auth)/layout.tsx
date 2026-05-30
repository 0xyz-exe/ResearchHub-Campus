import Link from "next/link";
import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <main className="grid min-h-screen lg:grid-cols-[1.2fr_0.8fr]">
      <section className="relative hidden overflow-hidden border-r bg-slate-950 text-white lg:flex lg:flex-col lg:justify-between">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(59,130,246,0.3),_transparent_38%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.18),_transparent_30%)]" />
        <div className="relative z-10 p-12">
          <Link href="/" className="text-sm font-medium tracking-[0.2em] text-white/70 uppercase">
            ResearchHub Campus
          </Link>
          <h1 className="mt-10 max-w-xl text-5xl font-semibold tracking-tight">
            Campus research operations, minus the spreadsheet chaos.
          </h1>
          <p className="mt-6 max-w-lg text-base text-white/70">
            Login experience untuk dosen, reviewer, LPPM, dan kaprodi dengan role-aware session serta jalur kerja yang jelas.
          </p>
        </div>
        <div className="relative z-10 p-12 text-sm text-white/50">
          Built for MVP production readiness.
        </div>
      </section>
      <section className="flex items-center justify-center px-6 py-12 lg:px-10">
        <div className="w-full max-w-md">{children}</div>
      </section>
    </main>
  );
}
