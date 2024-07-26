"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Team, User } from "@prisma/client";
import { useMyTeam } from "../hooks/use-my-team";
import { useTeamTableColumns } from "../hooks/use-team-table-columns";

type Props = {
  teamServer: Team & {
    members: User[];
    _count: {
      members: number;
    };
  };
};

export const TeamTable = ({ teamServer }: Props) => {
  const { data } = useMyTeam({
    initialData: teamServer,
  });

  const columns = useTeamTableColumns();

  return (
    <AppTable
      data={data!.members}
      columns={columns}
      totalCount={data!._count.members}
    />
  );
};
