"use client";
import { TaskType, TaskContext } from "@/context/TaskContext";
import React from "react";

interface Props {
  tasks: TaskType[];
  children: React.ReactNode;
}

export default function TasksProvider({ tasks, children }: Props) {
  return <TaskContext.Provider value={tasks}>{children}</TaskContext.Provider>;
}
