"use client";

import { create } from "domain";
import { createContext } from "react";

export type TaskType = {
  author: {
    name: string | null;
  } | null;
  title: string;
  date: Date;
  content: string | null;
  id: string;
};

export const TaskContext = createContext<TaskType[]>([]);
