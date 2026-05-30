import Link from "next/link";
import { ArrowRight, BarChart3, BookOpenText, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const highlights = [
  { title: "Auth & RBAC", description: "Login, session management, and role-aware permissions for all campus actors.", icon: ShieldCheck },
  { title: "Research Workflow", description: "Proposal submission, reviewer assignment, progress tracking, and status timeline.", icon: Sparkles },
  { title: "Reporting & Insights", description: "Dashboard, export, citations, and publication analytics in one place.", icon: BarChart3 },
  { title: "Repository Publikasi", description: "Central repository with search, filter, download, and DOI metadata support.", icon: BookOpenText }
];

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="absolute inset-0 -z-10 grid-bg opacity-40" />
      <section className="mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-6 py-16 lg:px-10">
        <div className="max-w-3xl animate-fadeUp">
          <p className="inline-flex items-center gap-2 rounded-full border bg-card/80 px-3 py-1 text-sm text-muted-foreground shadow-sm backdrop-blur">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            ResearchHub Campus MVP
          </p>
          <h1 className="mt-6 text-5xl font-semibold tracking-tight text-balance md:text-7xl">
            Sistem manajemen penelitian dan publikasi untuk perguruan tinggi modern.
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground">
            ResearchHub Campus menggabungkan auth, dashboard, review proposal, repository publikasi, notifikasi, dan reporting dalam satu platform yang siap berkembang ke production.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Button asChild>
              <Link href="/login">
                Masuk ke Dashboard
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline">
              <Link href="/dashboard">Lihat Dashboard Demo</Link>
            </Button>
          </div>
        </div>

        <div className="mt-16 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {highlights.map((item) => {
            const Icon = item.icon;

            return (
              <Card key={item.title} className="border-border/60 bg-card/80 backdrop-blur">
                <CardContent className="p-6">
                  <div className="mb-4 inline-flex rounded-2xl bg-primary/10 p-3 text-primary">
                    <Icon className="h-5 w-5" />
                  </div>
                  <h2 className="text-lg font-semibold">{item.title}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{item.description}</p>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </section>
    </main>
  );
}
