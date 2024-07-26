import { useInfiniteQuery } from "@tanstack/react-query";
import { searchPeople } from "../server-actions/person";

export const getUseSearchPeopleQueryKey = (query?: string) => [
  "search-people",
  query,
];

type Props = {
  query?: string;
};

export const useSearchPeople = ({ query: q }: Props) => {
  const query = useInfiniteQuery({
    queryKey: getUseSearchPeopleQueryKey(q),
    queryFn: async ({ pageParam }) => await searchPeople(q, pageParam),
    getNextPageParam: (lastPage) => {
      return lastPage?.metaData.cursor;
    },
    initialPageParam: "",
  });

  return query;
};
