"use client";

import { IconButton } from "@/shared/components/icon-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { UserRole, type User } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { AlertModal } from "@/shared/components/alert-modal";
import { deleteTeamMember } from "../server-actions/team";
import { RequireRole } from "@/features/auth/components/require-role";

export const useTeamTableColumns = () => {
  const t = useTranslations();
  const deleteTeamMemberMutation = useMutation({
    mutationFn: (userId: string) => deleteTeamMember(userId),
    onSuccess: () => {
      toast.success(t("deleteTeamMemberSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "email",
      header: t("email"),
    },
    {
      accessorKey: "role",
      header: t("role"),
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const user = row.original;

        return (
          <RequireRole roles={[UserRole.ADMIN]}>
            <DropdownMenu>
              <DropdownMenuTrigger
                disabled={user.role === UserRole.ADMIN}
                asChild
              >
                <IconButton>
                  <span className="sr-only">{t("openMenu")}</span>
                  <MoreHorizontal />
                </IconButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>{t("actions")}</DropdownMenuLabel>
                <AlertModal
                  title={t("deleteTeamMember")}
                  trigger={
                    <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                      {t("delete")}
                    </DropdownMenuItem>
                  }
                  onContinue={() => deleteTeamMemberMutation.mutate(user.id)}
                />
              </DropdownMenuContent>
            </DropdownMenu>
          </RequireRole>
        );
      },
    },
  ];

  return columns;
};
