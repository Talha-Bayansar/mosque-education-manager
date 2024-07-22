import type { Person } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getPeopleByGroupId } from "../server-actions/person";

export const getUsePeopleByGroupIdQueryKey = (
  groupId: string,
  onlyIds: boolean = false
) => ["people", groupId, onlyIds];

type Props = {
  groupId: string;
  onlyIds?: boolean;
  initialData?: Person[] | string[];
};

export const usePeopleByGroupId = ({
  groupId,
  onlyIds,
  initialData,
}: Props) => {
  const query = useQuery({
    queryKey: getUsePeopleByGroupIdQueryKey(groupId),
    queryFn: async () => await getPeopleByGroupId(groupId, onlyIds),
    initialData: initialData,
  });

  return query;
};
