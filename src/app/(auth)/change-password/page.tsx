import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ChangePasswordPage() {
  return (
    <Card className="border-border/60 bg-card/90 shadow-soft">
      <CardHeader>
        <CardTitle>Change Password</CardTitle>
        <p className="text-sm text-muted-foreground">Gunakan halaman ini untuk mengganti password aktif secara aman.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="password" placeholder="Password saat ini" />
        <Input type="password" placeholder="Password baru" />
        <Button className="w-full">Simpan password baru</Button>
      </CardContent>
    </Card>
  );
}
