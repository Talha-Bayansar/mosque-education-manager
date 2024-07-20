import { signout } from "@/features/auth/server-actions/auth";
import { Button } from "@/shared/components/ui/button";
import { Header } from "@/shared/components/ui/header";
import { Main } from "@/shared/components/ui/main";
import { PageContainer } from "@/shared/components/ui/page-container";
import { Title } from "@/shared/components/ui/title";
import React from "react";

type Props = {};

const DashboardPage = (props: Props) => {
  return (
    <PageContainer>
      <Main>
        <Header>
          <Title>Dashboard</Title>
        </Header>
        <form action={signout}>
          <Button type="submit" variant={"destructive"}>
            Logout
          </Button>
        </form>
      </Main>
    </PageContainer>
  );
};

export default DashboardPage;
