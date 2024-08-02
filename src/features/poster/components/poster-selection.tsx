"use client";

import { Link, usePathname } from "@/navigation";
import { View } from "@/shared/components/layout/view";
import { Card } from "@/shared/components/ui/card";
import type { PosterTemplate } from "@prisma/client";
import { useTranslations } from "next-intl";
import Image from "next/image";

type Props = {
  posterTemplates: PosterTemplate[];
};

export const PosterSelection = ({ posterTemplates }: Props) => {
  const path = usePathname();
  const t = useTranslations();

  return (
    <View className="w-full items-start">
      <h2 className="text-2xl font-medium">{t("selectPosterTemplate")}</h2>
      <View className="md:grid md:grid-cols-4 w-full">
        {posterTemplates.map((posterTemplate) => {
          const params = new URLSearchParams([["image", posterTemplate.utUrl]]);

          return (
            <Link key={posterTemplate.id} href={`${path}?${params}`}>
              <Card className="overflow-clip group relative h-min">
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
            </Link>
          );
        })}
      </View>
    </View>
  );
};
