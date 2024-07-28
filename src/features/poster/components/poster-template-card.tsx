"use client";

import { Card } from "@/shared/components/ui/card";
import type { PosterTemplate } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import { deletePosterTemplate } from "../server-actions/poster";
import { toast } from "sonner";
import { useTranslations } from "next-intl";
import { AlertModal } from "@/shared/components/alert-modal";
import { Skeleton } from "@/shared/components/ui/skeleton";

type Props = {
  posterTemplate: PosterTemplate;
};

export const PosterTemplateCard = ({ posterTemplate }: Props) => {
  const t = useTranslations();
  const deletePosterTemplateMutation = useMutation({
    mutationFn: () => deletePosterTemplate(posterTemplate.id),
    onSuccess: () => {
      toast.success(t("deletePosterTemplateSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });
  return (
    <Card className="overflow-clip group relative h-min">
      <AlertModal
        trigger={
          <button className="hidden group-hover:block absolute top-2 right-2 z-10">
            <Trash2 className="text-destructive" />
          </button>
        }
        title={t("deletePosterTemplate")}
        onContinue={() => deletePosterTemplateMutation.mutate()}
      />

      <div className="group-hover:opacity-30">
        <Image
          key={posterTemplate.utName}
          alt={posterTemplate.utName}
          src={posterTemplate.utUrl}
          className="w-auto h-auto"
          width={500}
          height={500}
        />
      </div>
    </Card>
  );
};

export const PosterTemplateCardSkeleton = () => {
  return (
    <Card className="w-full h-80">
      <Skeleton className="h-full w-full" />
    </Card>
  );
};
