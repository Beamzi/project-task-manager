import React from "react";
import AllTasksDueDateProvider from "./AllTasksDueDateProvider";
import TasksProvider from "./TasksProvider";
import { TaskDueDateProvider } from "./TaskDueDateProvider";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { GetAllTasksByDueDateTypeOf } from "@/lib/queries/getAllTasksByDueDate";
import { TasksByDueDate } from "@/context/TaskDueDateContext";

interface Props {
  allTasksByDueDate: GetAllTasksByDueDateTypeOf[];
  tasksByDueDate: TasksByDueDate[];
  allTasks: getAllTasksTypeOf[];
  children: React.ReactNode;
}

export default function TasksProviderGroup({
  allTasksByDueDate,
  tasksByDueDate,
  allTasks,
  children,
}: Props) {
  return (
    <AllTasksDueDateProvider value={allTasksByDueDate}>
      <TaskDueDateProvider value={tasksByDueDate}>
        <TasksProvider allTasks={allTasks}>{children}</TasksProvider>
      </TaskDueDateProvider>
    </AllTasksDueDateProvider>
  );
}
