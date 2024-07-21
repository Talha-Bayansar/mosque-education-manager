"use client";

import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { IconButton } from "@/shared/components/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import type { Person } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { deletePerson } from "../server-actions/person";
import { toast } from "sonner";
import { getUsePeopleQueryKey } from "./use-people";
import { AlertModal } from "@/shared/components/alert-modal";

export const usePeopleTableColumns = () => {
  const t = useTranslations();
  const queryClient = useQueryClient();
  const deletePersonMutation = useMutation({
    mutationFn: (personId: string) => deletePerson(personId),
    onSuccess: () => {
      toast.success(t("deletePersonSuccess"));
      queryClient.refetchQueries({
        queryKey: getUsePeopleQueryKey(),
      });
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const columns: ColumnDef<Person>[] = [
    {
      accessorKey: "firstName",
      header: t("firstName"),
    },
    {
      accessorKey: "lastName",
      header: t("lastName"),
    },
    {
      accessorKey: "dateOfBirth",
      header: t("dateOfBirth"),
      cell: ({ row }) => {
        const dateOfBirth = row.original.dateOfBirth;
        const formattedDate = dateOfBirth && format(dateOfBirth, "dd-MM-yyyy");

        return formattedDate ?? "Not defined";
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const person = row.original;

        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <IconButton>
                <span className="sr-only">{t("openMenu")}</span>
                <MoreHorizontal />
              </IconButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
              <DropdownMenuItem>
                <Link href={routes.dashboard.people.id(person.id).update.root}>
                  {t("update")}
                </Link>
              </DropdownMenuItem>
              <AlertModal
                title={t("deletePerson")}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {t("delete")}
                  </DropdownMenuItem>
                }
                onContinue={() => deletePersonMutation.mutate(person.id)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
