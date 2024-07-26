"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Meetup } from "@prisma/client";
import { useMeetups } from "../hooks/use-meetups";
import { useMeetupsTableColumns } from "../hooks/use-meetups-table-columns";
import { useMeetupsCount } from "../hooks/use-meetups-count";
import { useSearchParams } from "next/navigation";

type Props = {
  meetupsServer: Meetup[];
  meetupsCount: number;
};

export const MeetupsTable = ({ meetupsServer, meetupsCount }: Props) => {
  const searchParams = useSearchParams();
  const page = searchParams.get("page");
  const pageNumber = Number(page ?? 1);
  const { data } = useMeetups({
    initialData: meetupsServer,
    page: pageNumber,
  });
  const { data: totalCount } = useMeetupsCount({
    initialData: meetupsCount,
  });

  const columns = useMeetupsTableColumns();

  return <AppTable data={data!} columns={columns} totalCount={totalCount} />;
};
