import { BookOpenText, TrendingUp, LayoutDashboard, FlaskConical } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { StatCard } from "@/components/ui/stat-card";
import { DashboardCharts } from "@/components/charts/dashboard-charts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { personalDashboardMock, lppmDashboardMock, kaprodiDashboardMock } from "@/features/dashboard/mock-data";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <PageHeading
        title="Dashboard"
        description="Ringkasan kinerja penelitian, publikasi, sitasi, dan status luaran untuk peran pengguna aktif."
        breadcrumbs={[{ label: "Dashboard" }]}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {personalDashboardMock.cards.map((card) => (
          <StatCard
            key={card.title}
            title={card.title}
            value={card.value}
            trend={card.trend}
            icon={card.title.includes("Penelitian") ? <FlaskConical className="h-5 w-5" /> : card.title.includes("Publikasi") ? <BookOpenText className="h-5 w-5" /> : card.title.includes("Sitasi") ? <TrendingUp className="h-5 w-5" /> : <LayoutDashboard className="h-5 w-5" />}
          />
        ))}
      </div>

      <DashboardCharts
        publicationByYear={personalDashboardMock.publicationByYear}
        citationByYear={personalDashboardMock.citationByYear}
        researchStatus={personalDashboardMock.researchStatus}
      />

      <div className="grid gap-6 xl:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle>Dashboard LPPM</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Proposal masuk: {lppmDashboardMock.cards[0].value}</p>
            <p>Sedang direview: {lppmDashboardMock.cards[1].value}</p>
            <p>Disetujui: {lppmDashboardMock.cards[2].value}</p>
            <p>Ditolak: {lppmDashboardMock.cards[3].value}</p>
            <p>Dana penelitian: {lppmDashboardMock.cards[4].value}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Dashboard Kaprodi</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Jumlah dosen: {kaprodiDashboardMock.totalDosen}</p>
            <p>Jumlah penelitian: {kaprodiDashboardMock.totalResearch}</p>
            <p>Jumlah publikasi: {kaprodiDashboardMock.totalPublication}</p>
            <p>Jumlah HKI: {kaprodiDashboardMock.totalHki}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Role-aware baseline</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 text-sm text-muted-foreground">
            <p>Dashboard ini siap dihubungkan ke session Auth.js dan query berbasis role.</p>
            <p>Semua chart responsif dan siap diganti dengan data live dari API route.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
