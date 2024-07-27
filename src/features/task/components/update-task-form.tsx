"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import type { Task, User } from "@prisma/client";
import { useTranslations } from "next-intl";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppForm } from "@/shared/components/app-form";
import { LoadingButton } from "@/shared/components/loading-button";
import { Input } from "@/shared/components/ui/input";
import { SearchSelect } from "@/shared/components/search-select";
import { DateField } from "@/shared/components/date-field";
import { Textarea } from "@/shared/components/ui/textarea";
import { updateTask } from "../server-actions/task";

type Props = {
  users: User[];
  task: Task & {
    assignedUser?: User;
  };
};

const formSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  assignedUserId: z.string().optional(),
});

export const UpdateTaskForm = ({ users, task }: Props) => {
  const t = useTranslations();
  const updateTaskMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) =>
      await updateTask(task.id, {
        title: values.title,
        description: values.description,
        dueDate: values.dueDate,
        assignedUser: values.assignedUserId
          ? {
              connect: {
                id: values.assignedUserId,
              },
            }
          : undefined,
      }),
    onSuccess: () => {
      toast.success(t("updateTaskSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: task.title,
      description: task.description ?? "",
      assignedUserId: task.assignedUser?.id ?? "",
      dueDate: task.dueDate ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateTaskMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton isLoading={updateTaskMutation.isPending} type="submit">
            {t("update")}
          </LoadingButton>
        }
      >
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("title")}*</FormLabel>
              <FormControl>
                <Input placeholder={t("title")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("description")}</FormLabel>
              <FormControl>
                <Textarea placeholder={t("description")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dueDate"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("date")}</FormLabel>
              <FormControl>
                <DateField field={field} enableFutureSelection />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="assignedUserId"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("user")}</FormLabel>
              <FormControl>
                <SearchSelect
                  items={users.map((user) => ({
                    label: user.email ?? t("notSpecified"),
                    value: user.id,
                  }))}
                  selectedItem={
                    task.assignedUser && {
                      label: task.assignedUser.email,
                      value: task.assignedUser.id,
                    }
                  }
                  placeholder={t("selectUser")}
                  onSelect={(value) => form.setValue("assignedUserId", value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </AppForm>
    </Form>
  );
};
