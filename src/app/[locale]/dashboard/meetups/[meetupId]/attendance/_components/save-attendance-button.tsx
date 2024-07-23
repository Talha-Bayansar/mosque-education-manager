"use client";

import { LoadingButton } from "@/shared/components/loading-button";
import { useTranslations } from "next-intl";

type Props = {};

export const SaveAttendanceButton = (props: Props) => {
  const t = useTranslations();

  return <LoadingButton>{t("save")}</LoadingButton>;
};
