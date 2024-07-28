"use client";

import { UploadDropzone } from "@/lib/uploadthing";
import { useMutation } from "@tanstack/react-query";
import { createPosterTemplate } from "../server-actions/poster";
import type { UploadedFileData } from "uploadthing/types";
import { toast } from "sonner";
import { useTranslations } from "next-intl";

type Props = {
  disabled?: boolean;
};

export const UploadPosterTemplate = ({ disabled }: Props) => {
  const t = useTranslations();
  const createPosterTemplateMutation = useMutation({
    mutationFn: async (values: UploadedFileData) =>
      await createPosterTemplate({
        utKey: values.key,
        utName: values.name,
        utUrl: values.url,
      }),
    onSuccess: () => {
      toast.success(t("createPosterTemplateSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  return (
    <UploadDropzone
      endpoint="imageUploader"
      disabled={disabled}
      onClientUploadComplete={(res) => {
        t("uploadFileSuccess");
        for (const file of res) {
          createPosterTemplateMutation.mutate(file);
        }
      }}
      onUploadError={(error: Error) => {
        toast.error(t("somethingWentWrong"));
      }}
    />
  );
};
