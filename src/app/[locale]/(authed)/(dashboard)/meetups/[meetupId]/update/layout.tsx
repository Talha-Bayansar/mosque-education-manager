import { routes } from "@/lib/routes";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  NavigationHistory,
  type NavigationHistoryItem,
} from "@/shared/components/navigation-history";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

const UpdateMeetupLayout = async ({ children }: Props) => {
  const t = await getTranslations();

  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.meetups.root,
      label: t("meetups"),
    },
    {
      label: t("updateMeetup"),
    },
  ];

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("updateMeetup")} />
      <NavigationHistory items={history} />
      {children}
    </Main>
  );
};

export default UpdateMeetupLayout;
