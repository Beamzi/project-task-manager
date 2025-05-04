"use client";

import { createContext } from "react";

export interface TasksByDueDate {
  title: string;
  date: Date;
  content: string | null;
  id: string;
}

export const TaskDueDateContext = createContext<TasksByDueDate[] | null>(null);
