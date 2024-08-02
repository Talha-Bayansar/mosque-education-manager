import { getMeetupById } from "@/features/meetup/server-actions/meetup";
import { CreatePoster } from "@/features/poster/components/create-poster";
import { PosterSelection } from "@/features/poster/components/poster-selection";
import { getPosterTemplates } from "@/features/poster/server-actions/poster";
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
  searchParams: {
    image?: string;
  };
  params: {
    meetupId: string;
  };
};

export const CreatePosterPage = async ({
  searchParams: { image },
  params: { meetupId },
}: Props) => {
  const t = await getTranslations();
  const meetup = await getMeetupById(meetupId);
  const posterTemplates = await getPosterTemplates();

  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.meetups.root,
      label: t("meetups"),
    },
    {
      label: t("createPoster"),
    },
  ];

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("createPoster")} />
      <NavigationHistory items={history} />
      {image ? (
        <CreatePoster meetup={meetup} />
      ) : (
        <PosterSelection posterTemplates={posterTemplates} />
      )}
    </Main>
  );
};

export default CreatePosterPage;
