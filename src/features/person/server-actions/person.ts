"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";
import { Nullable } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

export const getPeople = async () => {
  const user = await requireAuthentication();

  const people = await prisma.person.findMany({
    where: {
      teamId: user.teamId,
    },
  });

  return people;
};

export const createPerson = async (
  personInput: Nullable<Prisma.PersonCreateInput, "team">
) => {
  const user = await requireAuthentication();

  const person = await prisma.person.create({
    data: {
      ...personInput,
      teamId: user.teamId as string,
      team: undefined,
    },
  });

  return person;
};
