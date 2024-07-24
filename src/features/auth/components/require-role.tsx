"use client";

import type { UserRole } from "@prisma/client";
import { useSession } from "../hooks/use-session";

type Props = {
  roles: UserRole[];
  children: React.ReactNode;
};

export const RequireRole = ({ roles, children }: Props) => {
  const { data } = useSession({});

  if (!roles.includes(data!.user!.role)) {
    return null;
  }
  return children;
};
