import { CreateGroupForm } from "@/features/group/components/create-group-form";
import { GroupsTable } from "@/features/group/components/groups-table";
import { getGroups } from "@/features/group/server-actions/group";
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

const GroupsPage = async () => {
  const t = await getTranslations();
  const groupsServer = await getGroups();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("groups")}</Title>
        <div className="flex flex-grow justify-end">
          <Drawer>
            <DrawerTrigger asChild>
              <AddButton />
            </DrawerTrigger>
            <DrawerContent aria-describedby="">
              <DrawerTitle className="sr-only">{t("createGroup")}</DrawerTitle>
              <CreateGroupForm />
            </DrawerContent>
          </Drawer>
        </div>
      </Header>
      <GroupsTable groupsServer={groupsServer} />
    </Main>
  );
};

export default GroupsPage;
