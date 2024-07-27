import { UpdatePersonForm } from "@/features/person/components/update-person-form";
import { getPersonById } from "@/features/person/server-actions/person";

type Props = {
  params: {
    personId: string;
  };
};

const UpdatePersonPage = async ({ params: { personId } }: Props) => {
  const person = await getPersonById(personId);

  return <UpdatePersonForm person={person} />;
};

export default UpdatePersonPage;
