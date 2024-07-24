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

export const searchPeople = async (query?: string) => {
  const user = await requireAuthentication();

  if (!query) {
    return [];
  }

  const people = await prisma.person.findMany({
    where: {
      OR: [
        { lastName: { contains: query, mode: "insensitive" } },
        { firstName: { contains: query, mode: "insensitive" } },
      ],
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
  let filter: any = {};

  if (onlyIds) {
    filter = {
      select: {
        id: true,
      },
    };
  } else {
    filter = {
      orderBy: {
        lastName: "asc",
      },
    };
  }

  const people = await prisma.group.findUnique({
    where: { id: groupId, teamId: user.teamId },
    select: {
      members: filter,
    },
  });

  return onlyIds ? people?.members.map((p) => p.id) : people?.members;
};

export const getAttendanceByMeetupId = async (
  meetupId: string,
  onlyIds: boolean = false
) => {
  const user = await requireAuthentication();

  const attendance = await prisma.person.findMany({
    where: {
      attendanceMeetups: {
        some: {
          id: meetupId,
        },
      },
      teamId: user.teamId,
    },
    orderBy: {
      lastName: "asc",
    },
    select: onlyIds ? { id: true } : undefined,
  });

  return onlyIds ? attendance.map((a) => a.id) : attendance;
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
