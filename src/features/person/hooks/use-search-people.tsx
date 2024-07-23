import { useQuery } from "@tanstack/react-query";
import { searchPeople } from "../server-actions/person";

export const getUseSearchPeopleQueryKey = (query?: string) => [
  "search-people",
  query,
];

type Props = {
  query?: string;
};

export const useSearchPeople = ({ query: q }: Props) => {
  const query = useQuery({
    queryKey: getUseSearchPeopleQueryKey(q),
    queryFn: async () => await searchPeople(q),
  });

  return query;
};
