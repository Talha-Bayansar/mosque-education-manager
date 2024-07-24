import type { Person } from "@prisma/client";
import { useQuery } from "@tanstack/react-query";
import { getAttendanceByMeetupId } from "../server-actions/person";

export const getUseAttendanceByMeetupIdQueryKey = (
  meetupId: string,
  onlyIds: boolean = false
) => ["attendance", meetupId, onlyIds];

type Props = {
  meetupId: string;
  onlyIds?: boolean;
  initialData?: Person[] | string[];
};

export const useAttendanceByMeetupId = ({
  meetupId,
  onlyIds,
  initialData,
}: Props) => {
  const query = useQuery({
    queryKey: getUseAttendanceByMeetupIdQueryKey(meetupId, onlyIds),
    queryFn: async () => await getAttendanceByMeetupId(meetupId, onlyIds),
    initialData: initialData,
  });

  return query;
};
