"use client";

import { useMeetupAttendanceContext } from "@/features/meetup/hooks/use-meetup-attendance-context";
import { updateMeetupAttendance } from "@/features/meetup/server-actions/meetup";
import { getUseAttendanceByMeetupIdQueryKey } from "@/features/person/hooks/use-attendance-by-meetup-id";
import { LoadingButton } from "@/shared/components/loading-button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "sonner";

type Props = {};

export const SaveAttendanceButton = (props: Props) => {
  const t = useTranslations();
  const { meetupId } = useParams<{ meetupId: string }>();
  const queryClient = useQueryClient();
  const { personIdsToAdd, personIdsToRemove } = useMeetupAttendanceContext()!;
  const updateAttendanceMutation = useMutation({
    mutationFn: async () =>
      await updateMeetupAttendance(meetupId, personIdsToAdd, personIdsToRemove),
    onSuccess: () => {
      toast.success(t("updateAttendanceSuccess"));
      queryClient.refetchQueries({
        queryKey: getUseAttendanceByMeetupIdQueryKey(meetupId, true),
      });
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  return (
    <LoadingButton
      onClick={() => updateAttendanceMutation.mutate()}
      isLoading={updateAttendanceMutation.isPending}
    >
      {t("save")}
    </LoadingButton>
  );
};
