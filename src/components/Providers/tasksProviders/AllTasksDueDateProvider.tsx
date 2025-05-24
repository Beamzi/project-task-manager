"use client";

import { AllTasksDueDateContext } from "@/context/AllTasksDueDateContext";
import { GetAllTasksByDueDateTypeOf } from "@/lib/queries/getAllTasksByDueDate";
import React from "react";

interface Props {
  value: GetAllTasksByDueDateTypeOf[];
  children: React.ReactNode;
}

export default function AllTasksDueDateProvider({ value, children }: Props) {
  return (
    <AllTasksDueDateContext.Provider value={value}>
      {children}
    </AllTasksDueDateContext.Provider>
  );
}
