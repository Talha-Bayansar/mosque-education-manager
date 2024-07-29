import { routes } from "@/lib/routes";
import { AppTableSkeleton } from "@/shared/components/app-table";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
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
      <Header
        leading={<NavigationDrawer />}
        title={t("attendance")}
        trailing={<ButtonSkeleton />}
      />
      <NavigationHistory items={history} />
      <AppTableSkeleton />
    </Main>
  );
};

export default AttendanceLoading;
