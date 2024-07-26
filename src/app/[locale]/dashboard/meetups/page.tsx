"use server";

import { MeetupsTable } from "@/features/meetup/components/meetups-table";
import {
  getMeetups,
  getMeetupsCount,
} from "@/features/meetup/server-actions/meetup";
import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { AddButton } from "@/shared/components/add-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: {
    page?: string;
  };
};

const MeetupsPage = async ({ searchParams: { page } }: Props) => {
  const pageNumber = Number(page ?? 1);
  const t = await getTranslations();
  const meetups = await getMeetups(10, (pageNumber - 1) * 10);
  const meetupsCount = await getMeetupsCount();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("meetups")}</Title>
        <div className="flex flex-grow justify-end">
          <Link href={routes.dashboard.meetups.create.root}>
            <AddButton />
          </Link>
        </div>
      </Header>
      <MeetupsTable meetupsServer={meetups} meetupsCount={meetupsCount} />
    </Main>
  );
};

export default MeetupsPage;
