import { SignoutButton } from "@/features/auth/components/signout-button";
import { SettingCard } from "@/features/settings/components/setting-card";
import { LanguageSelect } from "@/shared/components/language-select";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { View } from "@/shared/components/layout/view";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const SettingsPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("settings")}</Title>
      </Header>
      <View className="justify-between flex-grow">
        <View>
          <SettingCard
            title={t("selectLanguage")}
            description={t("selectLanguageDescription")}
            action={<LanguageSelect />}
          />
        </View>
        <SignoutButton />
      </View>
    </Main>
  );
};

export default SettingsPage;
