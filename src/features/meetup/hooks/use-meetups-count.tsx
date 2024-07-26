"use client";

import { useQuery } from "@tanstack/react-query";
import { getMeetupsCount } from "../server-actions/meetup";

type Props = {
  initialData?: number;
};

export const getUseMeetupsCountQueryKey = () => ["meetups-count"];

export const useMeetupsCount = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUseMeetupsCountQueryKey(),
    queryFn: async () => await getMeetupsCount(),
    initialData,
  });

  return query;
};
