import { AppTableSkeleton } from "@/shared/components/app-table";
import { IconButtonSkeleton } from "@/shared/components/icon-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const PeopleSkeleton = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header
        leading={<NavigationDrawer />}
        title={t("people")}
        trailing={<IconButtonSkeleton />}
      />
      <AppTableSkeleton />
    </Main>
  );
};

export default PeopleSkeleton;
