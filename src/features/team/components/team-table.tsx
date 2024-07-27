"use client";

import { AppTable } from "@/shared/components/app-table";
import type { Team, User } from "@prisma/client";
import { useTeamTableColumns } from "../hooks/use-team-table-columns";

type Props = {
  team: Team & {
    members: User[];
    _count: {
      members: number;
    };
  };
};

export const TeamTable = ({ team }: Props) => {
  const columns = useTeamTableColumns();

  return (
    <AppTable
      data={team.members}
      columns={columns}
      totalCount={team._count.members}
    />
  );
};
