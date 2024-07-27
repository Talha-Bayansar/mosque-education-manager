import { useIsDesktop } from "@/shared/hooks/use-is-desktop";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";
import { deleteGroup } from "../server-actions/group";
import type { Group } from "@prisma/client";
import { type ColumnDef } from "@tanstack/react-table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/shared/components/ui/dropdown-menu";
import { routes } from "@/lib/routes";
import { AlertModal } from "@/shared/components/alert-modal";
import { IconButton } from "@/shared/components/icon-button";
import { MoreHorizontal } from "lucide-react";
import { Link } from "@/navigation";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { UpdateGroupForm } from "../components/update-group-form";

export const useGroupsTableColumns = () => {
  const t = useTranslations();
  const isDesktop = useIsDesktop();
  const deleteGroupMutation = useMutation({
    mutationFn: (groupId: string) => deleteGroup(groupId),
    onSuccess: () => {
      toast.success(t("deleteGroupSuccess"));
    },
    onError: () => {
      toast.error(t("somethingWentWrong"));
    },
  });
  const columns: ColumnDef<Group & { _count: { members: number } }>[] = [
    {
      accessorKey: "name",
      header: t("name"),
    },
    {
      accessorKey: "members",
      header: t("members"),
      cell: ({ row }) => {
        const group = row.original;

        return group._count.members;
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const group = row.original;

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
              <Drawer>
                <DrawerTrigger asChild>
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {t("update")}
                  </DropdownMenuItem>
                </DrawerTrigger>
                <DrawerContent aria-describedby="">
                  <DrawerTitle className="sr-only">
                    {t("updateGroup")}
                  </DrawerTitle>
                  <UpdateGroupForm group={group} />
                </DrawerContent>
              </Drawer>
              <DropdownMenuItem>
                <Link
                  href={routes.dashboard.groups.id(group.id).updateMembers.root}
                >
                  {t("updateMembers")}
                </Link>
              </DropdownMenuItem>
              <AlertModal
                title={t("deleteGroup")}
                trigger={
                  <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                    {t("delete")}
                  </DropdownMenuItem>
                }
                onContinue={() => deleteGroupMutation.mutate(group.id)}
              />
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];

  return columns.filter((column) =>
    isDesktop ? column : !column.enableHiding
  );
};
