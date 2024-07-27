"use client";

import { TaskStatus, type User, type Task } from "@prisma/client";
import { UserIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "./ui/card";
import { generateArray } from "@/lib/utils";
import { Skeleton } from "./ui/skeleton";
import { ScrollArea, ScrollBar } from "./ui/scroll-area";
import { View } from "./layout/view";
import { Separator } from "./ui/separator";

type Props = {
  tasks: (Task & {
    assignedUser?: User;
  })[];
};

type Column = {
  title: string;
  tasks: (Task & {
    assignedUser?: User;
  })[];
};

export const Kanban = ({ tasks }: Props) => {
  const t = useTranslations();
  const columns: Column[] = [
    {
      title: t("backlog"),
      tasks: tasks.filter((task) => task.status === TaskStatus.BACKLOG),
    },
    {
      title: t("todo"),
      tasks: tasks.filter((task) => task.status === TaskStatus.TODO),
    },
    {
      title: t("inProgress"),
      tasks: tasks.filter((task) => task.status === TaskStatus.IN_PROGRESS),
    },
    {
      title: t("done"),
      tasks: tasks.filter((task) => task.status === TaskStatus.DONE),
    },
  ];

  return (
    <ScrollArea className="w-full">
      <div className="flex xl:grid xl:grid-cols-4 gap-6 w-full">
        {columns.map((column) => (
          <Card key={column.title} className="min-w-72">
            <CardHeader>
              <CardTitle>{column.title}</CardTitle>
            </CardHeader>
            <Separator />
            <CardContent className="p-4">
              <View>
                {column.tasks
                  .filter((task) => task.status === TaskStatus.BACKLOG)
                  .map((task) => (
                    <Card key={task.id}>
                      <CardHeader>
                        <CardTitle>{task.title}</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm">
                          <UserIcon className="w-4 h-4" />
                          <span>
                            {task.assignedUser?.name ?? t("notSpecified")}
                          </span>
                        </div>
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
