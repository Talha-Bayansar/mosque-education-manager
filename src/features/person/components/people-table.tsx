"use client";

import type { Person } from "@prisma/client";
import { usePeopleTableColumns } from "../hooks/use-people-table-columns";
import { AppTable } from "@/shared/components/app-table";

type Props = {
  people: Person[];
  peopleCount: number;
};

export const PeopleTable = ({ people, peopleCount }: Props) => {
  const columns = usePeopleTableColumns();

  return <AppTable columns={columns} data={people} totalCount={peopleCount} />;
};
