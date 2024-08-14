"use server";

import { CreatePersonForm } from "@/features/person/components/create-person-form";
import { routes } from "@/lib/routes";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  NavigationHistory,
  NavigationHistoryItem,
} from "@/shared/components/navigation-history";
import { getTranslations } from "next-intl/server";

const CreatePersonPage = async () => {
  const t = await getTranslations();
  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.people.root,
      label: t("people"),
    },
    {
      label: t("createPerson"),
    },
  ];

  return (
    <Main>
      <Header leading={<NavigationDrawer />} title={t("createPerson")} />
      <NavigationHistory items={history} />
      <CreatePersonForm />
    </Main>
  );
};

export default CreatePersonPage;
