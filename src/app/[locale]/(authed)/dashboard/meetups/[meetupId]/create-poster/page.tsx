import { PosterSelection } from "@/features/poster/components/poster-selection";
import { getPosterTemplates } from "@/features/poster/server-actions/poster";
import { routes } from "@/lib/routes";
import { cn } from "@/lib/utils";
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
};

export const CreatePosterPage = async ({ searchParams: { image } }: Props) => {
  const t = await getTranslations();
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
    <Main className={cn({ "max-h-screen w-full": !!image })}>
      <Header leading={<NavigationDrawer />} title={t("createPoster")} />
      <NavigationHistory items={history} />
      <PosterSelection posterTemplates={posterTemplates} />
    </Main>
  );
};

export default CreatePosterPage;
