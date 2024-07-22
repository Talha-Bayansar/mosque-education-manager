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
    orderBy: {
      lastName: "asc",
    },
  });

  return people;
};

export const getPeopleByGroupId = async (
  groupId: string,
  onlyIds: boolean = false
) => {
  const user = await requireAuthentication();
  let filter: any = {
    orderBy: {
      lastName: "asc",
    },
  };

  if (onlyIds) {
    filter = {
      ...filter.orderBy,
      select: {
        id: true,
      },
    };
  }

  const people = await prisma.group
    .findUnique({
      where: { id: groupId, teamId: user.teamId },
      select: {
        members: filter,
      },
    })
    .members();

  return onlyIds ? people?.map((p) => p.id) : people;
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
      team: {
        connect: {
          id: user.teamId,
        },
      },
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
      team: {
        connect: {
          id: user.teamId,
        },
      },
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
