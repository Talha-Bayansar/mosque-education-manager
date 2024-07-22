"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/shared/components/ui/form";
import { Input } from "@/shared/components/ui/input";
import { AppForm } from "@/shared/components/app-form";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@/shared/components/loading-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "../server-actions/group";
import { toast } from "sonner";
import { getUseGroupsQueryKey } from "../hooks/use-groups";
import type { Group } from "@prisma/client";

type Props = {
  group: Group;
};

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

export const UpdateGroupForm = ({ group }: Props) => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const updateGroupMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      updateGroup(group.id, values),
    onSuccess: () => {
      toast.success(t("updateGroupSuccess"));
      queryClient.refetchQueries({
        queryKey: getUseGroupsQueryKey(),
      });
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: group.name,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateGroupMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton isLoading={updateGroupMutation.isPending}>
            {t("updateGroup")}
          </LoadingButton>
        }
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}</FormLabel>
              <FormControl>
                <Input placeholder={t("name")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </AppForm>
    </Form>
  );
};
