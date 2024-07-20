import { signout } from "@/features/auth/server-actions/auth";
import { Button } from "@/shared/components/ui/button";
import { Header } from "@/shared/components/ui/header";
import { Main } from "@/shared/components/ui/main";
import { PageContainer } from "@/shared/components/ui/page-container";
import { Title } from "@/shared/components/ui/title";
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
