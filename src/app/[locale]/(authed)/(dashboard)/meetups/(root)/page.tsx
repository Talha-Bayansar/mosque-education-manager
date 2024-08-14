"use server";

import { MeetupsTable } from "@/features/meetup/components/meetups-table";
import {
  getMeetups,
  getMeetupsCount,
} from "@/features/meetup/server-actions/meetup";

type Props = {
  searchParams: {
    page?: string;
  };
};

const MeetupsPage = async ({ searchParams: { page } }: Props) => {
  const pageNumber = Number(page ?? 1);
  const meetups = await getMeetups(10, (pageNumber - 1) * 10);
  const meetupsCount = await getMeetupsCount();

  return <MeetupsTable meetups={meetups} meetupsCount={meetupsCount} />;
};

export default MeetupsPage;
