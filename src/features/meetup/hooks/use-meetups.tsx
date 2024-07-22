"use client";

import type { Meetup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getMeetups } from "../server-actions/meetup";

type Props = {
  initialData?: Meetup[];
};

export const getUseMeetupsQueryKey = () => ["meetups"];

export const useMeetups = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUseMeetupsQueryKey(),
    queryFn: async () => await getMeetups(),
    initialData,
  });

  return query;
};
