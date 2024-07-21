"use server";

import { CreatePersonForm } from "@/features/person/components/create-person-form";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { getTranslations } from "next-intl/server";

const CreatePersonPage = async () => {
  const t = await getTranslations();

  return (
    <Main>
      <Header>
        <Title>Create person</Title>
      </Header>
      <CreatePersonForm />
    </Main>
  );
};

export default CreatePersonPage;
