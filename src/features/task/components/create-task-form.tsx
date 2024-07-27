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
import { User } from "@prisma/client";
import { useTranslations } from "next-intl";
import { createTask } from "../server-actions/task";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { AppForm } from "@/shared/components/app-form";
import { LoadingButton } from "@/shared/components/loading-button";
import { Input } from "@/shared/components/ui/input";
import { SearchSelect } from "@/shared/components/search-select";
import { DateField } from "@/shared/components/date-field";
import { Textarea } from "@/shared/components/ui/textarea";

type Props = {
  users: User[];
};

const formSchema = z.object({
  title: z.string().min(1).max(50),
  description: z.string().optional(),
  dueDate: z.date().optional(),
  assignedUserId: z.string().optional(),
});

export const CreateTaskForm = ({ users }: Props) => {
  const t = useTranslations();
  const createTaskMutation = useMutation({
    mutationFn: async (values: z.infer<typeof formSchema>) =>
      await createTask({
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
      toast.success(t("createTaskSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      assignedUserId: "",
      dueDate: undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createTaskMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton isLoading={createTaskMutation.isPending} type="submit">
            {t("create")}
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
