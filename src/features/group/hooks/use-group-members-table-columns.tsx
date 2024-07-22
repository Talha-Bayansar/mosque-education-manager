"use client";

import { useIsDesktop } from "@/shared/hooks/use-is-desktop";
import type { Person } from "@prisma/client";
import type { ColumnDef } from "@tanstack/react-table";
import { useTranslations } from "next-intl";

import { Checkbox } from "@/shared/components/ui/checkbox";
import { useGroupMembersContext } from "./use-group-members-context";

export const useGroupMembersTableColumns = () => {
  const t = useTranslations();
  const isDesktop = useIsDesktop();
  const { selectedMemberIds, handleCheck } = useGroupMembersContext()!;

  const columns: ColumnDef<Person>[] = [
    {
      id: "select",
      cell: ({ row }) => {
        const person = row.original;

        return (
          <Checkbox
            checked={!!selectedMemberIds.find((e) => e === person.id)}
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

  return columns.filter((column) =>
    isDesktop ? column : !column.enableHiding
  );
};
