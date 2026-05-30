import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ForgotPasswordPage() {
  return (
    <Card className="border-border/60 bg-card/90 shadow-soft">
      <CardHeader>
        <CardTitle>Lupa Password</CardTitle>
        <p className="text-sm text-muted-foreground">Struktur halaman ini siap terhubung ke token reset dan email provider.</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Input type="email" placeholder="Email kampus" />
        <Button className="w-full">Kirim tautan reset</Button>
      </CardContent>
    </Card>
  );
}
