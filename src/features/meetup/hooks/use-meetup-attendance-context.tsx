"use client";

import { createContext, useContext, useState } from "react";
import { useParams } from "next/navigation";
import type { Person } from "@prisma/client";
import { useAttendanceByMeetupId } from "@/features/person/hooks/use-attendance-by-meetup-id";

const MeetupAttendanceContext = createContext<
  | {
      selectedPersonIds: string[];
      personIdsToAdd: string[];
      personIdsToRemove: string[];
      handleCheck: (isChecked: boolean, personId: string) => void;
    }
  | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
  attendanceIdsServer: Person[] | string[];
};

export const MeetupAttendanceContextProvider = ({
  children,
  attendanceIdsServer,
}: Props) => {
  const { meetupId } = useParams<{ meetupId: string }>();

  const { data } = useAttendanceByMeetupId({
    meetupId,
    onlyIds: true,
    initialData: attendanceIdsServer,
  });
  const [selectedPersonIds, setSelectedPersonIds] = useState<string[]>(
    data as string[]
  );
  const [personIdsToAdd, setPersonIdsToAdd] = useState<string[]>([]);
  const [personIdsToRemove, setPersonIdsToRemove] = useState<string[]>([]);

  const handleCheck = (isChecked: boolean, memberId: string) => {
    if (isChecked) {
      setSelectedPersonIds((prev) => [...prev, memberId]);
      if (!!data!.find((id) => id === memberId)) {
        setPersonIdsToRemove((prev) => prev.filter((id) => id !== memberId));
      } else {
        setPersonIdsToAdd((prev) => [...prev, memberId]);
      }
    } else {
      setSelectedPersonIds((prev) => prev.filter((e) => e !== memberId));
      if (!!data!.find((id) => id === memberId)) {
        setPersonIdsToRemove((prev) => [...prev, memberId]);
      } else {
        setPersonIdsToAdd((prev) => prev.filter((id) => id !== memberId));
      }
    }
  };

  const values = {
    selectedPersonIds: selectedPersonIds,
    personIdsToAdd: personIdsToAdd,
    personIdsToRemove: personIdsToRemove,
    handleCheck,
  };

  return (
    <MeetupAttendanceContext.Provider value={values}>
      {children}
    </MeetupAttendanceContext.Provider>
  );
};

export const useMeetupAttendanceContext = () =>
  useContext(MeetupAttendanceContext);
