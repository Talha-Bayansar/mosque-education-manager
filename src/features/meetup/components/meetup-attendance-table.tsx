"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Person } from "@prisma/client";
import { useMeetupAttendanceTableColumns } from "../hooks/use-meetup-attendance-table-columns";

type Props = {
  groupId: string;
  peopleByGroup: Person[];
};

export const MeetupAttendanceTable = ({ peopleByGroup }: Props) => {
  const columns = useMeetupAttendanceTableColumns();

  return <AppTable data={peopleByGroup} columns={columns} />;
};
