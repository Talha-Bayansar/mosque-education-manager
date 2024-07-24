import { UpdatePersonForm } from "@/features/person/components/update-person-form";
import { getPersonById } from "@/features/person/server-actions/person";
import { routes } from "@/lib/routes";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import {
  NavigationHistory,
  NavigationHistoryItem,
} from "@/shared/components/navigation-history";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    personId: string;
  };
};

const UpdatePersonPage = async ({ params: { personId } }: Props) => {
  const t = await getTranslations();
  const person = await getPersonById(personId);
  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.people.root,
      label: t("people"),
    },
    {
      label: t("updatePerson"),
    },
  ];

  return (
    <Main>
      <Header>
        <Title>{t("updatePerson")}</Title>
      </Header>
      <NavigationHistory items={history} />
      <UpdatePersonForm person={person} />
    </Main>
  );
};

export default UpdatePersonPage;
