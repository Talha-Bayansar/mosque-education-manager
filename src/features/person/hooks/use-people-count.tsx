import { useQuery } from "@tanstack/react-query";
import { getPeopleCount } from "../server-actions/person";

export const getUsePeopleCountQueryKey = () => ["people-count"];

type Props = {
  initialData?: number;
};

export const usePeopleCount = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUsePeopleCountQueryKey(),
    queryFn: async () => await getPeopleCount(),
    initialData: initialData,
  });

  return query;
};
