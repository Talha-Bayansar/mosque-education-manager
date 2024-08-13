import { UpcomingMeetups } from "@/features/meetup/components/upcoming-meetups";
import { getUpcomingMeetups } from "@/features/meetup/server-actions/meetup";
import { UpcomingTasks } from "@/features/task/components/upcoming-tasks";
import { startOfYesterday } from "date-fns";

const DashboardPage = async () => {
  const upcomingMeetups = await getUpcomingMeetups(startOfYesterday());

  return (
    <>
      <UpcomingMeetups upcomingMeetups={upcomingMeetups} />
      <UpcomingTasks />
    </>
  );
};

export default DashboardPage;
