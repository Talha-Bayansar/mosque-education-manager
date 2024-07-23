"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";
import { Nullable } from "@/lib/utils";
import type { Prisma } from "@prisma/client";

export const getMeetups = async () => {
  const user = await requireAuthentication();

  const meetups = await prisma.meetup.findMany({
    where: {
      teamId: user.teamId,
    },
    orderBy: {
      date: "desc",
    },
    include: {
      _count: {
        select: {
          attendance: true,
        },
      },
      speaker: true,
    },
  });

  return meetups;
};

export const getMeetupById = async (id: string) => {
  const user = await requireAuthentication();

  const meetup = await prisma.meetup.findUnique({
    where: {
      id,
      teamId: user.teamId,
    },
  });

  if (!meetup) {
    throw new Error("Meetup not found");
  }

  return meetup;
};

export const createMeetup = async (
  input: Nullable<Prisma.MeetupCreateInput, "team">
) => {
  const user = await requireAuthentication();

  const meetup = await prisma.meetup.create({
    data: {
      ...input,
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  return meetup;
};

export const updateMeetup = async (
  id: string,
  input: Prisma.MeetupUpdateInput
) => {
  const user = await requireAuthentication();

  const meetup = await prisma.meetup.update({
    where: { id, teamId: user.teamId },
    data: {
      ...input,
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  //   revalidatePath(routes.dashboard.people.id(id).update.root);

  return meetup;
};

export const deleteMeetup = async (id: string) => {
  const user = await requireAuthentication();

  await prisma.meetup.delete({
    where: { id, teamId: user.teamId },
  });

  return true;
};
