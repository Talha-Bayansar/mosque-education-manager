import { TasksBoard } from "@/features/task/components/tasks-board";
import { getTasks } from "@/features/task/server-actions/task";
import { CreateTaskForm } from "@/features/task/components/create-task-form";
import { AddButton } from "@/shared/components/add-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { getTranslations } from "next-intl/server";
import { getMyTeam } from "@/features/team/server-actions/team";

const TasksPage = async () => {
  const t = await getTranslations();
  const tasks = await getTasks();
  const team = await getMyTeam();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("tasks")}</Title>
        <div className="flex justify-end flex-grow">
          <Drawer>
            <DrawerTrigger asChild>
              <AddButton />
            </DrawerTrigger>
            <DrawerContent aria-describedby="">
              <DrawerTitle className="sr-only">{t("createTask")}</DrawerTitle>
              <CreateTaskForm users={team.members} />
            </DrawerContent>
          </Drawer>
        </div>
      </Header>
      <TasksBoard tasks={tasks} />
    </Main>
  );
};

export default TasksPage;
