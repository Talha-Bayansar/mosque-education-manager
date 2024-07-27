import { AppTableSkeleton } from "@/shared/components/app-table";
import { IconButtonSkeleton } from "@/shared/components/icon-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const PeopleSkeleton = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("people")}</Title>
        <div className="flex flex-grow items-center justify-end">
          <IconButtonSkeleton />
        </div>
      </Header>
      <AppTableSkeleton />
    </Main>
  );
};

export default PeopleSkeleton;
