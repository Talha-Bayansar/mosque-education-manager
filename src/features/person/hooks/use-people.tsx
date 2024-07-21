import { useQuery } from "@tanstack/react-query";
import { getPeople } from "../server-actions/person";
import type { Person } from "@prisma/client";

export const getUsePeopleQueryKey = () => ["people"];

export const usePeople = (initialData?: Person[]) => {
  const query = useQuery({
    queryKey: getUsePeopleQueryKey(),
    queryFn: async () => await getPeople(),
    initialData: initialData,
  });

  return query;
};
