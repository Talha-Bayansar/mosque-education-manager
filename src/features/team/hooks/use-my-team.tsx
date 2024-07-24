"use client";

import type { Team, User } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getMyTeam } from "../server-actions/team";

type Props = {
  initialData?: Team & {
    members: User[];
  };
};

export const getUseMyTeamQueryKey = () => ["my-team"];

export const useMyTeam = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUseMyTeamQueryKey(),
    queryFn: async () => await getMyTeam(),
    initialData,
  });

  return query;
};
