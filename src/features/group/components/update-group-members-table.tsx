"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Person } from "@prisma/client";
import { useGroupMembersTableColumns } from "../hooks/use-group-members-table-columns";

type Props = {
  people: Person[];
  peopleCount: number;
};

export const UpdateGroupMembersTable = ({ people, peopleCount }: Props) => {
  const columns = useGroupMembersTableColumns();

  return <AppTable data={people} columns={columns} totalCount={peopleCount} />;
};
