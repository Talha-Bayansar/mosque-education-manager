"use server";

import { MeetupsTable } from "@/features/meetup/components/meetups-table";
import { getMeetups } from "@/features/meetup/server-actions/meetup";
import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { AddButton } from "@/shared/components/add-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const MeetupsPage = async () => {
  const t = await getTranslations();
  const meetups = await getMeetups();

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
      <MeetupsTable meetupsServer={meetups} />
    </Main>
  );
};

export default MeetupsPage;
