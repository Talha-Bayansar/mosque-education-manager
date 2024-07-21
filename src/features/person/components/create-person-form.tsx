"use client";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/shared/components/ui/popover";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { Calendar } from "@/shared/components/ui/calendar";
import { format } from "date-fns";
import { useMutation } from "@tanstack/react-query";
import { createPerson } from "../server-actions/person";
import { toast } from "sonner";
import { useRouter } from "@/navigation";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";

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

export const CreatePersonForm = () => {
  const t = useTranslations();
  const router = useRouter();
  const createPersonMutation = useMutation({
    mutationFn: (values: z.infer<typeof formSchema>) => createPerson(values),
    onSuccess: () => {
      toast.success(t("createPersonSuccess"));
      router.push(routes.dashboard.people.root);
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
      router.push(routes.dashboard.people.root);
    },
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    createPersonMutation.mutate(values);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={<Button type="submit">{t("create")}</Button>}
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
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>{t("dateOfBirth")}</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      className="w-full"
                      captionLayout="dropdown-buttons"
                      fromDate={new Date(1900, 0, 1)}
                      toDate={new Date()}
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                    />
                  </PopoverContent>
                </Popover>
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
