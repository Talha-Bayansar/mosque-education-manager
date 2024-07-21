"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";

export const getPeople = async () => {
  const user = await requireAuthentication();

  const people = await prisma.person.findMany({
    where: {
      teamId: user.teamId,
    },
  });

  return people;
};
