"use client";
import { TaskContext } from "@/context/TaskContext";
import React from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { useState } from "react";

interface Props {
  children: React.ReactNode;
  allTasks: getAllTasksTypeOf[];
}

export default function AllTasksProvider({ children, allTasks }: Props) {
  const [allTasksClient, setAllTasksClient] =
    useState<getAllTasksTypeOf[]>(allTasks);

  return (
    <TaskContext.Provider value={{ allTasksClient, setAllTasksClient }}>
      {children}
    </TaskContext.Provider>
  );
}
