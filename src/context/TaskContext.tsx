"use client";

import { createContext } from "react";

export type Task = {
  author: {
    name: string | null;
  } | null;
  title: string;
  date: Date | string;
  content: string | null;
  id: string;
};

export const TaskContext = createContext<Task[]>([]);
