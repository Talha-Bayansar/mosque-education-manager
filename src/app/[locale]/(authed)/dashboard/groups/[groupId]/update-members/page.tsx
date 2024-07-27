"use server";

import { UpdateGroupMembersTable } from "@/features/group/components/update-group-members-table";
import {
  getPeople,
  getPeopleCount,
  getPeopleIdsByGroupId,
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
  searchParams: {
    page?: string;
  };
};

const UpdateGroupPage = async ({
  params: { groupId },
  searchParams: { page },
}: Props) => {
  const t = await getTranslations();
  const pageNumber = Number(page ?? 1);
  const people = await getPeople(10, (pageNumber - 1) * 10);
  const peopleCount = await getPeopleCount();
  const peopleIds = await getPeopleIdsByGroupId(groupId);

  if (!peopleIds) notFound();

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
    <GroupMembersContextProvider peopleByGroupIds={peopleIds}>
      <Main>
        <Header>
          <NavigationDrawer />
          <Title>{t("updateMembers")}</Title>
          <div className="flex flex-grow justify-end">
            <SaveMembersButton />
          </div>
        </Header>
        <NavigationHistory items={history} />
        <UpdateGroupMembersTable people={people} peopleCount={peopleCount} />
      </Main>
    </GroupMembersContextProvider>
  );
};

export default UpdateGroupPage;
