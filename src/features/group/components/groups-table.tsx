"use client";

import type { Group } from "@prisma/client";
import { useGroupsTableColumns } from "../hooks/use-groups-table-columns";
import { AppTable } from "@/shared/components/app-table";

type Props = {
  groups: Group[];
  groupsCount: number;
};

export const GroupsTable = ({ groups, groupsCount }: Props) => {
  const columns = useGroupsTableColumns();

  return <AppTable data={groups} columns={columns} totalCount={groupsCount} />;
};
