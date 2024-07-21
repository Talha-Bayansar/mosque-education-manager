"use client";

import type { Person } from "@prisma/client";
import { usePeople } from "../hooks/use-people";
import { usePeopleTableColumns } from "../hooks/use-people-table-columns";
import { AppTable } from "@/shared/components/app-table";

type Props = {
  peopleServer: Person[];
};

export const PeopleTable = ({ peopleServer }: Props) => {
  const columns = usePeopleTableColumns();

  const { data } = usePeople(peopleServer);

  return <AppTable columns={columns} data={data!} />;
};
