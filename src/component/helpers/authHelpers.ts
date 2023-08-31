import { User } from "../../types";

export const isAdmin = (user: User | null): any =>
  !user
    ? false
    : user.role.includes("ADMIN") || user.role.includes("SUPERADMIN");

export const isSuperAdmin = (user: User | null) =>
  !user ? false : user.role.includes("SUPERADMIN");

export const isClient = (user: User | null) =>
  !user
    ? false
    : !user.role.includes("ADMIN") ||
      !user.role.includes("SUPERADMIN") ||
      !user.role.includes("ITEMEDITOR");
