"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Person } from "@prisma/client";
import { useGroupMembersTableColumns } from "../hooks/use-group-members-table-columns";
import { usePeople } from "@/features/person/hooks/use-people";
import { useSearchParams } from "next/navigation";
import { usePeopleCount } from "@/features/person/hooks/use-people-count";

type Props = {
  peopleServer: Person[];
};

export const UpdateGroupMembersTable = ({ peopleServer }: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = Number(page ?? 1);
  const { data } = usePeople({ initialData: peopleServer, page: pageNumber });
  const { data: totalCount } = usePeopleCount({});
  const columns = useGroupMembersTableColumns();

  return <AppTable data={data!} columns={columns} totalCount={totalCount} />;
};
