"use client";

import { useQuery } from "@tanstack/react-query";
import type { Session, User } from "lucia";
import { getSession } from "../server-actions/auth";

type Props = {
  initialData?:
    | {
        user: User;
        session: Session;
      }
    | {
        user: null;
        session: null;
      };
};

export const getUseSessionQueryKey = () => ["session"];

export const useSession = ({ initialData }: Props) => {
  const query = useQuery({
    queryKey: getUseSessionQueryKey(),
    queryFn: async () => await getSession(),
    initialData,
  });

  return query;
};
