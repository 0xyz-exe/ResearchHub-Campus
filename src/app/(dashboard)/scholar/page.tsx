import { GraduationCap } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ScholarPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Google Scholar Integration"
        description="Mock service layer untuk sinkronisasi scholar profile, h-index, i10-index, dan citation count."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Scholar" }]}
      />

      <Card>
        <CardContent className="space-y-4 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-primary/10 p-3 text-primary"><GraduationCap className="h-5 w-5" /></div>
            <div>
              <h2 className="font-semibold">Scholar Profile Mock</h2>
              <p className="text-sm text-muted-foreground">Siap dihubungkan ke Google Scholar, ORCID, dan Crossref adapter.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3 text-sm">
            <Badge>scholarId: mock-scholar-001</Badge>
            <Badge>hIndex: 14</Badge>
            <Badge>i10Index: 22</Badge>
            <Badge>citationCount: 136</Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
