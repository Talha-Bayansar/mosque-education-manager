"use client";

import { usePeopleByGroupId } from "@/features/person/hooks/use-people-by-group-id";
import { AppTable } from "@/shared/components/app-table";
import type { Meetup, Person } from "@prisma/client";
import { useMeetupAttendanceTableColumns } from "../hooks/use-meetup-attendance-table-columns";
import { useMeetupById } from "../hooks/use-meetup-by-id";

type Props = {
  groupId: string;
  peopleByGroupServer: Person[];
  meetupServer: Meetup;
};

export const MeetupAttendanceTable = ({
  peopleByGroupServer,
  groupId,
  meetupServer,
}: Props) => {
  const { data } = usePeopleByGroupId({
    groupId: groupId!,
    initialData: peopleByGroupServer,
  });
  useMeetupById({
    id: meetupServer.id,
    initialData: meetupServer,
  });

  const columns = useMeetupAttendanceTableColumns();

  return <AppTable data={data!} columns={columns} />;
};
