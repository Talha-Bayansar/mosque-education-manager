import { UpdateMeetupForm } from "@/features/meetup/components/update-meetup-form";
import { getMeetupById } from "@/features/meetup/server-actions/meetup";
import { routes } from "@/lib/routes";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  NavigationHistory,
  type NavigationHistoryItem,
} from "@/shared/components/navigation-history";
import type { Meetup, Person } from "@prisma/client";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    meetupId: string;
  };
};

const UpdateMeetupPage = async ({ params: { meetupId } }: Props) => {
  const t = await getTranslations();
  const meetup = await getMeetupById(meetupId);

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
      <Header>
        <NavigationDrawer />
        <Title>{t("updateMeetup")}</Title>
      </Header>
      <NavigationHistory items={history} />
      <UpdateMeetupForm
        meetup={
          meetup as Meetup & {
            speaker: Person;
          }
        }
      />
    </Main>
  );
};

export default UpdateMeetupPage;
