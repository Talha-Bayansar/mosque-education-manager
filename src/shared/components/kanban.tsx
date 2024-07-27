"use client";

import { TaskStatus, type User, type Task } from "@prisma/client";
import { CalendarCheck, Grip, UserIcon } from "lucide-react";
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
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useDraggable,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateTask } from "@/features/task/server-actions/task";
import { format } from "date-fns";

type Props = {
  tasks: (Task & {
    assignedUser?: User;
  })[];
  onClickTask?: (
    task: Task & {
      assignedUser?: User;
    }
  ) => unknown;
};

type Column = {
  title: string;
  value: TaskStatus;
  tasks: (Task & {
    assignedUser?: User;
  })[];
};

export const Kanban = ({ tasks: data, onClickTask }: Props) => {
  const t = useTranslations();
  const [tasks, setTasks] = useState(data);
  const updateTaskStatusMutation = useMutation({
    mutationFn: async (values: { id: string; status: TaskStatus }) =>
      await updateTask(values.id, {
        status: values.status,
      }),
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  useEffect(() => {
    setTasks(data);
  }, [data]);

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);

  const sensors = useSensors(mouseSensor, touchSensor, keyboardSensor);

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
      updateTaskStatusMutation.mutate({
        id: active.id as string,
        status: over!.id as TaskStatus,
      });
      setTasks((tasks) =>
        tasks.map((task) =>
          task.id === active.id ? ({ ...task, status: over?.id } as Task) : task
        )
      );
    }
  };

  return (
    <ScrollArea className="w-full">
      <div className="flex xl:grid xl:grid-cols-4 gap-6 w-full">
        <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
          {columns.map((column) => (
            <KanbanColumn
              key={column.title}
              column={column}
              onClickItem={onClickTask}
            />
          ))}
        </DndContext>
      </div>
      <ScrollBar className="mt-4" orientation="horizontal" />
    </ScrollArea>
  );
};

const KanbanColumn = ({
  column,
  onClickItem,
}: {
  column: Column;
  onClickItem?: (
    task: Task & {
      assignedUser?: User;
    }
  ) => unknown;
}) => {
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
              <KanbanItem key={task.id} task={task} onClick={onClickItem} />
            ))}
        </View>
      </CardContent>
    </Card>
  );
};

const KanbanItem = ({
  task,
  onClick,
}: {
  task: Task & { assignedUser?: User };
  onClick?: (
    task: Task & {
      assignedUser?: User;
    }
  ) => unknown;
}) => {
  const t = useTranslations();
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });
  const style = {
    transform: CSS.Translate.toString(transform),
  };

  return (
    <Card
      onClick={() => {
        if (onClick) {
          onClick(task);
        }
      }}
      className="touch-manipulation flex items-center justify-between cursor-pointer p-4"
      ref={setNodeRef}
      style={style}
    >
      <View>
        <CardHeader className="p-0">
          <CardTitle>{task.title}</CardTitle>
        </CardHeader>
        <CardContent className="p-0 space-y-2">
          <span className="flex items-center gap-2 text-sm">
            <CalendarCheck className="w-4 h-4" />
            {task.dueDate
              ? format(task.dueDate, "dd/MM/yyyy")
              : t("notSpecified")}
          </span>
          <div className="flex items-center gap-2 text-sm">
            <UserIcon className="w-4 h-4" />
            <span>{task.assignedUser?.name ?? t("notSpecified")}</span>
          </div>
        </CardContent>
      </View>
      <Grip className="cursor-grab shrink-0" {...listeners} {...attributes} />
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
