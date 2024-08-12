import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { getTranslations } from "next-intl/server";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { UpcomingMeetups } from "@/features/meetup/components/upcoming-meetups";
import { View } from "@/shared/components/layout/view";
import { UpcomingTasks } from "@/features/task/components/upcoming-tasks";

const DashboardPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("dashboard")} />
      <View className="md:grid md:grid-cols-2">
        <UpcomingMeetups />
        <UpcomingTasks />
      </View>
    </Main>
  );
};

export default DashboardPage;
