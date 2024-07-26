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
import { useMutation } from "@tanstack/react-query";
import { createGroup } from "../server-actions/group";
import { toast } from "sonner";

const formSchema = z.object({
  name: z.string().min(1).max(50),
});

export const CreateGroupForm = () => {
  const t = useTranslations();
  const createGroupMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => createGroup(values),
    onSuccess: () => {
      toast.success(t("createGroupSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createGroupMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton isLoading={createGroupMutation.isPending}>
            {t("createGroup")}
          </LoadingButton>
        }
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("name")}*</FormLabel>
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
