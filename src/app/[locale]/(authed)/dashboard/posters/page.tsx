import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const PostersPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("posters")} />
    </Main>
  );
};

export default PostersPage;
