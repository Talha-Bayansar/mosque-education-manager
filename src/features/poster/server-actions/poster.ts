"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { requireAdmin } from "@/features/auth/server-actions/user";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import type { Nullable } from "@/lib/utils";
import { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";
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

export const createPosterTemplate = async (
  input: Nullable<Prisma.PosterTemplateCreateInput, "team">
) => {
  const user = await requireAdmin();

  const posterTemplate = await prisma.posterTemplate.create({
    data: {
      ...input,
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  revalidatePath(routes.dashboard.posters.root);

  return posterTemplate;
};

export const deletePosterTemplate = async (id: string) => {
  const user = await requireAdmin();

  const deletedPosterTemplates = await prisma.posterTemplate.delete({
    where: { id, teamId: user.teamId },
  });

  await utapi.deleteFiles(deletedPosterTemplates.utKey);

  revalidatePath(routes.dashboard.posters.root);

  return true;
};
