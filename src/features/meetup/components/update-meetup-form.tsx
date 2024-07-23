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
import { updateMeetup } from "../server-actions/meetup";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { AppForm } from "@/shared/components/app-form";
import { LoadingButton } from "@/shared/components/loading-button";
import { DateField } from "@/shared/components/date-field";
import { SearchSelect } from "@/shared/components/search-select";
import { useSearchPeople } from "@/features/person/hooks/use-search-people";
import { useDebounceValue } from "@/shared/hooks/use-debounce-value";
import type { Meetup, Person } from "@prisma/client";

const formSchema = z.object({
  subject: z.string().min(1).max(50),
  date: z.date(),
  speakerId: z.string().min(1).max(50),
});

type Props = {
  meetup: Meetup & {
    speaker: Person;
  };
};

export const UpdateMeetupForm = ({ meetup }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const [query, setQuery] = useDebounceValue<string>("", 500);
  const { data: speakers, isLoading } = useSearchPeople({ query });
  const updateMeetupMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      updateMeetup(meetup.id, {
        subject: values.subject,
        date: values.date,
        speaker: {
          connect: {
            id: values.speakerId,
          },
        },
      }),
    onSuccess: () => {
      toast.success(t("updateMeetupSuccess"));
      router.push(routes.dashboard.meetups.root);
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      subject: meetup.subject,
      speakerId: meetup.speakerId ?? undefined,
      date: meetup.date,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateMeetupMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton
            isLoading={updateMeetupMutation.isPending}
            type="submit"
          >
            {t("update")}
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
                <SearchSelect
                  items={
                    speakers?.map((s) => ({
                      label: `${s.lastName} ${s.firstName}`,
                      value: s.id,
                    })) || []
                  }
                  placeholder={t("selectSpeaker")}
                  initialValue={meetup.speaker.id}
                  initialLabel={`${meetup.speaker.lastName} ${meetup.speaker.firstName}`}
                  isLoading={isLoading}
                  onSelect={(value) => form.setValue("speakerId", value)}
                  onQueryChange={setQuery}
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
