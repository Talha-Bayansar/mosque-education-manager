import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const TeamPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("team")}</Title>
      </Header>
    </Main>
  );
};

export default TeamPage;
