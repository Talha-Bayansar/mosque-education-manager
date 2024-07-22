"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Person } from "@prisma/client";
import { useGroupMembersTableColumns } from "../hooks/use-group-members-table-columns";
import { usePeople } from "@/features/person/hooks/use-people";

type Props = {
  peopleServer: Person[];
};

export const UpdateGroupMembersTable = ({ peopleServer }: Props) => {
  const { data } = usePeople({ initialData: peopleServer });
  const columns = useGroupMembersTableColumns();

  return <AppTable data={data!} columns={columns} />;
};
