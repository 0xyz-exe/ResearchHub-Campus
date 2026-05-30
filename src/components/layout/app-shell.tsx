"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import {
  BarChart3,
  BookOpen,
  Bell,
  ClipboardList,
  FileText,
  GraduationCap,
  LayoutDashboard,
  LogOut,
  Search,
  ShieldCheck,
  Users
} from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

const navigation = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/research", label: "Research", icon: ClipboardList },
  { href: "/dashboard/reviews", label: "Review", icon: ShieldCheck },
  { href: "/dashboard/publications", label: "Publication", icon: BookOpen },
  { href: "/dashboard/notifications", label: "Notification", icon: Bell },
  { href: "/dashboard/reports", label: "Reporting", icon: BarChart3 },
  { href: "/dashboard/scholar", label: "Scholar", icon: GraduationCap },
  { href: "/dashboard/users", label: "Users", icon: Users }
];

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen lg:grid lg:grid-cols-[280px_1fr]">
      <aside className="border-r bg-card/90 p-5 backdrop-blur-xl">
        <div className="flex items-center gap-3 rounded-2xl border bg-background/80 p-4 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <FileText className="h-6 w-6" />
          </div>
          <div>
            <p className="text-sm font-medium text-muted-foreground">ResearchHub Campus</p>
            <h1 className="text-lg font-semibold tracking-tight">Campus Research OS</h1>
          </div>
        </div>

        <nav className="mt-6 space-y-1">
          {navigation.map((item) => {
            const active = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href as never}
                className={cn(
                  "flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground",
                  active ? "bg-primary text-primary-foreground shadow-sm hover:bg-primary/90" : "text-muted-foreground"
                )}
              >
                <Icon className="h-4 w-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 rounded-3xl border bg-gradient-to-br from-primary/10 via-background to-emerald-500/10 p-4">
          <p className="text-sm font-medium">Production-ready baseline</p>
          <p className="mt-1 text-sm text-muted-foreground">Auth, Prisma, reporting, and role dashboards are wired for MVP expansion.</p>
        </div>
      </aside>

      <div className="flex min-h-screen flex-col">
        <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-xl">
          <div className="flex items-center gap-3 px-4 py-3 lg:px-8">
            <div className="flex flex-1 items-center gap-3">
              <div className="relative hidden max-w-md flex-1 lg:block">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input className="h-11 rounded-2xl pl-10" placeholder="Search research, publication, or user" />
              </div>
            </div>
            <ThemeToggle />
            <Button variant="outline" className="hidden lg:inline-flex">
              <LogOut className="h-4 w-4" />
              Logout
            </Button>
          </div>
        </header>

        <main className="flex-1 p-4 lg:p-8">{children}</main>
      </div>
    </div>
  );
}
