"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import { Nullable } from "@/lib/utils";
import { InfiniteScrollResponse } from "@/shared/types/infinite-scroll-response";
import type { Person, Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getPeople = async (take?: number, skip?: number) => {
  const user = await requireAuthentication();

  const people = await prisma.person.findMany({
    where: {
      teamId: user.teamId,
    },
    orderBy: {
      lastName: "asc",
    },
    take,
    skip,
  });

  return people;
};

export const getPeopleCount = async () => {
  const user = await requireAuthentication();

  const count = await prisma.person.count({
    where: {
      teamId: user.teamId,
    },
  });

  return count;
};

export const searchPeople = async (
  query?: string,
  cursor?: string
): Promise<InfiniteScrollResponse<Person>> => {
  const user = await requireAuthentication();

  if (!query || !cursor) {
    return {
      data: [],
      metaData: {
        cursor: null,
        hasNextPage: false,
      },
    };
  }

  const result = await prisma.person.findMany({
    where: {
      OR: [
        { lastName: { contains: query, mode: "insensitive" } },
        { firstName: { contains: query, mode: "insensitive" } },
      ],
      teamId: user.teamId,
    },
    take: 10,
    ...(cursor && {
      skip: 1, // Do not include the cursor itself in the query result.
      cursor: {
        id: cursor,
      },
    }),
    orderBy: {
      lastName: "asc",
    },
  });

  if (result.length == 0) {
    return {
      data: [],
      metaData: {
        cursor: null,
        hasNextPage: false,
      },
    };
  }

  const lastItem = result[result.length - 1];
  const newCursor = lastItem.id;

  const nextPage = await prisma.person.findMany({
    take: 10,
    skip: 1, // Do not include the cursor itself in the query result.
    cursor: {
      id: newCursor,
    },
  });

  const data = {
    data: result,
    metaData: {
      cursor: newCursor,
      hasNextPage: nextPage.length > 0,
    },
  };

  return data;
};

export const getPeopleByGroupId = async (
  groupId: string,
  take?: number,
  skip?: number
) => {
  const user = await requireAuthentication();

  const people = await prisma.group.findUnique({
    where: { id: groupId, teamId: user.teamId },
    select: {
      _count: {
        select: {
          members: true,
        },
      },
      members: {
        orderBy: {
          lastName: "asc",
        },
        take,
        skip,
      },
    },
  });

  return people?.members;
};

export const getPeopleIdsByGroupId = async (groupId: string) => {
  const user = await requireAuthentication();

  const peopleIds = await prisma.group.findUnique({
    where: { id: groupId, teamId: user.teamId },
    select: {
      members: {
        select: {
          id: true,
        },
      },
    },
  });

  return peopleIds?.members.map((m) => m.id);
};

export const getAttendanceByMeetupId = async (meetupId: string) => {
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
  });

  return attendance;
};

export const getAttendanceIdsByMeetupId = async (meetupId: string) => {
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
    select: { id: true },
  });

  return attendance.map((a) => a.id);
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

  revalidatePath(routes.dashboard.people.root);

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
  revalidatePath(routes.dashboard.people.root);

  return person;
};

export const deletePerson = async (id: string) => {
  const user = await requireAuthentication();

  await prisma.person.delete({
    where: { id, teamId: user.teamId },
  });

  revalidatePath(routes.dashboard.people.root);

  return true;
};
