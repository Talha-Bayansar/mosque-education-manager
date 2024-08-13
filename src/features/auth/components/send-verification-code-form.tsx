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
import { useMutation } from "@tanstack/react-query";
import { sendEmailVerificationCode } from "../server-actions/auth";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";
import { useRouter } from "@/navigation";
import { LoadingButton } from "@/shared/components/loading-button";

const formSchema = z.object({
  email: z.string().email(),
});

export const SendVerificationCodeForm = () => {
  const router = useRouter();
  const t = useTranslations();
  const sendVerificationCodeMutation = useMutation({
    mutationFn: (email: string) => sendEmailVerificationCode(email),
    onSuccess: (_, variables) => {
      toast.success(t("sendVerificationCodeSuccess"));
      const params = new URLSearchParams([["email", variables]]);
      router.push(`${routes.signin.root}?${params}`);
    },
    onError: () => {
      toast.error(t("sendVerificationCodeError"));
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendVerificationCodeMutation.mutate(values.email);
  }

  return (
    <Form {...form}>
      <AppForm
        className="md:w-[500px]"
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton
            isLoading={sendVerificationCodeMutation.isPending}
            type="submit"
          >
            {t("sendVerificationCode")}
          </LoadingButton>
        }
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("email")}</FormLabel>
              <FormControl>
                <Input
                  placeholder="example@acme.com"
                  type="email"
                  inputMode="email"
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
