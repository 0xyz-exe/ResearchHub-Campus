import type { RoleCode } from "@prisma/client";

export const rolePermissions: Record<RoleCode, string[]> = {
  SUPER_ADMIN: ["*"],
  ADMIN_LPPM: ["research:*", "review:*", "publication:*", "report:*", "notification:read"],
  REVIEWER: ["review:read", "review:write", "notification:read"],
  KAPRODI: ["dashboard:prodi", "report:read", "notification:read"],
  DOSEN: ["research:own", "publication:own", "dashboard:personal", "notification:read"]
};

export function hasPermission(permissions: string[] | undefined, permission: string) {
  if (!permissions) {
    return false;
  }

  return permissions.includes("*") || permissions.some((item) => {
    if (item === permission) {
      return true;
    }

    if (item.endsWith(":*") && permission.startsWith(item.slice(0, -1))) {
      return true;
    }

    return false;
  });
}
