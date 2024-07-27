import { routes } from "@/lib/routes";
import { AppTableSkeleton } from "@/shared/components/app-table";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  NavigationHistory,
  type NavigationHistoryItem,
} from "@/shared/components/navigation-history";
import { ButtonSkeleton } from "@/shared/components/ui/button";
import { getTranslations } from "next-intl/server";

const AttendanceLoading = async () => {
  const t = await getTranslations();

  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.meetups.root,
      label: t("meetups"),
    },
    {
      label: t("attendance"),
    },
  ];

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("attendance")}</Title>
        <div className="flex flex-grow justify-end">
          <ButtonSkeleton />
        </div>
      </Header>
      <NavigationHistory items={history} />
      <AppTableSkeleton />
    </Main>
  );
};

export default AttendanceLoading;
