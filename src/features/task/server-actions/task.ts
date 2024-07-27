import { requireAuthentication } from "@/features/auth/server-actions/auth";
import { requireAdmin } from "@/features/auth/server-actions/user";
import { prisma } from "@/lib/db";
import { type Nullable } from "@/lib/utils";
import { Prisma } from "@prisma/client";

export const getTasks = async () => {
  const user = await requireAuthentication();

  const tasks = await prisma.task.findMany({
    where: {
      teamId: user.teamId,
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

  return task;
};

export const updateTask = async (
  id: string,
  taskInput: Nullable<Prisma.TaskUpdateInput, "team">
) => {
  const user = await requireAdmin();

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

  return task;
};

export const deleteTask = async (id: string) => {
  const user = await requireAdmin();

  await prisma.task.delete({
    where: { id, teamId: user.teamId },
  });

  return true;
};
