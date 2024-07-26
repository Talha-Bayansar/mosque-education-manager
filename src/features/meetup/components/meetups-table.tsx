"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Meetup } from "@prisma/client";
import { useMeetupsTableColumns } from "../hooks/use-meetups-table-columns";

type Props = {
  meetups: Meetup[];
  meetupsCount: number;
};

export const MeetupsTable = ({ meetups, meetupsCount }: Props) => {
  const columns = useMeetupsTableColumns();

  return (
    <AppTable data={meetups} columns={columns} totalCount={meetupsCount} />
  );
};
