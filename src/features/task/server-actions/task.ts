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

  return tasks.map((t) => ({ ...t, dueDate: t.dueDate?.toISOString() }));
};

export const getUpcomingTasks = async (date: string) => {
  const user = await requireAuthentication();

  const tasks = await prisma.task.findMany({
    where: {
      AND: [
        {
          teamId: user.teamId,
        },
        {
          dueDate: {
            gte: new Date(date),
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

  return tasks.map((t) => ({ ...t, dueDate: t.dueDate?.toISOString() }));
};

export const createTask = async (
  taskInput: Nullable<Prisma.TaskCreateInput, "team"> & { dueDate: string }
) => {
  const user = await requireAdmin();

  const task = await prisma.task.create({
    data: {
      ...taskInput,
      dueDate: new Date(taskInput.dueDate),
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  revalidatePath(routes.dashboard.tasks.root);

  return { ...task, dueDate: task.dueDate?.toISOString() };
};

export const updateTask = async (
  id: string,
  taskInput: Nullable<Prisma.TaskUpdateInput, "team"> & { dueDate: string }
) => {
  const user = await requireAuthentication();

  if (!taskInput.status) {
    await requireAdmin();
  }

  const task = await prisma.task.update({
    where: { id, teamId: user.teamId },
    data: {
      ...taskInput,
      dueDate: new Date(taskInput.dueDate),
      team: {
        connect: {
          id: user.teamId,
        },
      },
    },
  });

  revalidatePath(routes.dashboard.tasks.root);

  return { ...task, dueDate: task.dueDate?.toISOString() };
};

export const deleteTask = async (id: string) => {
  const user = await requireAdmin();

  await prisma.task.delete({
    where: { id, teamId: user.teamId },
  });

  revalidatePath(routes.dashboard.tasks.root);

  return true;
};
