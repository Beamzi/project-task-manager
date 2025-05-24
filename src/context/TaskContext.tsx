"use client";

import { create } from "domain";
import { createContext } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

// export type TaskType = {
//   author: {
//     name: string | null;
//   } | null;
//   title: string;
//   date: Date;
//   content: string | null;
//   id: string;
//   priority: boolean;
//   projectId: string | null;
// };

export const TaskContext = createContext<getAllTasksTypeOf[]>([]);
