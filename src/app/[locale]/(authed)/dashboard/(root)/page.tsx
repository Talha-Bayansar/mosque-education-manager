import { UpcomingMeetups } from "@/features/meetup/components/upcoming-meetups";
import { getUpcomingMeetups } from "@/features/meetup/server-actions/meetup";
import { UpcomingTasks } from "@/features/task/components/upcoming-tasks";
import { getUpcomingTasks } from "@/features/task/server-actions/task";
import { startOfYesterday } from "date-fns";

const DashboardPage = async () => {
  const upcomingMeetups = await getUpcomingMeetups(
    startOfYesterday().toISOString()
  );
  const upcomingTasks = await getUpcomingTasks(
    startOfYesterday().toISOString()
  );

  return (
    <>
      <UpcomingMeetups upcomingMeetups={upcomingMeetups} />
      <UpcomingTasks upcomingTasks={upcomingTasks} />
    </>
  );
};

export default DashboardPage;
