import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { getTranslations } from "next-intl/server";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { View } from "@/shared/components/layout/view";

type Props = {
  children: React.ReactNode;
};

const DashboardLayout = async ({ children }: Props) => {
  const t = await getTranslations();

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("dashboard")} />
      <View className="md:grid md:grid-cols-2 w-full">{children}</View>
    </Main>
  );
};

export default DashboardLayout;
