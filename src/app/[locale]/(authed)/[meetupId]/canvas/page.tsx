import { getMeetupById } from "@/features/meetup/server-actions/meetup";
import { CreatePoster } from "@/features/poster/components/create-poster";
import { notFound } from "next/navigation";

type Props = {
  searchParams: {
    image?: string;
  };
  params: {
    meetupId: string;
  };
};

export const CanvasPage = async ({
  searchParams: { image },
  params: { meetupId },
}: Props) => {
  const meetup = await getMeetupById(meetupId);

  if (!image) notFound();

  return <CreatePoster meetup={meetup} imageUrl={image} />;
};

export default CanvasPage;
