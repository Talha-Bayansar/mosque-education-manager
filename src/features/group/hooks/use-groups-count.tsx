"use client";

import { useQuery } from "@tanstack/react-query";
import { getGroupsCount } from "../server-actions/group";

export const getUseGroupsCountQueryKey = () => ["groups-count"];

type Props = {
  initialData?: number;
};

export const useGroupsCount = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUseGroupsCountQueryKey(),
    queryFn: async () => await getGroupsCount(),
    initialData,
  });

  return query;
};
