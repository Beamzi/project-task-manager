"use client";

import { PrioritiesContext } from "@/context/PrioritiesContext";
import { GetPrioritiesTypeOf } from "@/lib/queries/getPriorities";
import React, { useState } from "react";

interface Props {
  priorities: GetPrioritiesTypeOf[];
  children: React.ReactNode;
}

export default function PrioritiesProvider({ priorities, children }: Props) {
  const [priorityTasksClient, setPriorityTasksClient] =
    useState<GetPrioritiesTypeOf[]>(priorities);

  return (
    <PrioritiesContext.Provider
      value={{ priorityTasksClient, setPriorityTasksClient }}
    >
      {children}
    </PrioritiesContext.Provider>
  );
}
