import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { getTranslations } from "next-intl/server";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { UpcomingMeetups } from "@/features/meetup/components/upcoming-meetups";
import { View } from "@/shared/components/layout/view";

const DashboardPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("dashboard")} />
      <View className="md:grid md:grid-cols-2">
        <UpcomingMeetups />
      </View>
    </Main>
  );
};

export default DashboardPage;
