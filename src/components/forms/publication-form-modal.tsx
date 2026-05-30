"use client";

import { useEffect } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { publicationCategorySchema, publicationUpsertSchema } from "@/schemas/publication";
import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import type { z } from "zod";

export type PublicationFormValues = z.infer<typeof publicationUpsertSchema>;

interface PublicationFormModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  initialValues?: Partial<PublicationFormValues> & { id?: string };
}

async function savePublication(values: PublicationFormValues & { id?: string }) {
  const response = await fetch(values.id ? `/api/publications/${values.id}` : "/api/publications", {
    method: values.id ? "PUT" : "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(values)
  });

  if (!response.ok) {
    throw new Error("Failed to save publication");
  }

  return response.json();
}

export function PublicationFormModal({ open, onOpenChange, initialValues }: PublicationFormModalProps) {
  const queryClient = useQueryClient();
  const form = useForm<PublicationFormValues>({
    resolver: zodResolver(publicationUpsertSchema),
    defaultValues: {
      title: initialValues?.title ?? "",
      authors: initialValues?.authors ?? [{ authorName: "", orderIndex: 0 }],
      doi: initialValues?.doi ?? "",
      journal: initialValues?.journal ?? "",
      publisher: initialValues?.publisher ?? "",
      year: Number(initialValues?.year ?? new Date().getFullYear()),
      quartile: initialValues?.quartile ?? "",
      indexing: initialValues?.indexing ?? "",
      citationCount: Number(initialValues?.citationCount ?? 0),
      category: initialValues?.category ?? "SCOPUS",
      fileName: initialValues?.fileName ?? "",
      filePath: initialValues?.filePath ?? "",
      fileMimeType: initialValues?.fileMimeType ?? "",
      fileSize: initialValues?.fileSize ?? undefined
    }
  });

  useEffect(() => {
    form.reset({
      title: initialValues?.title ?? "",
      authors: initialValues?.authors ?? [{ authorName: "", orderIndex: 0 }],
      doi: initialValues?.doi ?? "",
      journal: initialValues?.journal ?? "",
      publisher: initialValues?.publisher ?? "",
      year: initialValues?.year ?? new Date().getFullYear(),
      quartile: initialValues?.quartile ?? "",
      indexing: initialValues?.indexing ?? "",
      citationCount: Number(initialValues?.citationCount ?? 0),
      category: initialValues?.category ?? "SCOPUS",
      fileName: initialValues?.fileName ?? "",
      filePath: initialValues?.filePath ?? "",
      fileMimeType: initialValues?.fileMimeType ?? "",
      fileSize: initialValues?.fileSize ?? undefined
    });
  }, [form, initialValues, open]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "authors"
  });

  const mutation = useMutation({
    mutationFn: savePublication,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["publications"] });
      onOpenChange(false);
    }
  });

  const onSubmit = form.handleSubmit((values) => mutation.mutate({ ...values, id: initialValues?.id }));

  return (
    <Modal
      open={open}
      onOpenChange={onOpenChange}
      title={initialValues?.id ? "Edit Publikasi" : "Tambah Publikasi"}
      description="Kelola metadata publikasi, author list, dan file attachment."
    >
      <form className="grid gap-4 md:grid-cols-2" onSubmit={onSubmit}>
        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">Judul</label>
          <Input placeholder="Judul publikasi" {...form.register("title")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">DOI</label>
          <Input placeholder="10.xxxx/xxxx" {...form.register("doi")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Kategori</label>
          <Select {...form.register("category")}>
            {publicationCategorySchema.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Jurnal</label>
          <Input placeholder="Nama jurnal" {...form.register("journal")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Publisher</label>
          <Input placeholder="Nama penerbit" {...form.register("publisher")} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Tahun</label>
          <Input type="number" {...form.register("year", { valueAsNumber: true })} />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Citations</label>
          <Input type="number" {...form.register("citationCount", { valueAsNumber: true })} />
        </div>

        <div className="space-y-2 md:col-span-2">
          <div className="flex items-center justify-between">
            <label className="text-sm font-medium">Authors</label>
            <Button type="button" variant="outline" size="sm" onClick={() => append({ authorName: "", orderIndex: fields.length })}>
              Tambah author
            </Button>
          </div>
          <div className="space-y-3">
            {fields.map((field, index) => (
              <div key={field.id} className="grid gap-3 rounded-2xl border p-4 md:grid-cols-3">
                <Input placeholder="Nama author" {...form.register(`authors.${index}.authorName` as const)} />
                <Input placeholder="Affiliation" {...form.register(`authors.${index}.affiliation` as const)} />
                <div className="flex gap-2">
                  <Input type="number" placeholder="Urutan" {...form.register(`authors.${index}.orderIndex` as const, { valueAsNumber: true })} />
                  <Button type="button" variant="ghost" size="sm" onClick={() => remove(index)} disabled={fields.length === 1}>
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-2 md:col-span-2">
          <label className="text-sm font-medium">File Path</label>
          <Input placeholder="/uploads/publications/file.pdf" {...form.register("filePath")} />
        </div>

        <div className="flex items-center justify-end gap-3 md:col-span-2">
          <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
            Batal
          </Button>
          <Button type="submit" disabled={mutation.isPending}>
            {mutation.isPending ? "Menyimpan..." : "Simpan Publikasi"}
          </Button>
        </div>
      </form>
    </Modal>
  );
}
