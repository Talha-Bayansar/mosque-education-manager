"use client";

import { useMeetupAttendanceContext } from "@/features/meetup/hooks/use-meetup-attendance-context";
import { updateMeetupAttendance } from "@/features/meetup/server-actions/meetup";
import { LoadingButton } from "@/shared/components/loading-button";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export const SaveAttendanceButton = () => {
  const t = useTranslations();
  const { meetupId } = useParams<{ meetupId: string }>();
  const { personIdsToAdd, personIdsToRemove } = useMeetupAttendanceContext()!;
  const updateAttendanceMutation = useMutation({
    mutationFn: async () =>
      await updateMeetupAttendance(meetupId, personIdsToAdd, personIdsToRemove),
    onSuccess: () => {
      toast.success(t("updateAttendanceSuccess"));
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
