"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";
import { Nullable } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

export const getGroups = async (take?: number, skip?: number) => {
  const user = await requireAuthentication();

  const groups = await prisma.group.findMany({
    where: {
      teamId: user.teamId,
    },
    orderBy: {
      name: "asc",
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
    },
    take,
    skip,
  });

  return groups;
};

export const getGroupsCount = async () => {
  const user = await requireAuthentication();

  const count = await prisma.group.count({
    where: {
      teamId: user.teamId,
    },
  });

  return count;
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
      team: {
        connect: {
          id: user.teamId,
        },
      },
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
    data: {
      ...groupInput,
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  return group;
};

export const updateGroupMembers = async (
  groupId: string,
  memberIdsToAdd: string[],
  memberIdsToRemove: string[]
) => {
  const user = await requireAuthentication();

  await prisma.group.update({
    where: { id: groupId, teamId: user.teamId },
    data: {
      members: {
        connect: memberIdsToAdd.map((id) => ({ id })),
        disconnect: memberIdsToRemove.map((id) => ({ id })),
      },
    },
  });

  return true;
};

export const deleteGroup = async (id: string) => {
  const user = await requireAuthentication();

  await prisma.group.delete({
    where: { id, teamId: user.teamId },
  });

  return true;
};
