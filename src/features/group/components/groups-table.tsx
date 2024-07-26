"use client";

import type { Group } from "@prisma/client";
import { useGroups } from "../hooks/use-groups";
import { useGroupsTableColumns } from "../hooks/use-groups-table-columns";
import { AppTable } from "@/shared/components/app-table";
import { useGroupsCount } from "../hooks/use-groups-count";

type Props = {
  groupsServer: Group[];
  groupsCount: number;
};

export const GroupsTable = ({ groupsServer, groupsCount }: Props) => {
  const { data } = useGroups({ initialData: groupsServer });
  const { data: totalCount } = useGroupsCount({ initialData: groupsCount });
  const columns = useGroupsTableColumns();

  return <AppTable data={data!} columns={columns} totalCount={totalCount} />;
};
