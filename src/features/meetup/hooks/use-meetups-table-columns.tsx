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
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { format } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { AlertModal } from "@/shared/components/alert-modal";
import { deleteMeetup } from "../server-actions/meetup";
import type { Group, Meetup, Person } from "@prisma/client";

export const useMeetupsTableColumns = () => {
  const t = useTranslations();
  const deleteMeetupMutation = useMutation({
    mutationFn: (personId: string) => deleteMeetup(personId),
    onSuccess: () => {
      toast.success(t("deleteMeetupSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const columns: ColumnDef<
    Meetup & { speaker?: Person; group?: Group; _count: { attendance: number } }
  >[] = [
    {
      accessorKey: "subject",
      header: t("subject"),
    },
    {
      header: t("speaker"),
      cell: ({ row }) => {
        const speaker = row.original.speaker;
        if (!speaker) return t("notSpecified");
        return `${speaker.firstName} ${speaker.lastName}`;
      },
    },
    {
      header: t("date"),
      cell: ({ row }) => {
        const date = row.original.date;
        const formattedDate = date && format(date, "dd-MM-yyyy");

        return formattedDate;
      },
    },
    {
      header: t("group"),
      cell: ({ row }) => {
        const group = row.original.group;

        return group?.name ?? t("notSpecified");
      },
    },
    {
      header: t("attendance"),
      cell: ({ row }) => {
        const attendance = row.original._count.attendance;

        return attendance;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const meetup = row.original;

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
                <Link href={routes.dashboard.meetups.id(meetup.id).update.root}>
                  {t("update")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={routes.dashboard.meetups.id(meetup.id).attendance.root}
                >
                  {t("updateAttendance")}
                </Link>
              </DropdownMenuItem>
              <AlertModal
                title={t("deleteMeetup")}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {t("delete")}
                  </DropdownMenuItem>
                }
                onContinue={() => deleteMeetupMutation.mutate(meetup.id)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns;
};
