import Link from "next/link";
import { LoginForm } from "@/components/forms/login-form";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export default function LoginPage() {
  return (
    <div className="space-y-6">
      <Card className="border-border/60 bg-card/90 shadow-soft">
        <CardHeader>
          <CardDescription>Welcome back</CardDescription>
          <CardTitle className="text-2xl">Masuk ke ResearchHub Campus</CardTitle>
          <p className="text-sm text-muted-foreground">Gunakan akun demo seed untuk mencoba dashboard dan role-based view.</p>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <Link href="/forgot-password" className="transition-colors hover:text-foreground">Forgot password</Link>
        <Link href="/change-password" className="transition-colors hover:text-foreground">Change password</Link>
      </div>
    </div>
  );
}
