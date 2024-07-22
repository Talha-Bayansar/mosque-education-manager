"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Meetup } from "@prisma/client";
import { useMeetups } from "../hooks/use-meetups";
import { useMeetupsTableColumns } from "./use-meetups-table-columns";

type Props = {
  meetupsServer: Meetup[];
};

export const MeetupsTable = ({ meetupsServer }: Props) => {
  const { data } = useMeetups({
    initialData: meetupsServer,
  });

  const columns = useMeetupsTableColumns();

  return <AppTable data={data!} columns={columns} />;
};
