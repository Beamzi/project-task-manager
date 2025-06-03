"use client";

import { create } from "domain";
import { createContext } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { Dispatch, SetStateAction } from "react";

interface Props {
  setAllTasksClient: React.Dispatch<React.SetStateAction<getAllTasksTypeOf[]>>;
  allTasksClient: getAllTasksTypeOf[];
}

export const TaskContext = createContext<Props | null>(null);

// export const TaskContext = createContext<getAllTasksTypeOf[]>([]);
