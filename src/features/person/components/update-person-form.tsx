"use client";

import { nl } from "date-fns/locale/nl";
import { tr } from "date-fns/locale/tr";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/shared/components/ui/button";
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
import { format, type Locale } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { updatePerson } from "../server-actions/person";
import { toast } from "sonner";
import { useRouter } from "@/navigation";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { type Person } from "@prisma/client";
import { DateField } from "@/shared/components/date-field";

const formSchema = z.object({
  firstName: z.string().min(1).max(50),
  lastName: z.string().min(1).max(50),
  phoneNumber: z.string().optional(),
  dateOfBirth: z.date().optional(),
  city: z.string().optional(),
  zipCode: z.string().optional(),
  street: z.string().optional(),
  houseNumber: z.string().optional(),
});

const locales: Record<string, Locale> = {
  nl: nl,
  tr: tr,
};

type Props = {
  person: Person;
};

export const UpdatePersonForm = ({ person }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const { locale, personId } = useParams<{
    locale: string;
    personId: string;
  }>();
  const updatePersonMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) =>
      updatePerson(personId, {
        ...values,
        dateOfBirth: values.dateOfBirth
          ? format(values.dateOfBirth, "yyyy-MM-dd")
          : undefined,
      }),
    onSuccess: () => {
      toast.success(t("updatePersonSuccess"));
      router.push(routes.dashboard.people.root);
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: person.firstName,
      lastName: person.lastName,
      phoneNumber: person.phoneNumber ?? undefined,
      dateOfBirth: person.dateOfBirth ?? undefined,
      city: person.city ?? undefined,
      zipCode: person.zipCode ?? undefined,
      street: person.street ?? undefined,
      houseNumber: person.houseNumber ?? undefined,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updatePersonMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={<Button type="submit">{t("update")}</Button>}
      >
        <FormField
          control={form.control}
          name="firstName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("firstName")}*</FormLabel>
              <FormControl>
                <Input placeholder="Talha" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="lastName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("lastName")}*</FormLabel>
              <FormControl>
                <Input placeholder="Bayansar" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>{t("dateOfBirth")}</FormLabel>
              <FormControl>
                <DateField field={field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("phoneNumber")}</FormLabel>
              <FormControl>
                <Input
                  inputMode="tel"
                  placeholder="+32 4XX XX XX XX"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="city"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("city")}</FormLabel>
              <FormControl>
                <Input placeholder={t("city")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zipCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("zipCode")}</FormLabel>
              <FormControl>
                <Input placeholder={t("zipCode")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="street"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("street")}</FormLabel>
              <FormControl>
                <Input placeholder={t("street")} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="houseNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("houseNumber")}</FormLabel>
              <FormControl>
                <Input
                  inputMode="numeric"
                  placeholder={t("houseNumber")}
                  {...field}
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
