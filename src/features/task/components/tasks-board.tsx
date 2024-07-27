"use client";

import { Kanban } from "@/shared/components/kanban";
import type { Task } from "@prisma/client";

type Props = {
  tasks: Task[];
};

export const TasksBoard = ({ tasks }: Props) => {
  return <Kanban tasks={tasks} />;
};
