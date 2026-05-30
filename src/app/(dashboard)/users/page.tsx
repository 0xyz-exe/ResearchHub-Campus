import { Users } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Card, CardContent } from "@/components/ui/card";

export default function UsersPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Users & RBAC"
        description="Manajemen user, role, dan permissions untuk Super Admin, LPPM, reviewer, kaprodi, dan dosen."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Users" }]}
      />
      <Card>
        <CardContent className="flex items-center gap-4 p-6">
          <Users className="h-5 w-5 text-primary" />
          <p className="text-sm text-muted-foreground">Halaman ini siap dihubungkan ke user repository dan panel administrasi role.</p>
        </CardContent>
      </Card>
    </div>
  );
}
