"use client";

import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { FormControl } from "./ui/form";
import { Calendar } from "./ui/calendar";
import { format, type Locale } from "date-fns";
import type { ControllerRenderProps } from "react-hook-form";
import { nl } from "date-fns/locale/nl";
import { tr } from "date-fns/locale/tr";
import { useParams } from "next/navigation";
import { useTranslations } from "next-intl";

type Props = {
  field: ControllerRenderProps<any>;
  enableFutureSelection?: boolean;
};

const locales: Record<string, Locale> = {
  nl: nl,
  tr: tr,
};

export const DateField = ({ field, enableFutureSelection = false }: Props) => {
  const t = useTranslations();
  const { locale } = useParams<{
    locale: string;
  }>();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <FormControl>
          <Button
            variant={"outline"}
            className={cn(
              "pl-3 text-left font-normal",
              !field.value && "text-muted-foreground"
            )}
          >
            {field.value ? (
              format(field.value, "dd/MM/yyyy")
            ) : (
              <span>{t("pickDate")}</span>
            )}
            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
          </Button>
        </FormControl>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          className="w-full"
          captionLayout="dropdown-buttons"
          locale={locales[locale]}
          weekStartsOn={1}
          fromDate={new Date(1900, 0, 1)}
          toDate={enableFutureSelection ? undefined : new Date()}
          mode="single"
          selected={field.value}
          onSelect={field.onChange}
        />
      </PopoverContent>
    </Popover>
  );
};
