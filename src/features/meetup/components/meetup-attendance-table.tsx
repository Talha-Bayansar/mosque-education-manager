"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Meetup, Person } from "@prisma/client";
import { useMeetupAttendanceTableColumns } from "../hooks/use-meetup-attendance-table-columns";
import { useMeetupById } from "../hooks/use-meetup-by-id";

type Props = {
  groupId: string;
  peopleByGroup: Person[];
  meetupServer: Meetup;
};

export const MeetupAttendanceTable = ({
  peopleByGroup,
  meetupServer,
}: Props) => {
  useMeetupById({
    id: meetupServer.id,
    initialData: meetupServer,
  });

  const columns = useMeetupAttendanceTableColumns();

  return <AppTable data={peopleByGroup} columns={columns} />;
};
