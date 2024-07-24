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
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { useTranslations } from "next-intl";
import { LoadingButton } from "@/shared/components/loading-button";
import { addTeamMember } from "../server-actions/team";
import { getUseMyTeamQueryKey } from "../hooks/use-my-team";

const formSchema = z.object({
  email: z.string().email(),
});

export const AddTeamMemberForm = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const addTeamMemberMutation = useMutation({
    mutationFn: (email: string) => addTeamMember(email),
    onSuccess: () => {
      toast.success(t("addTeamMemberSuccess"));
      queryClient.refetchQueries({
        queryKey: getUseMyTeamQueryKey(),
      });
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    addTeamMemberMutation.mutate(values.email);
  }

  return (
    <Form {...form}>
      <AppForm
        onSubmit={form.handleSubmit(onSubmit)}
        submitButton={
          <LoadingButton
            isLoading={addTeamMemberMutation.isPending}
            type="submit"
          >
            {t("addTeamMember")}
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
