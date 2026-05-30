import type { RoleCode } from "@prisma/client";
import type { DefaultSession } from "next-auth";

export type AppRole = RoleCode;

export type AppUserSession = DefaultSession["user"] & {
  id: string;
  role: AppRole;
  permissions: string[];
  department?: string | null;
  prodi?: string | null;
};
