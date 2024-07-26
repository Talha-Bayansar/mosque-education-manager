"use client";

import type { Group } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getGroups } from "../server-actions/group";

export const getUseGroupsQueryKey = (page?: number) => [
  "groups",
  `page=${page}`,
];

type Props = {
  initialData?: Group[];
  page?: number;
};

export const useGroups = ({ initialData, page }: Props) => {
  const query = useQuery({
    queryKey: getUseGroupsQueryKey(page),
    queryFn: async () => {
      let response;
      if (page) {
        response = await getGroups(10, (page - 1) * 10);
      } else {
        response = await getGroups();
      }
      return response;
    },
    initialData,
  });

  return query;
};
