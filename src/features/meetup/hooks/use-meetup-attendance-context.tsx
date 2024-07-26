"use client";

import { createContext, useContext, useState } from "react";

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
  attendanceIds: string[];
};

export const MeetupAttendanceContextProvider = ({
  children,
  attendanceIds,
}: Props) => {
  const [selectedPersonIds, setSelectedPersonIds] =
    useState<string[]>(attendanceIds);
  const [personIdsToAdd, setPersonIdsToAdd] = useState<string[]>([]);
  const [personIdsToRemove, setPersonIdsToRemove] = useState<string[]>([]);

  const handleCheck = (isChecked: boolean, memberId: string) => {
    if (isChecked) {
      setSelectedPersonIds((prev) => [...prev, memberId]);
      if (!!attendanceIds!.find((id) => id === memberId)) {
        setPersonIdsToRemove((prev) => prev.filter((id) => id !== memberId));
      } else {
        setPersonIdsToAdd((prev) => [...prev, memberId]);
      }
    } else {
      setSelectedPersonIds((prev) => prev.filter((e) => e !== memberId));
      if (!!attendanceIds!.find((id) => id === memberId)) {
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
