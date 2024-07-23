"use client";

import type { Group } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../server-actions/group";

export const getUseGroupsQueryKey = () => ["groups"];

type Props = {
  initialData?: Group[];
};

export const useGroups = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUseGroupsQueryKey(),
    queryFn: async () => await getGroups(),
    initialData,
  });

  return query;
};
