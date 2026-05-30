"use client";

import { useMemo, useState } from "react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { Plus, Search, Pencil, Trash2, FileUp } from "lucide-react";
import { PageHeading } from "@/components/ui/page-heading";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { ResearchFormModal } from "@/components/forms/research-form-modal";
import type { ResearchFormValues } from "@/components/forms/research-form-modal";

interface ResearchRow {
  id: string;
  title: string;
  abstract: string;
  year: number;
  budget: string | number;
  scheme: string;
  status: string;
  progress: number;
  leaderId: string;
  leader: { id: string; name: string };
}

interface UserOption {
  id: string;
  name: string;
}

async function fetchResearches(query?: string) {
  const url = new URL("/api/research", window.location.origin);
  if (query) {
    url.searchParams.set("query", query);
  }

  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to load research");
  }

  const payload = await response.json();
  return payload.data as ResearchRow[];
}

async function fetchUsers() {
  const response = await fetch("/api/users");
  if (!response.ok) {
    throw new Error("Failed to load users");
  }

  const payload = await response.json();
  return payload.data as UserOption[];
}

async function deleteResearch(id: string) {
  const response = await fetch(`/api/research/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ deletedById: undefined })
  });

  if (!response.ok) {
    throw new Error("Failed to delete research");
  }

  return response.json();
}

function formatBudget(value: number) {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0
  }).format(value);
}

export function ResearchManagement() {
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingRow, setEditingRow] = useState<ResearchRow | null>(null);
  const queryClient = useQueryClient();

  const researchQuery = useQuery({
    queryKey: ["researches", search],
    queryFn: () => fetchResearches(search)
  });

  const usersQuery = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers
  });

  const deleteMutation = useMutation({
    mutationFn: deleteResearch,
    onSuccess: async () => {
      await queryClient.invalidateQueries({ queryKey: ["researches"] });
    }
  });

  const leaderOptions = useMemo(() => usersQuery.data ?? [], [usersQuery.data]);

  return (
    <div className="space-y-6">
      <PageHeading
        title="Manajemen Penelitian"
        description="CRUD penelitian, upload dokumen, tracking progress, dan timeline luaran."
        breadcrumbs={[{ label: "Dashboard", href: "/dashboard" }, { label: "Research" }]}
        actions={
          <Button
            onClick={() => {
              setEditingRow(null);
              setIsModalOpen(true);
            }}
          >
            <Plus className="h-4 w-4" />Tambah Penelitian
          </Button>
        }
      />

      <Card>
        <CardContent className="flex flex-col gap-3 p-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full max-w-md">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input className="pl-10" placeholder="Cari penelitian atau ketua" value={search} onChange={(event) => setSearch(event.target.value)} />
          </div>
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => researchQuery.refetch()}>Refresh</Button>
            <Button variant="outline" onClick={() => setIsModalOpen(true)}><FileUp className="h-4 w-4" />Upload Dokumen</Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Judul</TableHead>
                <TableHead>Tahun</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Progress</TableHead>
                <TableHead>Ketua</TableHead>
                <TableHead>Dana</TableHead>
                <TableHead>Aksi</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {researchQuery.data?.map((research) => (
                <TableRow key={research.id}>
                  <TableCell className="max-w-[360px] font-medium">{research.title}</TableCell>
                  <TableCell>{research.year}</TableCell>
                  <TableCell><Badge className="bg-primary/10 text-primary">{research.status}</Badge></TableCell>
                  <TableCell>{research.progress}%</TableCell>
                  <TableCell>{research.leader?.name ?? "-"}</TableCell>
                  <TableCell>{formatBudget(Number(research.budget))}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => {
                          setEditingRow(research);
                          setIsModalOpen(true);
                        }}
                      >
                        <Pencil className="h-4 w-4" />Edit
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => deleteMutation.mutate(research.id)}>
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

      <ResearchFormModal
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
          abstract: editingRow.abstract,
          year: editingRow.year,
          budget: Number(editingRow.budget),
          scheme: editingRow.scheme,
          status: editingRow.status as ResearchFormValues["status"],
          progress: editingRow.progress,
          leaderId: editingRow.leaderId,
          memberIds: []
        } : undefined}
        leaderOptions={leaderOptions}
      />
    </div>
  );
}
