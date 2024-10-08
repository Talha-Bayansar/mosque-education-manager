import { PeopleTable } from "@/features/person/components/people-table";
import {
  getPeople,
  getPeopleCount,
} from "@/features/person/server-actions/person";
import { routes } from "@/lib/routes";
import { Link } from "@/navigation";
import { AddButton } from "@/shared/components/add-button";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import { getTranslations } from "next-intl/server";

type Props = {
  searchParams: {
    page?: string;
  };
};

const PeoplePage = async ({ searchParams: { page } }: Props) => {
  const pageNumber = Number(page ?? 1);
  const t = await getTranslations();
  const people = await getPeople(10, (pageNumber - 1) * 10);
  const peopleCount = await getPeopleCount();

  return (
    <Main>
      <Header
        leading={<NavigationDrawer />}
        title={t("people")}
        trailing={
          <Link href={routes.dashboard.people.create.root}>
            <AddButton />
          </Link>
        }
      />
      <PeopleTable people={people} peopleCount={peopleCount} />
    </Main>
  );
};

export default PeoplePage;
