"use client";

import { Bar, BarChart, CartesianGrid, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface DashboardChartsProps {
  publicationByYear: { year: number; value: number }[];
  citationByYear: { year: number; value: number }[];
  researchStatus: { name: string; value: number }[];
}

export function DashboardCharts({ publicationByYear, citationByYear, researchStatus }: DashboardChartsProps) {
  return (
    <div className="grid gap-6 xl:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Publikasi per Tahun</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={publicationByYear}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{ r: 4 }} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sitasi per Tahun</CardTitle>
        </CardHeader>
        <CardContent className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={citationByYear}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>Status Penelitian</CardTitle>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Tooltip />
              <Pie data={researchStatus} dataKey="value" nameKey="name" innerRadius={76} outerRadius={120} paddingAngle={4} fill="hsl(var(--primary))" />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
