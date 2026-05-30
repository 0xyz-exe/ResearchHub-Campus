import type { DefaultSession } from "next-auth";
import type { RoleCode } from "@prisma/client";

declare module "next-auth" {
  interface Session {
    user: DefaultSession["user"] & {
      id: string;
      role: RoleCode;
      permissions: string[];
      department?: string | null;
      prodi?: string | null;
    };
  }

  interface User {
    id: string;
    role: RoleCode;
    permissions: string[];
    department?: string | null;
    prodi?: string | null;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    role: RoleCode;
    permissions: string[];
    department?: string | null;
    prodi?: string | null;
  }
}

export {};
