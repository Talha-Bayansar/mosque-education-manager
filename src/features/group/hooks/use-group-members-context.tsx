"use client";

import { createContext, useContext, useState } from "react";

const GroupMembersContext = createContext<
  | {
      selectedMemberIds: string[];
      memberIdsToAdd: string[];
      memberIdsToRemove: string[];
      handleCheck: (isChecked: boolean, memberId: string) => void;
    }
  | undefined
>(undefined);

type Props = {
  children: React.ReactNode;
  peopleByGroupIds: string[];
};

export const GroupMembersContextProvider = ({
  children,
  peopleByGroupIds,
}: Props) => {
  const [selectedMemberIds, setSelectedMemberIds] =
    useState<string[]>(peopleByGroupIds);
  const [memberIdsToAdd, setMemberIdsToAdd] = useState<string[]>([]);
  const [memberIdsToRemove, setMemberIdsToRemove] = useState<string[]>([]);

  const handleCheck = (isChecked: boolean, memberId: string) => {
    if (isChecked) {
      setSelectedMemberIds((prev) => [...prev, memberId]);
      if (!!peopleByGroupIds.find((id) => id === memberId)) {
        setMemberIdsToRemove((prev) => prev.filter((id) => id !== memberId));
      } else {
        setMemberIdsToAdd((prev) => [...prev, memberId]);
      }
    } else {
      setSelectedMemberIds((prev) => prev.filter((e) => e !== memberId));
      if (!!peopleByGroupIds.find((id) => id === memberId)) {
        setMemberIdsToRemove((prev) => [...prev, memberId]);
      } else {
        setMemberIdsToAdd((prev) => prev.filter((id) => id !== memberId));
      }
    }
  };

  const values = {
    selectedMemberIds,
    memberIdsToAdd,
    memberIdsToRemove,
    handleCheck,
  };

  return (
    <GroupMembersContext.Provider value={values}>
      {children}
    </GroupMembersContext.Provider>
  );
};

export const useGroupMembersContext = () => useContext(GroupMembersContext);
