"use client";

import type { Person } from "@prisma/client";
import { usePeople } from "../hooks/use-people";
import { usePeopleTableColumns } from "../hooks/use-people-table-columns";
import { AppTable } from "@/shared/components/app-table";
import { useSearchParams } from "next/navigation";
import { usePeopleCount } from "../hooks/use-people-count";

type Props = {
  peopleServer: Person[];
  peopleCount: number;
};

export const PeopleTable = ({ peopleServer, peopleCount }: Props) => {
  const columns = usePeopleTableColumns();
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = Number(page ?? 1);

  const { data: totalCount } = usePeopleCount({ initialData: peopleCount });
  const { data } = usePeople({ initialData: peopleServer, page: pageNumber });

  return <AppTable columns={columns} data={data!} totalCount={totalCount} />;
};
