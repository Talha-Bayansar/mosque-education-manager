"use client";

import { createContext, useContext, useState } from "react";
import { usePeopleByGroupId } from "@/features/person/hooks/use-people-by-group-id";
import { useParams } from "next/navigation";
import type { Person } from "@prisma/client";

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
  peopleByGroupServer: Person[] | string[];
};

export const GroupMembersContextProvider = ({
  children,
  peopleByGroupServer,
}: Props) => {
  const { groupId } = useParams<{ groupId: string }>();
  const { data } = usePeopleByGroupId({
    groupId,
    onlyIds: true,
    initialData: peopleByGroupServer,
  });
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    data as string[]
  );
  const [memberIdsToAdd, setMemberIdsToAdd] = useState<string[]>([]);
  const [memberIdsToRemove, setMemberIdsToRemove] = useState<string[]>([]);

  const handleCheck = (isChecked: boolean, memberId: string) => {
    if (isChecked) {
      setSelectedMemberIds((prev) => [...prev, memberId]);
      if (!!data!.find((id) => id === memberId)) {
        setMemberIdsToRemove((prev) => prev.filter((id) => id !== memberId));
      } else {
        setMemberIdsToAdd((prev) => [...prev, memberId]);
      }
    } else {
      setSelectedMemberIds((prev) => prev.filter((e) => e !== memberId));
      if (!!data!.find((id) => id === memberId)) {
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
