"use server";

import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { requireAdmin } from "@/features/auth/server-actions/user";
import { prisma } from "@/lib/db";
import { routes } from "@/lib/routes";
import { type Nullable } from "@/lib/utils";
import { Prisma, UserRole } from "@prisma/client";
import { revalidatePath } from "next/cache";

export const getTasks = async () => {
  const user = await requireAuthentication();

  const tasks = await prisma.task.findMany({
    where: {
      AND: [
        {
          teamId: user.teamId,
        },
        {
          assignedUser: {
            id: user.role === UserRole.ADMIN ? undefined : user.id,
          },
        },
      ],
    },
    orderBy: [
      {
        dueDate: "asc",
      },
      {
        title: "asc",
      },
    ],
    include: {
      assignedUser: true,
    },
  });

  return tasks;
};

export const getUpcomingTasks = async (date: Date) => {
  const user = await requireAuthentication();

  const tasks = await prisma.task.findMany({
    where: {
      AND: [
        {
          teamId: user.teamId,
        },
        {
          dueDate: {
            gte: date,
          },
        },
        {
          assignedUser: {
            id: user.role === UserRole.ADMIN ? undefined : user.id,
          },
        },
      ],
    },
    orderBy: [
      {
        dueDate: "asc",
      },
      {
        title: "asc",
      },
    ],
    include: {
      assignedUser: true,
    },
  });

  return tasks;
};

export const createTask = async (
  taskInput: Nullable<Prisma.TaskCreateInput, "team">
) => {
  const user = await requireAdmin();

  const task = await prisma.task.create({
    data: {
      ...taskInput,
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  revalidatePath(routes.dashboard.tasks.root);

  return task;
};

export const updateTask = async (
  id: string,
  taskInput: Nullable<Prisma.TaskUpdateInput, "team">
) => {
  const user = await requireAuthentication();

  if (!taskInput.status) {
    await requireAdmin();
  }

  const task = await prisma.task.update({
    where: { id, teamId: user.teamId },
    data: {
      ...taskInput,
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  revalidatePath(routes.dashboard.tasks.root);

  return task;
};

export const deleteTask = async (id: string) => {
  const user = await requireAdmin();

  await prisma.task.delete({
    where: { id, teamId: user.teamId },
  });

  revalidatePath(routes.dashboard.tasks.root);

  return true;
};
