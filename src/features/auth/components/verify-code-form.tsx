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
import { AppForm } from "@/shared/components/app-form";
import { useMutation } from "@tanstack/react-query";
import { signin } from "../server-actions/auth";
import { toast } from "sonner";
import { useRouter } from "@/navigation";
import { routes } from "@/lib/routes";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/shared/components/ui/input-otp";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@/shared/components/loading-button";

type Props = {
  email: string;
};

const formSchema = z.object({
  code: z.string().min(6),
});

export const VerifyCodeForm = ({ email }: Props) => {
  const router = useRouter();
  const t = useTranslations();
  const sendVerificationCodeMutation = useMutation({
    mutationFn: (code: string) => signin(email, code),
    onSuccess: () => {
      router.push(routes.dashboard.root);
    },
    onError: () => {
      toast.error(t("invalidVerificationCode"));
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    sendVerificationCodeMutation.mutate(values.code);
  }

  return (
    <Form {...form}>
      <AppForm
        className="w-max"
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton
            isLoading={sendVerificationCodeMutation.isPending}
            type="submit"
          >
            {t("verifyCode")}
          </LoadingButton>
        }
      >
        <FormField
          control={form.control}
          name="code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("verificationCode")}</FormLabel>
              <FormControl>
                <div className="flex justify-between">
                  <InputOTP maxLength={8} {...field}>
                    <InputOTPGroup>
                      <InputOTPSlot index={0} />
                      <InputOTPSlot index={1} />
                      <InputOTPSlot index={2} />
                      <InputOTPSlot index={3} />
                    </InputOTPGroup>
                    <InputOTPGroup>
                      <InputOTPSlot index={4} />
                      <InputOTPSlot index={5} />
                      <InputOTPSlot index={6} />
                      <InputOTPSlot index={7} />
                    </InputOTPGroup>
                  </InputOTP>
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </AppForm>
    </Form>
  );
};
