"use client";

import type { Team, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getMyTeam } from "../server-actions/team";

type Props = {
  initialData?: Team & {
    members: User[];
    _count: {
      members: number;
    };
  };
  page?: number;
};

export const getUseMyTeamQueryKey = (page?: number) => [
  "my-team",
  `page=${page}`,
];

export const useMyTeam = ({ initialData, page }: Props) => {
  const query = useQuery({
    queryKey: getUseMyTeamQueryKey(),
    queryFn: async () => await getMyTeam(page && 10, page && (page - 1) * 10),
    initialData,
  });

  return query;
};
