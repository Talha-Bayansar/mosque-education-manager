"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import { useMutation } from "@tanstack/react-query";
import { sendEmailVerificationCode } from "../server-actions/auth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { routes } from "@/lib/routes";

const formSchema = z.object({
  email: z.string().email(),
});

export const SendVerificationCodeForm = () => {
  const router = useRouter();
  const sendVerificationCodeMutation = useMutation({
    mutationFn: (email: string) => sendEmailVerificationCode(email),
    onSuccess: (_, variables) => {
      toast.success("Verification code sent successfully");
      const params = new URLSearchParams([["email", variables]]);
      router.push(`${routes.signin.root}?${params}`);
    },
    onError: () => {
      toast.error("Failed to send verification code");
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
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={<Button type="submit">Send verification code</Button>}
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="example@acme.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </AppForm>
    </Form>
  );
};
