import { useQuery } from "@tanstack/react-query";
import { getPeople } from "../server-actions/person";
import type { Person } from "@prisma/client";

export const getUsePeopleQueryKey = () => ["people"];

type Props = {
  initialData?: Person[];
};

export const usePeople = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUsePeopleQueryKey(),
    queryFn: async () => await getPeople(),
    initialData: initialData,
  });

  return query;
};
