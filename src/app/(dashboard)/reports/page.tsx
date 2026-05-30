import { FileDown, FileSpreadsheet, BarChart4 } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Reporting"
        description="Export PDF dan Excel untuk penelitian, publikasi, kinerja dosen, dan statistik program studi."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Reports" }]}
      />

      <div className="grid gap-4 lg:grid-cols-3">
        <Card>
          <CardContent className="space-y-4 p-6">
            <BarChart4 className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Penelitian per Tahun</h2>
            <p className="text-sm text-muted-foreground">Data siap diekspor ke PDF dan XLSX.</p>
            <div className="flex gap-3">
              <Button variant="outline"><FileDown className="h-4 w-4" />PDF</Button>
              <Button variant="outline"><FileSpreadsheet className="h-4 w-4" />Excel</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <BarChart4 className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Publikasi per Tahun</h2>
            <p className="text-sm text-muted-foreground">Filter tahun dan kategori tersedia di layer service.</p>
            <div className="flex gap-3">
              <Button variant="outline"><FileDown className="h-4 w-4" />PDF</Button>
              <Button variant="outline"><FileSpreadsheet className="h-4 w-4" />Excel</Button>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="space-y-4 p-6">
            <BarChart4 className="h-6 w-6 text-primary" />
            <h2 className="text-lg font-semibold">Kinerja Dosen & Prodi</h2>
            <p className="text-sm text-muted-foreground">Statistik program studi disiapkan untuk role Kaprodi dan LPPM.</p>
            <div className="flex gap-3">
              <Button variant="outline"><FileDown className="h-4 w-4" />PDF</Button>
              <Button variant="outline"><FileSpreadsheet className="h-4 w-4" />Excel</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
