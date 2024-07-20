"use client";

import { locales } from "@/config";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { useParams, useSearchParams } from "next/navigation";
import { usePathname, useRouter } from "@/navigation";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

type Props = {
  className?: string;
};

export const LanguageSelect = ({ className }: Props) => {
  const t = useTranslations();
  const params = useParams<{ locale: string }>();
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const changeLocale = (locale: "tr" | "nl") => {
    router.replace(`${pathName}?${searchParams}`, { locale });
  };

  return (
    <Select value={params.locale} onValueChange={changeLocale}>
      <SelectTrigger className={cn("uppercase", className)}>
        <SelectValue placeholder={t("selectLanguage")} />
      </SelectTrigger>
      <SelectContent>
        {locales.map((locale) => (
          <SelectItem className="uppercase" key={locale} value={locale}>
            {locale}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
