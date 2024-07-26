import { useQuery } from "@tanstack/react-query";
import { getPeople } from "../server-actions/person";
import type { Person } from "@prisma/client";

export const getUsePeopleQueryKey = (page?: number) => [
  "people",
  `page=${page}`,
];

type Props = {
  initialData?: Person[];
  page?: number;
};

export const usePeople = ({ initialData, page }: Props) => {
  const query = useQuery({
    queryKey: getUsePeopleQueryKey(page),
    queryFn: async () => {
      let response;
      if (page) {
        response = await getPeople(10, (page - 1) * 10);
      } else {
        response = await getPeople();
      }
      return response;
    },
    initialData: initialData,
  });

  return query;
};
