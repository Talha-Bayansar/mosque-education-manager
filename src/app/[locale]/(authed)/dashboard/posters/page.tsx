import { UploadPosterTemplate } from "@/features/poster/components/upload-poster-template";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const PostersPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("posters")}</Title>
      </Header>
      <UploadPosterTemplate />
    </Main>
  );
};

export default PostersPage;
