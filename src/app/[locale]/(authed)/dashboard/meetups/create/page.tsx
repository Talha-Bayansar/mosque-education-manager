import { getGroups } from "@/features/group/server-actions/group";
import { CreateMeetupForm } from "@/features/meetup/components/create-meetup-form";
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

const CreateMeetupPage = async () => {
  const t = await getTranslations();
  const groups = await getGroups();

  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.meetups.root,
      label: t("meetups"),
    },
    {
      label: t("createMeetup"),
    },
  ];

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("createMeetup")}</Title>
      </Header>
      <NavigationHistory items={history} />
      <CreateMeetupForm groups={groups} />
    </Main>
  );
};

export default CreateMeetupPage;
