import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

const PosterTemplatesLayout = async ({ children }: Props) => {
  const t = await getTranslations();

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("posterTemplates")} />
      {children}
    </Main>
  );
};

export default PosterTemplatesLayout;
