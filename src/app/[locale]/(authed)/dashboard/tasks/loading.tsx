import { IconButtonSkeleton } from "@/shared/components/icon-button";
import { KanbanSkeleton } from "@/shared/components/kanban";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

const TasksLoading = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header
        leading={<NavigationDrawer />}
        title={t("tasks")}
        trailing={<IconButtonSkeleton />}
      />
      <KanbanSkeleton />
    </Main>
  );
};

export default TasksLoading;
