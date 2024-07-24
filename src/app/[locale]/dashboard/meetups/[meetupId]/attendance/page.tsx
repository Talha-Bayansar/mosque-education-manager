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
import { MeetupAttendanceTable } from "@/features/meetup/components/meetup-attendance-table";
import { getMeetupById } from "@/features/meetup/server-actions/meetup";
import {
  getAttendanceByMeetupId,
  getPeopleByGroupId,
} from "@/features/person/server-actions/person";
import type { Person } from "@prisma/client";
import { notFound } from "next/navigation";
import { MeetupAttendanceContextProvider } from "@/features/meetup/hooks/use-meetup-attendance-context";

type Props = {
  params: {
    meetupId: string;
  };
};

const MeetupAttendancePage = async ({ params: { meetupId } }: Props) => {
  const t = await getTranslations();
  const meetup = await getMeetupById(meetupId);

  if (!meetup.groupId) notFound();

  let people: Person[] = [];
  if (meetup.groupId) {
    people = (await getPeopleByGroupId(meetup.groupId)) as Person[];
  }
  const attendanceIds = (await getAttendanceByMeetupId(
    meetupId,
    true
  )) as string[];

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
    <MeetupAttendanceContextProvider attendanceIdsServer={attendanceIds}>
      <Main>
        <Header>
          <NavigationDrawer />
          <Title>{t("attendance")}</Title>
          <div className="flex flex-grow justify-end">
            <SaveAttendanceButton />
          </div>
        </Header>
        <NavigationHistory items={history} />
        <MeetupAttendanceTable
          peopleByGroupServer={people}
          groupId={meetup.groupId}
          meetupServer={meetup}
        />
      </Main>
    </MeetupAttendanceContextProvider>
  );
};

export default MeetupAttendancePage;
