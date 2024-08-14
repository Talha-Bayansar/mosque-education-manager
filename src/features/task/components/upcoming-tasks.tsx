"use client";

import { isArrayEmpty } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { isToday, isTomorrow } from "date-fns";
import {
  CalendarIcon,
  Text,
  ListCheckIcon,
  UserIcon,
  LucideIcon,
} from "lucide-react";
import { format } from "date-fns";
import { View } from "@/shared/components/layout/view";
import { TaskStatus } from "@prisma/client";
import { useTranslations } from "next-intl";
import type { Task } from "../types";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";

type Props = {
  upcomingTasks: Task[];
};

export const UpcomingTasks = ({ upcomingTasks }: Props) => {
  const t = useTranslations();

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("upcomingTasks")}</CardTitle>
      </CardHeader>
      <CardContent>
        <View>
          <View>
            {!isArrayEmpty(upcomingTasks) ? (
              upcomingTasks.map((task) => (
                <TaskCard key={task.id} task={task} />
              ))
            ) : (
              <p>{t("noUpcomingMeetups")}</p>
            )}
          </View>
        </View>
      </CardContent>
    </Card>
  );
};

type TaskCardProps = {
  task: Task;
};

type TaskLine = {
  Icon: LucideIcon;
  value?: string | null;
};

const TaskCard = ({ task }: TaskCardProps) => {
  const t = useTranslations();

  const getStatusTranslation = (status: TaskStatus) => {
    switch (status) {
      case TaskStatus.BACKLOG:
        return t("backlog");
      case TaskStatus.TODO:
        return t("todo");
      case TaskStatus.IN_PROGRESS:
        return t("inProgress");
      case TaskStatus.DONE:
        return t("done");
      default:
        return status;
    }
  };

  const taskLines: TaskLine[] = [
    {
      Icon: ListCheckIcon,
      value: getStatusTranslation(task.status),
    },
    {
      Icon: UserIcon,
      value: task.assignedUser?.email,
    },
    {
      Icon: CalendarIcon,
      value:
        task.dueDate &&
        (isToday(task.dueDate)
          ? t("today")
          : isTomorrow(task.dueDate)
          ? t("tomorrow")
          : format(task.dueDate, "dd/MM/yyyy")),
    },
  ];

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Card>
          <CardHeader>
            <h3 className="font-medium">{task.title}</h3>
          </CardHeader>
          <CardContent>
            {taskLines.map(
              (taskLine) =>
                taskLine.value && (
                  <p key={taskLine.value} className="flex gap-2 items-center">
                    <taskLine.Icon className="flex-shrink-0" size={16} />
                    <span>{taskLine.value}</span>
                  </p>
                )
            )}
          </CardContent>
        </Card>
      </DrawerTrigger>
      <DrawerContent>
        <View>
          <h3 className="font-medium">{t("description")}</h3>
          <p>{task.description}</p>
        </View>
      </DrawerContent>
    </Drawer>
  );
};
