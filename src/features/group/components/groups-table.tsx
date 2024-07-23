"use client";

import type { Group } from "@prisma/client";
import { useGroups } from "../hooks/use-groups";
import { useGroupsTableColumns } from "../hooks/use-groups-table-columns";
import { AppTable } from "@/shared/components/app-table";

type Props = {
  groupsServer: Group[];
};

export const GroupsTable = ({ groupsServer }: Props) => {
  const { data } = useGroups({ initialData: groupsServer });
  const columns = useGroupsTableColumns();

  return <AppTable data={data!} columns={columns} />;
};
