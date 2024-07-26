"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { signout } from "../server-actions/auth";
import { useRouter } from "@/navigation";
import { toast } from "sonner";
import { routes } from "@/lib/routes";
import { Button } from "@/shared/components/ui/button";
import { AlertModal } from "@/shared/components/alert-modal";

type Props = {
  className?: string;
};

export const SignoutButton = ({ className }: Props) => {
  const t = useTranslations();
  const router = useRouter();
  const signoutMutation = useMutation({
    mutationFn: async () => await signout(),
    onSuccess: () => {
      router.push(routes.signin.root);
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  return (
    <AlertModal
      title={t("signOut")}
      trigger={<Button variant={"destructive"}>{t("signOut")}</Button>}
      onContinue={() => signoutMutation.mutate()}
    />
  );
};
