import { CreateGroupForm } from "@/features/group/components/create-group-form";
import { GroupsTable } from "@/features/group/components/groups-table";
import {
  getGroups,
  getGroupsCount,
} from "@/features/group/server-actions/group";
import { AddButton } from "@/shared/components/add-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  Drawer,
  DrawerContent,
  DrawerTitle,
  DrawerTrigger,
} from "@/shared/components/ui/drawer";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: {
    page?: string;
  };
};

const GroupsPage = async ({ searchParams: { page } }: Props) => {
  const pageNumber = Number(page ?? 1);
  const t = await getTranslations();
  const groups = await getGroups(10, (pageNumber - 1) * 10);
  const groupsCount = await getGroupsCount();

  return (
    <Main>
      <Header
        title={t("groups")}
        leading={<NavigationDrawer />}
        trailing={
          <Drawer>
            <DrawerTrigger asChild>
              <AddButton />
            </DrawerTrigger>
            <DrawerContent aria-describedby="">
              <DrawerTitle className="sr-only">{t("createGroup")}</DrawerTitle>
              <CreateGroupForm />
            </DrawerContent>
          </Drawer>
        }
      ></Header>
      <GroupsTable groups={groups} groupsCount={groupsCount} />
    </Main>
  );
};

export default GroupsPage;
