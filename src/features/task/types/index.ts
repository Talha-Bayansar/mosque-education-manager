import { getUpcomingTasks } from "../server-actions/task";

export type Task = Awaited<ReturnType<typeof getUpcomingTasks>>[number];
