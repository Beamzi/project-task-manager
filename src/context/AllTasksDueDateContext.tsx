"use client";

import { createContext } from "react";
import { GetAllTasksByDueDateTypeOf } from "@/lib/queries/getAllTasksByDueDate";

export const AllTasksDueDateContext = createContext<
  GetAllTasksByDueDateTypeOf[]
>([]);
