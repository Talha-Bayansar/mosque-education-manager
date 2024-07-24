import { TeamTable } from "@/features/team/components/team-table";
import { getMyTeam } from "@/features/team/server-actions/team";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const TeamPage = async () => {
  const t = await getTranslations();
  const team = await getMyTeam();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("team")}</Title>
      </Header>
      <TeamTable teamServer={team} />
    </Main>
  );
};

export default TeamPage;
