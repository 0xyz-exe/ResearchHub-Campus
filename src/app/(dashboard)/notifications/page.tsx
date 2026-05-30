import { Bell } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Card, CardContent } from "@/components/ui/card";
import { notificationRows } from "@/features/dashboard/mock-data";

export default function NotificationsPage() {
  return (
    <div className="space-y-6">
      <PageHeading
        title="Notifications"
        description="In-app notification database untuk proposal, reviewer, dan deadline laporan."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Notifications" }]}
      />
      <div className="grid gap-4">
        {notificationRows.map((notification) => (
          <Card key={notification.title}>
            <CardContent className="flex items-start gap-4 p-5">
              <div className="rounded-2xl bg-primary/10 p-3 text-primary"><Bell className="h-5 w-5" /></div>
              <div>
                <h2 className="font-semibold">{notification.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">{notification.message}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
