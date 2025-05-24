"use client";

import {
  TaskDueDateContext,
  TasksByDueDate,
} from "@/context/TaskDueDateContext";
import { Value } from "@prisma/client/runtime/library";
import React from "react";

interface Props {
  value: TasksByDueDate[];
  children: React.ReactNode;
}

export const TaskDueDateProvider = ({ value, children }: Props) => {
  return (
    <TaskDueDateContext.Provider value={value}>
      {children}
    </TaskDueDateContext.Provider>
  );
};
