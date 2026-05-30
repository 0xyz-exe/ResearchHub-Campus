import { CheckCircle2, Plus } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { reviewRows } from "@/features/dashboard/mock-data";

export default function ReviewsPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Review Proposal"
        description="Penunjukan reviewer, skor kriteria, dan rekomendasi akhir proposal."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Reviews" }]}
        actions={<Button><Plus className="h-4 w-4" />Assign Reviewer</Button>}
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Penelitian</TableHead>
                <TableHead>Reviewer</TableHead>
                <TableHead>Score</TableHead>
                <TableHead>Recommendation</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {reviewRows.map((review) => (
                <TableRow key={review.research}>
                  <TableCell className="font-medium">{review.research}</TableCell>
                  <TableCell>{review.reviewer}</TableCell>
                  <TableCell>{review.score}</TableCell>
                  <TableCell><Badge>{review.recommendation}</Badge></TableCell>
                  <TableCell>
                    <Button variant="ghost" size="sm"><CheckCircle2 className="h-4 w-4" />Review</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
