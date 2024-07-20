import { signout } from "@/features/auth/server-actions/auth";
import { Button } from "@/shared/components/ui/button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { getTranslations } from "next-intl/server";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";

const DashboardPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("dashboard")}</Title>
      </Header>
      <form action={signout}>
        <Button type="submit" variant={"destructive"}>
          {t("signOut")}
        </Button>
      </form>
    </Main>
  );
};

export default DashboardPage;
