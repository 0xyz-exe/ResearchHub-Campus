import { ReactNode } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

interface StatCardProps {
  title: string;
  value: string;
  description?: string;
  icon: ReactNode;
  trend?: string;
}

export function StatCard({ title, value, description, icon, trend }: StatCardProps) {
  return (
    <Card className="overflow-hidden border-border/70 bg-card/80">
      <CardHeader className="flex-row items-start justify-between space-y-0 pb-2">
        <div>
          <CardDescription>{title}</CardDescription>
          <CardTitle className="mt-2 text-3xl">{value}</CardTitle>
        </div>
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">{icon}</div>
      </CardHeader>
      <CardContent className="space-y-1">
        {description ? <p className="text-sm text-muted-foreground">{description}</p> : null}
        {trend ? <p className="text-sm font-medium text-emerald-600 dark:text-emerald-400">{trend}</p> : null}
      </CardContent>
    </Card>
  );
}
