"use client";

import type { Meetup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getMeetups } from "../server-actions/meetup";

type Props = {
  initialData?: Meetup[];
  page?: number;
};

export const getUseMeetupsQueryKey = (page?: number) => [
  "meetups",
  `page=${page}`,
];

export const useMeetups = ({ initialData, page }: Props) => {
  const query = useQuery({
    queryKey: getUseMeetupsQueryKey(page),
    queryFn: async () => {
      let response;
      if (page) {
        response = await getMeetups(10, (page - 1) * 10);
      } else {
        response = await getMeetups();
      }
      return response;
    },
    initialData,
  });

  return query;
};
