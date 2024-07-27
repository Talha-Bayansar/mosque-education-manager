"use client";

import { TaskStatus, type User, type Task } from "@prisma/client";
import { UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { cn, generateArray } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { View } from "./layout/view";
import { Separator } from "./ui/separator";
import {
  DndContext,
  type DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useState } from "react";

type Props = {
  tasks: (Task & {
    assignedUser?: User;
  })[];
};

type Column = {
  title: string;
  value: TaskStatus;
  tasks: (Task & {
    assignedUser?: User;
  })[];
};

export const Kanban = ({ tasks: data }: Props) => {
  const t = useTranslations();
  const [tasks, setTasks] = useState(data);

  const columns: Column[] = [
    {
      title: t("backlog"),
      value: TaskStatus.BACKLOG,
      tasks: tasks.filter((task) => task.status === TaskStatus.BACKLOG),
    },
    {
      title: t("todo"),
      value: TaskStatus.TODO,
      tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
    },
    {
      title: t("inProgress"),
      value: TaskStatus.IN_PROGRESS,
      tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
    },
    {
      title: t("done"),
      value: TaskStatus.DONE,
      tasks: tasks.filter((task) => task.status === TaskStatus.DONE),
    },
  ];

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (over?.id) {
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === active.id ? ({ ...task, status: over?.id } as Task) : task
        )
      );
    }
    console.log(tasks);
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex xl:grid xl:grid-cols-4 gap-6 w-full">
        <DndContext onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <KanbanColumn key={column.title} column={column} />
          ))}
        </DndContext>
      </div>
      <ScrollBar className="mt-4" orientation="horizontal" />
    </ScrollArea>
  );
};

const KanbanColumn = ({ column }: { column: Column }) => {
  const { isOver, setNodeRef } = useDroppable({
    id: column.value,
  });

  return (
    <Card
      ref={setNodeRef}
      className={cn("min-w-72", {
        "border-primary": isOver,
      })}
    >
      <CardHeader>
        <CardTitle>{column.title}</CardTitle>
      </CardHeader>
      <Separator />
      <CardContent className="p-4">
        <View>
          {column.tasks
            .filter((task) => task.status === column.value)
            .map((task) => (
              <KanbanItem key={task.id} task={task} />
            ))}
        </View>
      </CardContent>
    </Card>
  );
};

const KanbanItem = ({ task }: { task: Task & { assignedUser?: User } }) => {
  const t = useTranslations();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card ref={setNodeRef} style={style} {...listeners} {...attributes}>
      <CardHeader>
        <CardTitle>{task.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-2 text-sm">
          <UserIcon className="w-4 h-4" />
          <span>{task.assignedUser?.name ?? t("notSpecified")}</span>
        </div>
      </CardContent>
    </Card>
  );
};

export const KanbanSkeleton = () => {
  return (
    <ScrollArea className="w-full">
      <div className="flex xl:grid xl:grid-cols-4 gap-6 w-full">
        {generateArray(4).map((column) => (
          <Card key={`column_${column}`} className="min-w-64">
            <CardHeader>
              <CardTitle>
                <Skeleton className="h-6 w-full" />
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <View>
                {generateArray(2).map((task) => (
                  <Card key={`task_${task}`}>
                    <CardHeader>
                      <CardTitle>
                        <Skeleton className="h-6 w-full" />
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Skeleton className="h-8 w-full" />
                    </CardContent>
                  </Card>
                ))}
              </View>
            </CardContent>
          </Card>
        ))}
      </div>
      <ScrollBar className="mt-4" orientation="horizontal" />
    </ScrollArea>
  );
};
