import type { Meetup } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getMeetupById } from "../server-actions/meetup";

export const getUseMeetupByIdQueryKey = (id: string) => ["meetup", id];

type Props = {
  id: string;
  initialData?: Meetup;
};

export const useMeetupById = ({ id, initialData }: Props) => {
  const query = useQuery({
    queryKey: getUseMeetupByIdQueryKey(id),
    queryFn: async () => await getMeetupById(id),
    initialData: initialData,
  });

  return query;
};
