import { getGroups } from "@/features/group/server-actions/group";
import { CreateMeetupForm } from "@/features/meetup/components/create-meetup-form";

const CreateMeetupPage = async () => {
  const groups = await getGroups();

  return <CreateMeetupForm groups={groups} />;
};

export default CreateMeetupPage;
