"use server";

import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { AddButton } from "@/shared/components/add-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

type Props = {
  children: React.ReactNode;
};

const MeetupsLayout = async ({ children }: Props) => {
  const t = await getTranslations();

  return (
    <Main>
      <Header
        leading={<NavigationDrawer />}
        title={t("meetups")}
        trailing={
          <Link href={routes.dashboard.meetups.create.root}>
            <AddButton />
          </Link>
        }
      />
      {children}
    </Main>
  );
};

export default MeetupsLayout;
