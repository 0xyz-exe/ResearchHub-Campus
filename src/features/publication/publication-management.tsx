"use client";

import { useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Download, Filter, Plus, Pencil, Trash2 } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PublicationFormModal } from "@/components/forms/publication-form-modal";
import type { PublicationFormValues } from "@/components/forms/publication-form-modal";

interface PublicationRow {
  id: string;
  title: string;
  category: string;
  year: number;
  citationCount: number;
  journal?: string | null;
  doi?: string | null;
  publisher?: string | null;
  quartile?: string | null;
  indexing?: string | null;
  fileName?: string | null;
  filePath?: string | null;
  fileMimeType?: string | null;
  fileSize?: number | null;
  authors: Array<{ authorName: string; orderIndex: number; affiliation?: string | null; userId?: string | null }>;
}

async function fetchPublications() {
  const response = await fetch("/api/publications");
  if (!response.ok) {
    throw new Error("Failed to load publications");
  }

  const payload = await response.json();
  return payload.data as PublicationRow[];
}

async function deletePublication(id: string) {
  const response = await fetch(`/api/publications/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deletedById: undefined })
  });

  if (!response.ok) {
    throw new Error("Failed to delete publication");
  }

  return response.json();
}

export function PublicationManagement() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<PublicationRow | null>(null);
  const queryClient = useQueryClient();

  const publicationQuery = useQuery({
    queryKey: ["publications"],
    queryFn: fetchPublications
  });

  const deleteMutation = useMutation({
    mutationFn: deletePublication,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["publications"] });
    }
  });

  return (
    <div className="space-y-6">
      <PageHeading
        title="Repository Publikasi"
        description="CRUD publikasi, search, filter, dan download file PDF."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Publications" }]}
        actions={
          <>
            <Button variant="outline"><Filter className="h-4 w-4" />Filter</Button>
            <Button
              onClick={() => {
                setEditingRow(null);
                setIsModalOpen(true);
              }}
            >
              <Plus className="h-4 w-4" />Tambah Publikasi
            </Button>
          </>
        }
      />

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Kategori</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Sitasi</TableHead>
                <TableHead>Jurnal</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {publicationQuery.data?.map((publication) => (
                <TableRow key={publication.id}>
                  <TableCell className="max-w-[360px] font-medium">{publication.title}</TableCell>
                  <TableCell><Badge className="bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">{publication.category}</Badge></TableCell>
                  <TableCell>{publication.year}</TableCell>
                  <TableCell>{publication.citationCount}</TableCell>
                  <TableCell>{publication.journal ?? "-"}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="sm" asChild>
                        <a href={publication.filePath ?? "#"} target="_blank" rel="noreferrer">
                          <Download className="h-4 w-4" />Download
                        </a>
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRow(publication);
                          setIsModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(publication.id)}>
                        <Trash2 className="h-4 w-4" />Hapus
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      <PublicationFormModal
        open={isModalOpen}
        onOpenChange={(open) => {
          setIsModalOpen(open);
          if (!open) {
            setEditingRow(null);
          }
        }}
        initialValues={editingRow ? {
          id: editingRow.id,
          title: editingRow.title,
          authors: editingRow.authors.map((author) => ({
            authorName: author.authorName,
            affiliation: author.affiliation ?? undefined,
            orderIndex: author.orderIndex,
            userId: author.userId ?? undefined
          })),
          doi: editingRow.doi ?? undefined,
          journal: editingRow.journal ?? undefined,
          publisher: editingRow.publisher ?? undefined,
          year: editingRow.year,
          quartile: editingRow.quartile ?? undefined,
          indexing: editingRow.indexing ?? undefined,
          citationCount: editingRow.citationCount,
          category: editingRow.category as PublicationFormValues["category"],
          fileName: editingRow.fileName ?? undefined,
          filePath: editingRow.filePath ?? undefined,
          fileMimeType: editingRow.fileMimeType ?? undefined,
          fileSize: editingRow.fileSize ?? undefined
        } : undefined}
      />
    </div>
  );
}
