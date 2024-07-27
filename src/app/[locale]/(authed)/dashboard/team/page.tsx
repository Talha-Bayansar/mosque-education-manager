"use server";

import { TeamTable } from "@/features/team/components/team-table";
import { getMyTeam } from "@/features/team/server-actions/team";

type Props = {
  searchParams: {
    page?: string;
  };
};

const TeamPage = async ({ searchParams: { page } }: Props) => {
  const pageNumber = Number(page ?? 1);
  const team = await getMyTeam(10, (pageNumber - 1) * 10);

  return <TeamTable team={team} />;
};

export default TeamPage;
