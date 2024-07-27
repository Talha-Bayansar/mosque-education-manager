import { getGroups } from "@/features/group/server-actions/group";
import { UpdateMeetupForm } from "@/features/meetup/components/update-meetup-form";
import { getMeetupById } from "@/features/meetup/server-actions/meetup";
import type { Group, Meetup, Person } from "@prisma/client";

type Props = {
  params: {
    meetupId: string;
  };
};

const UpdateMeetupPage = async ({ params: { meetupId } }: Props) => {
  const meetup = await getMeetupById(meetupId);
  const groups = await getGroups();

  return (
    <UpdateMeetupForm
      groups={groups}
      meetup={
        meetup as Meetup & {
          speaker: Person;
          group?: Group;
        }
      }
    />
  );
};

export default UpdateMeetupPage;
