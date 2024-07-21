import { PeopleView } from "@/features/person/components/people-view";
import { getPeople } from "@/features/person/server-actions/person";
import { IconButton } from "@/shared/components/icon-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

const PeoplePage = async () => {
  const t = await getTranslations();
  const people = await getPeople();

  return (
    <Main>
      <Header>
        <NavigationDrawer />
        <Title>{t("people")}</Title>
        <div className="flex flex-grow items-center justify-end">
          <IconButton>
            <Plus />
          </IconButton>
        </div>
      </Header>
      <PeopleView peopleServer={people} />
    </Main>
  );
};

export default PeoplePage;
