"use client";

import { Kanban } from "@/shared/components/kanban";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
} from "@/shared/components/ui/drawer";
import { UserRole, type User } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useState } from "react";
import { UpdateTaskForm } from "./update-task-form";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { deleteTask } from "../server-actions/task";
import { AlertModal } from "@/shared/components/alert-modal";
import { Button } from "@/shared/components/ui/button";
import { View } from "@/shared/components/layout/view";
import { RequireRole } from "@/features/auth/components/require-role";
import type { Task } from "../types";

type Props = {
  tasks: Task[];
  users: User[];
};

export const TasksBoard = ({ tasks, users }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const t = useTranslations();
  const deleteTaskMutation = useMutation({
    mutationFn: async (id: string) => await deleteTask(id),
    onSuccess: () => {
      toast.success(t("deleteTaskSuccess"));
      setIsOpen(false);
      setSelectedTask(null);
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  return (
    <>
      <Kanban
        tasks={tasks}
        onClickTask={(task) => {
          setIsOpen(true);
          setSelectedTask(task);
        }}
      />
      <Drawer open={isOpen && !!selectedTask} onOpenChange={setIsOpen}>
        <DrawerContent aria-describedby="">
          <View>
            <DrawerTitle className="sr-only">{t("updateTask")}</DrawerTitle>
            {selectedTask && (
              <UpdateTaskForm task={selectedTask} users={users} />
            )}
            {selectedTask && (
              <RequireRole roles={[UserRole.ADMIN]}>
                <AlertModal
                  title={t("deleteTask")}
                  trigger={
                    <Button variant={"destructive"}>{t("delete")}</Button>
                  }
                  onContinue={() => deleteTaskMutation.mutate(selectedTask.id)}
                />
              </RequireRole>
            )}
          </View>
        </DrawerContent>
      </Drawer>
    </>
  );
};
