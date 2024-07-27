import { routes } from "@/lib/routes";
import { AppTableSkeleton } from "@/shared/components/app-table";
import { Header } from "@/shared/components/layout/header";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  type NavigationHistoryItem,
  NavigationHistory,
} from "@/shared/components/navigation-history";
import { getTranslations } from "next-intl/server";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { ButtonSkeleton } from "@/shared/components/ui/button";

const UpdateMembersLoading = async () => {
  const t = await getTranslations();

  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.groups.root,
      label: t("groups"),
    },
    {
      label: t("updateGroup"),
    },
  ];

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("updateMembers")}</Title>
        <div className="flex flex-grow justify-end">
          <ButtonSkeleton />
        </div>
      </Header>
      <NavigationHistory items={history} />
      <AppTableSkeleton />
    </Main>
  );
};

export default UpdateMembersLoading;
