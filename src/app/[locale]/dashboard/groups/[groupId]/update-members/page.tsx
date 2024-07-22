"use server";

import { UpdateGroupMembersTable } from "@/features/group/components/update-group-members-table";
import {
  getPeople,
  getPeopleByGroupId,
} from "@/features/person/server-actions/person";
import { routes } from "@/lib/routes";
import { Header } from "@/shared/components/layout/header";
import { Main } from "@/shared/components/layout/main";
import { Title } from "@/shared/components/layout/title";
import { NavigationDrawer } from "@/shared/components/navigation-drawer";
import {
  NavigationHistory,
  NavigationHistoryItem,
} from "@/shared/components/navigation-history";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { SaveMembersButton } from "./_components/save-members-button";
import { GroupMembersContextProvider } from "@/features/group/hooks/use-group-members-context";

type Props = {
  params: {
    groupId: string;
  };
};

const UpdateGroupPage = async ({ params: { groupId } }: Props) => {
  const t = await getTranslations();
  const peopleServer = await getPeople();
  const peopleByGroupServer = await getPeopleByGroupId(groupId, true);

  if (!peopleByGroupServer) notFound();

  const history: NavigationHistoryItem[] = [
    {
      href: routes.dashboard.groups.root,
      label: t("groups"),
    },
    {
      label: t("updateGroup"),
    },
  ];

  return (
    <GroupMembersContextProvider peopleByGroupServer={peopleByGroupServer}>
      <Main>
        <Header>
          <NavigationDrawer />
          <Title>{t("updateMembers")}</Title>
          <div className="flex flex-grow justify-end">
            <SaveMembersButton peopleByGroupServer={peopleByGroupServer} />
          </div>
        </Header>
        <NavigationHistory items={history} />
        <UpdateGroupMembersTable peopleServer={peopleServer} />
      </Main>
    </GroupMembersContextProvider>
  );
};

export default UpdateGroupPage;
