"use server";

import { RequireRole } from "@/features/auth/components/require-role";
import { TeamTable } from "@/features/team/components/team-table";
import { getMyTeam } from "@/features/team/server-actions/team";
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
import { UserRole } from "@prisma/client";
import { getTranslations } from "next-intl/server";

const TeamPage = async () => {
  const t = await getTranslations();
  const team = await getMyTeam();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("team")}</Title>
        <RequireRole roles={[UserRole.ADMIN]}>
          <div className="flex flex-grow justify-end">
            <Drawer>
              <DrawerTrigger asChild>
                <AddButton />
              </DrawerTrigger>
              <DrawerContent aria-describedby="">
                <DrawerTitle className="sr-only">{t("add")}</DrawerTitle>
              </DrawerContent>
            </Drawer>
          </div>
        </RequireRole>
      </Header>
      <TeamTable teamServer={team} />
    </Main>
  );
};

export default TeamPage;
