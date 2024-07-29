import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { getTranslations } from "next-intl/server";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";

const DashboardPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("dashboard")} />
    </Main>
  );
};

export default DashboardPage;
