"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { requireAdmin } from "@/features/auth/server-actions/user";
import { prisma } from "@/lib/db";
import { UTApi } from "uploadthing/server";

const utapi = new UTApi();

export const getPosterTemplates = async () => {
  const user = await requireAuthentication();

  const posterTemplates = await prisma.posterTemplate.findMany({
    where: {
      teamId: user.teamId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  return posterTemplates;
};

export const deletePosterTemplate = async (id: string) => {
  const user = await requireAdmin();

  const deletedPosterTemplates = await prisma.posterTemplate.delete({
    where: { id, teamId: user.teamId },
  });

  await utapi.deleteFiles(deletedPosterTemplates.utKey);

  return true;
};
