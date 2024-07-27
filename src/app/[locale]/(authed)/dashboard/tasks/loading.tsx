import { IconButtonSkeleton } from "@/shared/components/icon-button";
import { KanbanSkeleton } from "@/shared/components/kanban";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const TasksLoading = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("tasks")}</Title>
        <div className="flex justify-end flex-grow">
          <IconButtonSkeleton />
        </div>
      </Header>
      <KanbanSkeleton />
    </Main>
  );
};

export default TasksLoading;
