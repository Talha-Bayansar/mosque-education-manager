"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import { Nullable } from "@/lib/utils";
import type { Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getPeople = async () => {
  const user = await requireAuthentication();

  const people = await prisma.person.findMany({
    where: {
      teamId: user.teamId,
    },
  });

  return people;
};

export const getPersonById = async (id: string) => {
  const user = await requireAuthentication();

  const person = await prisma.person.findUnique({
    where: {
      id,
      teamId: user.teamId,
    },
  });

  if (!person) {
    throw new Error("Person not found");
  }

  return person;
};

export const createPerson = async (
  personInput: Nullable<Prisma.PersonCreateInput, "team">
) => {
  const user = await requireAuthentication();

  const person = await prisma.person.create({
    data: {
      ...personInput,
      dateOfBirth: personInput.dateOfBirth && new Date(personInput.dateOfBirth),
      teamId: user.teamId as string,
      team: undefined,
    },
  });

  return person;
};

export const updatePerson = async (
  id: string,
  personInput: Prisma.PersonUpdateInput
) => {
  const user = await requireAuthentication();

  const person = await prisma.person.update({
    where: { id, teamId: user.teamId },
    data: {
      ...personInput,
      dateOfBirth:
        personInput.dateOfBirth && new Date(personInput.dateOfBirth.toString()),
    },
  });

  revalidatePath(routes.dashboard.people.id(id).update.root);

  return person;
};

export const deletePerson = async (id: string) => {
  const user = await requireAuthentication();

  await prisma.person.delete({
    where: { id, teamId: user.teamId },
  });

  return true;
};
