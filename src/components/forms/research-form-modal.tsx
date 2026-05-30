"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { researchStatusSchema, researchUpsertSchema } from "@/schemas/research";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import type { z } from "zod";

export type ResearchFormValues = z.infer<typeof researchUpsertSchema>;

interface ResearchFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: Partial<ResearchFormValues> & { id?: string };
  leaderOptions: Array<{ id: string; name: string }>;
}

async function saveResearch(values: ResearchFormValues & { id?: string }) {
  const response = await fetch(values.id ? `/api/research/${values.id}` : "/api/research", {
    method: values.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  if (!response.ok) {
    throw new Error("Failed to save research");
  }

  return response.json();
}

export function ResearchFormModal({ open, onOpenChange, initialValues, leaderOptions }: ResearchFormModalProps) {
  const queryClient = useQueryClient();
  const defaults = useMemo<ResearchFormValues>(() => ({
    title: initialValues?.title ?? "",
    abstract: initialValues?.abstract ?? "",
    year: Number(initialValues?.year ?? new Date().getFullYear()),
    budget: Number(initialValues?.budget ?? 0),
    scheme: initialValues?.scheme ?? "",
    status: initialValues?.status ?? "DRAFT",
    progress: Number(initialValues?.progress ?? 0),
    leaderId: initialValues?.leaderId ?? leaderOptions[0]?.id ?? "",
    memberIds: initialValues?.memberIds ?? []
  }), [initialValues, leaderOptions]);

  const form = useForm<ResearchFormValues>({
    resolver: zodResolver(researchUpsertSchema),
    defaultValues: defaults
  });

  useEffect(() => {
    form.reset(defaults);
  }, [defaults, form]);

  const mutation = useMutation({
    mutationFn: saveResearch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["researches"] });
      onOpenChange(false);
      form.reset(defaults);
    }
  });

  const onSubmit = form.handleSubmit((values) => mutation.mutate({ ...values, id: initialValues?.id }));

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialValues?.id ? "Edit Penelitian" : "Tambah Penelitian"}
      description="Lengkapi data penelitian, status, progress, dan ketua peneliti."
    >
      <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Judul</label>
          <Input placeholder="Judul penelitian" {...form.register("title")} />
          {form.formState.errors.title ? <p className="text-xs text-destructive">{form.formState.errors.title.message}</p> : null}
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Abstrak</label>
          <Textarea placeholder="Tuliskan abstrak penelitian" {...form.register("abstract")} />
          {form.formState.errors.abstract ? <p className="text-xs text-destructive">{form.formState.errors.abstract.message}</p> : null}
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tahun</label>
          <Input type="number" {...form.register("year", { valueAsNumber: true })} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Dana</label>
          <Input type="number" {...form.register("budget", { valueAsNumber: true })} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Skema</label>
          <Input placeholder="Skema pendanaan" {...form.register("scheme")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Status</label>
          <Select {...form.register("status")}>{researchStatusSchema.options.map((option) => <option key={option} value={option}>{option}</option>)}</Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Progress</label>
          <Input type="number" min={0} max={100} {...form.register("progress", { valueAsNumber: true })} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Ketua</label>
          <Select {...form.register("leaderId")}>
            {leaderOptions.map((leader) => (
              <option key={leader.id} value={leader.id}>
                {leader.name}
              </option>
            ))}
          </Select>
        </div>

        <div className="flex items-center justify-end gap-3 md:col-span-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Menyimpan..." : "Simpan Penelitian"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
