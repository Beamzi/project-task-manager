"use client";
import { TaskContext } from "@/context/TaskContext";
import React from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

// interface Props {
//   tasks: TaskType[];
//   children: React.ReactNode;
// }

interface Props {
  value: getAllTasksTypeOf[];
  children: React.ReactNode;
}

export default function TasksProvider({ value, children }: Props) {
  return <TaskContext.Provider value={value}>{children}</TaskContext.Provider>;
}
