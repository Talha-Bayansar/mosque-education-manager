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

type Props = {
  children: React.ReactNode;
};

const PosterTemplatesLayout = async ({ children }: Props) => {
  const t = await getTranslations();

  const history: NavigationHistoryItem[] = [
    {
      label: t("posters"),
      href: routes.dashboard.posters.root,
    },
    {
      label: t("posterTemplates"),
    },
  ];

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("posterTemplates")}</Title>
      </Header>
      <NavigationHistory items={history} />
      {children}
    </Main>
  );
};

export default PosterTemplatesLayout;
