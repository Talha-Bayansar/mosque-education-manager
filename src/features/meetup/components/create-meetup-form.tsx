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
import { Input } from "@/shared/components/ui/input";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { useMutation } from "@tanstack/react-query";
import { createMeetup } from "../server-actions/meetup";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { AppForm } from "@/shared/components/app-form";
import { LoadingButton } from "@/shared/components/loading-button";
import { DateField } from "@/shared/components/date-field";
import { SearchSelect } from "@/shared/components/search-select";
import type { Group } from "@prisma/client";
import { SearchPeopleSelect } from "@/features/person/components/search-people-select";

const formSchema = z.object({
  subject: z.string().min(1).max(50),
  date: z.date(),
  speakerId: z.string().min(1).max(50),
  groupId: z.string().min(1).max(50),
});

type Props = {
  groups: Group[];
};

export const CreateMeetupForm = ({ groups }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const createMeetupMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      createMeetup({
        subject: values.subject,
        date: values.date,
        speaker: {
          connect: {
            id: values.speakerId,
          },
        },
        group: {
          connect: {
            id: values.groupId,
          },
        },
      }),
    onSuccess: () => {
      toast.success(t("createMeetupSuccess"));
      router.push(routes.dashboard.meetups.root);
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: "",
      speakerId: "",
      groupId: "",
      date: new Date(),
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createMeetupMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton
            isLoading={createMeetupMutation.isPending}
            type="submit"
          >
            {t("create")}
          </LoadingButton>
        }
      >
        <FormField
          control={form.control}
          name="subject"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("subject")}*</FormLabel>
              <FormControl>
                <Input placeholder={t("subject")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="speakerId"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("speaker")}*</FormLabel>
              <FormControl>
                <SearchPeopleSelect
                  onSelect={(value) => form.setValue("speakerId", value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="groupId"
          render={() => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("group")}*</FormLabel>
              <FormControl>
                <SearchSelect
                  items={groups!.map((g) => ({
                    label: g.name,
                    value: g.id,
                  }))}
                  placeholder={t("selectGroup")}
                  onSelect={(value) => form.setValue("groupId", value)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="date"
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
      </AppForm>
    </Form>
  );
};
