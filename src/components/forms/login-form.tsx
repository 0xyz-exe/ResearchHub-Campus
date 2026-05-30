"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signIn } from "next-auth/react";
import { loginSchema, type LoginInput } from "@/schemas/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";

export function LoginForm() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "dosen@researchhub.local",
      password: "Password123!"
    }
  });

  const onSubmit = form.handleSubmit(async (values) => {
    setIsSubmitting(true);
    setErrorMessage(null);

    const response = await signIn("credentials", {
      email: values.email,
      password: values.password,
      redirect: false,
      callbackUrl: "/dashboard"
    });

    setIsSubmitting(false);

    if (response?.error) {
      setErrorMessage("Email atau password tidak valid.");
      return;
    }

    window.location.href = response?.url ?? "/dashboard";
  });

  return (
    <Card className="border-border/60 bg-card/90 shadow-soft">
      <CardContent className="p-6">
        <form className="space-y-4" onSubmit={onSubmit}>
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input type="email" placeholder="you@campus.ac.id" {...form.register("email")} />
            {form.formState.errors.email ? <p className="text-xs text-destructive">{form.formState.errors.email.message}</p> : null}
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input type="password" placeholder="••••••••" {...form.register("password")} />
            {form.formState.errors.password ? <p className="text-xs text-destructive">{form.formState.errors.password.message}</p> : null}
          </div>
          {errorMessage ? <p className="rounded-xl border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{errorMessage}</p> : null}
          <Button className="w-full" type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Signing in..." : "Sign in"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
