"use client";

import { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";
import type { Person } from "@prisma/client";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useMeetupAttendanceContext } from "./use-meetup-attendance-context";

export const useMeetupAttendanceTableColumns = () => {
  const t = useTranslations();
  const { handleCheck, selectedPersonIds } = useMeetupAttendanceContext()!;

  const columns: ColumnDef<Person>[] = [
    {
      id: "select",
      cell: ({ row }) => {
        const person = row.original;

        return (
          <Checkbox
            checked={!!selectedPersonIds.find((e) => e === person.id)}
            onCheckedChange={(value) =>
              handleCheck(value as boolean, person.id)
            }
            aria-label="Select row"
          />
        );
      },
    },
    {
      accessorKey: "lastName",
      header: t("lastName"),
    },
    {
      accessorKey: "firstName",
      header: t("firstName"),
    },
  ];

  return columns;
};
