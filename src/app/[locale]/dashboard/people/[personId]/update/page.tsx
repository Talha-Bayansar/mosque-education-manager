import { UpdatePersonForm } from "@/features/person/components/update-person-form";
import { getPersonById } from "@/features/person/server-actions/person";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { getTranslations } from "next-intl/server";

type Props = {
  params: {
    personId: string;
  };
};

export const UpdatePersonPage = async ({ params: { personId } }: Props) => {
  const t = await getTranslations();
  const person = await getPersonById(personId);

  return (
    <Main>
      <Header>
        <Title>{t("updatePerson")}</Title>
      </Header>
      <UpdatePersonForm person={person} />
    </Main>
  );
};

export default UpdatePersonPage;
