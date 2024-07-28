import { PosterTemplateCard } from "@/features/poster/components/poster-template-card";
import { UploadPosterTemplate } from "@/features/poster/components/upload-poster-template";
import { getPosterTemplates } from "@/features/poster/server-actions/poster";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { View } from "@/shared/components/layout/view";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const PostersPage = async () => {
  const t = await getTranslations();
  const posterTemplates = await getPosterTemplates();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("posters")}</Title>
      </Header>
      <View>
        <UploadPosterTemplate />
        <View className="md:grid md:grid-cols-4">
          {posterTemplates.map((template, i) => (
            <PosterTemplateCard
              key={`${template.utName}_${i}`}
              posterTemplate={template}
            />
          ))}
        </View>
      </View>
    </Main>
  );
};

export default PostersPage;
