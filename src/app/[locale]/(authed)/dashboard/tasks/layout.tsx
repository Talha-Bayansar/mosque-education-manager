import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

const TasksLayout = async ({ children }: Props) => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("tasks")}</Title>
      </Header>
      {children}
    </Main>
  );
};

export default TasksLayout;
