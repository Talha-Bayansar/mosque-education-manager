"use server";

import { routes } from "@/lib/routes";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  NavigationHistory,
  type NavigationHistoryItem,
} from "@/shared/components/navigation-history";
import { getTranslations } from "next-intl/server";
import { SaveAttendanceButton } from "./_components/save-attendance-button";

type Props = {
  params: {
    meetupId: string;
  };
};

const MeetupAttendancePage = async ({ params: { meetupId } }: Props) => {
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
          <SaveAttendanceButton />
        </div>
      </Header>
      <NavigationHistory items={history} />
    </Main>
  );
};

export default MeetupAttendancePage;
