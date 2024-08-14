"use server";

import { RequireRole } from "@/features/auth/components/require-role";
import { AddTeamMemberForm } from "@/features/team/components/add-team-member-form";
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
import { UserRole } from "@prisma/client";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

const TeamLayout = async ({ children }: Props) => {
  const t = await getTranslations();

  return (
    <Main>
      <Header
        leading={<NavigationDrawer />}
        title={t("team")}
        trailing={
          <RequireRole roles={[UserRole.ADMIN]}>
            <Drawer>
              <DrawerTrigger asChild>
                <AddButton />
              </DrawerTrigger>
              <DrawerContent aria-describedby="">
                <DrawerTitle className="sr-only">
                  {t("addTeamMember")}
                </DrawerTitle>
                <AddTeamMemberForm />
              </DrawerContent>
            </Drawer>
          </RequireRole>
        }
      />
      {children}
    </Main>
  );
};

export default TeamLayout;
