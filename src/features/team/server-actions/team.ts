"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { requireAdmin } from "@/features/auth/server-actions/user";
import { prisma } from "@/lib/db";

export const getMyTeam = async (take?: number, skip?: number) => {
  const user = await requireAuthentication();

  const team = await prisma.team.findUnique({
    where: {
      id: user.teamId,
    },
    include: {
      _count: {
        select: {
          members: true,
        },
      },
      members: {
        take,
        skip,
      },
    },
  });

  if (!team) {
    throw new Error("Team not found");
  }

  return team;
};

export const addTeamMember = async (email: string) => {
  const user = await requireAdmin();

  const appUser = await prisma.user.findUnique({
    where: { email, teamId: null },
  });

  if (!appUser) throw new Error("User not found or not available");

  const myTeam = await prisma.team.findUnique({
    where: { id: user.teamId },
  });

  if (!myTeam) throw new Error("No team found");

  await prisma.team.update({
    where: { id: myTeam.id },
    data: {
      members: {
        connect: {
          id: appUser.id,
        },
      },
    },
  });

  return true;
};

export const deleteTeamMember = async (userId: string) => {
  const user = await requireAdmin();

  const myTeam = await prisma.team.findUnique({
    where: { id: user.teamId },
  });

  if (!myTeam) throw new Error("No team found");

  await prisma.team.update({
    where: { id: myTeam.id },
    data: {
      members: {
        disconnect: {
          id: userId,
        },
      },
    },
  });

  return true;
};
