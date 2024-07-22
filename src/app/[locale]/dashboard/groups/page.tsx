import { GroupsTable } from "@/features/group/components/groups-table";
import { getGroups } from "@/features/group/server-actions/group";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const GroupsPage = async () => {
  const t = await getTranslations();
  const groupsServer = await getGroups();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("groups")}</Title>
      </Header>
      <GroupsTable groupsServer={groupsServer} />
    </Main>
  );
};

export default GroupsPage;
