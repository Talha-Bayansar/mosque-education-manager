"use client";

import { useGroupMembersContext } from "@/features/group/hooks/use-group-members-context";
import { updateGroupMembers } from "@/features/group/server-actions/group";
import {
  getUsePeopleByGroupIdQueryKey,
  usePeopleByGroupId,
} from "@/features/person/hooks/use-people-by-group-id";
import { LoadingButton } from "@/shared/components/loading-button";
import type { Person } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type Props = {
  peopleByGroupServer: Person[] | string[];
};

export const SaveMembersButton = ({ peopleByGroupServer }: Props) => {
  const { groupId } = useParams<{ groupId: string }>();
  usePeopleByGroupId({
    groupId,
    onlyIds: true,
    initialData: peopleByGroupServer,
  });
  const t = useTranslations();
  const queryClient = useQueryClient();
  const { memberIdsToAdd, memberIdsToRemove } = useGroupMembersContext()!;

  const updateGroupMembersMutation = useMutation({
    mutationFn: () =>
      updateGroupMembers(groupId, memberIdsToAdd, memberIdsToRemove),
    onSuccess: () => {
      toast.success(t("updateGroupSuccess"));
      queryClient.refetchQueries({
        queryKey: getUsePeopleByGroupIdQueryKey(groupId),
      });
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  return (
    <LoadingButton
      onClick={() => updateGroupMembersMutation.mutate()}
      isLoading={updateGroupMembersMutation.isPending}
    >
      {t("save")}
    </LoadingButton>
  );
};
