import type { NextAuthOptions } from "next-auth";
import type { User as NextAuthUser } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import { loginSchema } from "@/schemas/auth";
import { rolePermissions } from "@/lib/rbac";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";

export const authOptions: NextAuthOptions = {
  session: {
    strategy: "jwt" as const
  },
  pages: {
    signIn: "/login"
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        const parsed = loginSchema.safeParse(credentials);
        if (!parsed.success) {
          return null;
        }

        const user = await prisma.user.findFirst({
          where: {
            email: parsed.data.email,
            deletedAt: null,
            isActive: true
          },
          include: {
            role: true
          }
        });

        if (!user) {
          return null;
        }

        const passwordMatches = await bcrypt.compare(parsed.data.password, user.passwordHash);
        if (!passwordMatches) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role.code,
          permissions: rolePermissions[user.role.code],
          department: user.department,
          prodi: user.prodi
        } satisfies NextAuthUser;
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: NextAuthUser }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.permissions = user.permissions;
        token.department = user.department;
        token.prodi = user.prodi;
      }

      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
        session.user.permissions = token.permissions ?? [];
        session.user.department = token.department ?? null;
        session.user.prodi = token.prodi ?? null;
      }

      return session;
    }
  }
};
