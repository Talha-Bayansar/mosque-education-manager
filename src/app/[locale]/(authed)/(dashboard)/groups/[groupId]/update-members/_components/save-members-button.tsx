"use client";

import { useGroupMembersContext } from "@/features/group/hooks/use-group-members-context";
import { updateGroupMembers } from "@/features/group/server-actions/group";

import { LoadingButton } from "@/shared/components/loading-button";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const SaveMembersButton = () => {
  const { groupId } = useParams<{ groupId: string }>();
  const t = useTranslations();
  const { memberIdsToAdd, memberIdsToRemove } = useGroupMembersContext()!;

  const updateGroupMembersMutation = useMutation({
    mutationFn: () =>
      updateGroupMembers(groupId, memberIdsToAdd, memberIdsToRemove),
    onSuccess: () => {
      toast.success(t("updateGroupSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  return (
    <LoadingButton
      className="w-auto"
      onClick={() => updateGroupMembersMutation.mutate()}
      isLoading={updateGroupMembersMutation.isPending}
    >
      {t("save")}
    </LoadingButton>
  );
};
