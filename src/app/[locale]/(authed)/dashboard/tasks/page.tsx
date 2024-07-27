import { TasksBoard } from "@/features/task/components/tasks-board";
import { getTasks } from "@/features/task/server-actions/task";

const TasksPage = async () => {
  const tasks = await getTasks();

  return <TasksBoard tasks={tasks} />;
};

export default TasksPage;
