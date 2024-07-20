import { signout } from "@/features/auth/server-actions/auth";
import { Button } from "@/shared/components/ui/button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { PageContainer } from "@/shared/components/layout/page-container";
import { Title } from "@/shared/components/layout/title";
import { getTranslations } from "next-intl/server";

const DashboardPage = async () => {
  const t = await getTranslations();

  return (
    <PageContainer>
      <Main>
        <Header>
          <Title>{t("dashboard")}</Title>
        </Header>
        <form action={signout}>
          <Button type="submit" variant={"destructive"}>
            {t("signOut")}
          </Button>
        </form>
      </Main>
    </PageContainer>
  );
};

export default DashboardPage;
