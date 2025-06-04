"use client";

import { GetPrioritiesTypeOf } from "@/lib/queries/getPriorities";
import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
  priorityTasksClient: GetPrioritiesTypeOf[];
  setPriorityTasksClient: Dispatch<SetStateAction<GetPrioritiesTypeOf[]>>;
}

export const PrioritiesContext = createContext<Props | null>(null);
