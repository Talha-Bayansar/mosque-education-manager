"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import { Nullable } from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getGroups = async () => {
  const user = await requireAuthentication();

  const groups = await prisma.group.findMany({
    where: {
      teamId: user.teamId,
    },
    orderBy: {
      name: "asc",
    },
  });

  return groups;
};

export const getGroupById = async (id: string) => {
  const user = await requireAuthentication();

  const group = await prisma.group.findUnique({
    where: {
      id,
      teamId: user.teamId,
    },
  });

  if (!group) {
    throw new Error("Group not found");
  }

  return group;
};

export const createGroup = async (
  groupInput: Nullable<Prisma.GroupCreateInput, "team">
) => {
  const user = await requireAuthentication();

  const group = await prisma.group.create({
    data: {
      ...groupInput,
      teamId: user.teamId as string,
      team: undefined,
    },
  });

  return group;
};

export const updateGroup = async (
  id: string,
  groupInput: Prisma.GroupUpdateInput
) => {
  const user = await requireAuthentication();

  const group = await prisma.group.update({
    where: { id, teamId: user.teamId },
    data: groupInput,
  });

  revalidatePath(routes.dashboard.groups.id(id).update.root);

  return group;
};

export const deleteGroup = async (id: string) => {
  const user = await requireAuthentication();

  await prisma.group.delete({
    where: { id, teamId: user.teamId },
  });

  return true;
};
