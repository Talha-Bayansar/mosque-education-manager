import { CreateGroupForm } from "@/features/group/components/create-group-form";
import { AddButton } from "@/shared/components/add-button";
import { AppTableSkeleton } from "@/shared/components/app-table";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  DrawerTrigger,
  DrawerContent,
  DrawerTitle,
  Drawer,
} from "@/shared/components/ui/drawer";
import { getTranslations } from "next-intl/server";

const GroupsLoading = async () => {
  const t = await getTranslations();
  return (
    <Main>
      <Header
        leading={<NavigationDrawer />}
        title={t("groups")}
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
      />
      <AppTableSkeleton />
    </Main>
  );
};

export default GroupsLoading;
