"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import { Nullable } from "@/lib/utils";
import { UserRole, type Prisma } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getMeetups = async (take?: number, skip?: number) => {
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
      group: true,
      speaker: true,
      host: true,
    },
    take,
    skip,
  });

  return meetups;
};

export const getMeetupsCount = async () => {
  const user = await requireAuthentication();

  const count = await prisma.meetup.count({
    where: {
      teamId: user.teamId,
    },
  });

  return count;
};

export const getMeetupById = async (id: string) => {
  const user = await requireAuthentication();

  const meetup = await prisma.meetup.findUnique({
    where: {
      id,
      teamId: user.teamId,
    },
    include: {
      speaker: true,
      group: true,
      host: true,
    },
  });

  if (!meetup) {
    throw new Error("Meetup not found");
  }

  return meetup;
};

export const getUpcomingMeetups = async (date: Date) => {
  await requireAuthentication();

  const meetups = await prisma.meetup.findMany({
    where: {
      date: {
        gte: date,
      },
    },
    orderBy: {
      date: "asc",
    },
    include: {
      host: true,
      speaker: true,
    },
  });

  return meetups;
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

  revalidatePath(routes.dashboard.meetups.root);

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

  revalidatePath(routes.dashboard.meetups.id(id).update.root);
  revalidatePath(routes.dashboard.meetups.root);

  return meetup;
};

export const updateMeetupAttendance = async (
  meetupId: string,
  personIdsToAdd: string[],
  personIdsToRemove: string[]
) => {
  const user = await requireAuthentication();

  await prisma.meetup.update({
    where: { id: meetupId, teamId: user.teamId },
    data: {
      attendance: {
        connect: personIdsToAdd.map((id) => ({ id })),
        disconnect: personIdsToRemove.map((id) => ({ id })),
      },
    },
  });

  revalidatePath(routes.dashboard.meetups.id(meetupId).attendance.root);

  return true;
};

export const deleteMeetup = async (id: string) => {
  const user = await requireAuthentication();

  await prisma.meetup.delete({
    where: { id, teamId: user.teamId },
  });

  revalidatePath(routes.dashboard.meetups.root);

  return true;
};
