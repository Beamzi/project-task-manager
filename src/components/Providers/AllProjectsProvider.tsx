"use client";

import React from "react";
import { useMemo } from "react";

import { AllProjectsContext } from "@/context/AllProjectsContext";

import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";

interface Props {
  value: GetAllProjecttypeOf[];
  children: React.ReactNode;
}

export default function AllProjectsProvider({ value, children }: Props) {
  const memoizedValue = useMemo(() => value, [value]);

  return (
    <AllProjectsContext.Provider value={memoizedValue}>
      {children}
    </AllProjectsContext.Provider>
  );
}
