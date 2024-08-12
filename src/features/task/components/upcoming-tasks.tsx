"use server";

import { isArrayEmpty } from "@/lib/utils";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card";
import { isToday, isTomorrow, startOfToday } from "date-fns";
import { CalendarIcon, Text, ListCheckIcon, UserIcon } from "lucide-react";
import { getTranslations } from "next-intl/server";
import { format } from "date-fns";
import { View } from "@/shared/components/layout/view";
import { getUpcomingTasks } from "../server-actions/task";
import { TaskStatus } from "@prisma/client";

export const UpcomingTasks = async () => {
  const t = await getTranslations();
  const upcomingTasks = await getUpcomingTasks(startOfToday());

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
                <Card key={task.id}>
                  <CardHeader>
                    <h3 className="font-medium">{task.title}</h3>
                  </CardHeader>
                  <CardContent>
                    {task.description && (
                      <p className="flex gap-2 items-center">
                        <Text size={16} />
                        <span>{task.description}</span>
                      </p>
                    )}
                    <p className="flex gap-2 items-center">
                      <ListCheckIcon size={16} />
                      <span>{getStatusTranslation(task.status)}</span>
                    </p>
                    {task.assignedUser && (
                      <p className="flex gap-2 items-center">
                        <UserIcon size={16} />
                        <span>{task.assignedUser.email}</span>
                      </p>
                    )}
                    {task.dueDate && (
                      <p className="flex gap-2 items-center">
                        <CalendarIcon size={16} />
                        <span>
                          {isToday(task.dueDate)
                            ? t("today")
                            : isTomorrow(task.dueDate)
                            ? t("tomorrow")
                            : format(task.dueDate, "dd/MM/yyyy")}
                        </span>
                      </p>
                    )}
                  </CardContent>
                </Card>
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
