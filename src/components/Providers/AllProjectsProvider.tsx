"use client";

import React from "react";
import { useMemo } from "react";

import { AllProjectsContext } from "@/context/AllProjectsContext";

export default function AllProjectsProvider({ value, children }) {
  const memoizedValue = useMemo(() => value, [value]);

  return (
    <AllProjectsContext.Provider value={memoizedValue}>
      {children}
    </AllProjectsContext.Provider>
  );
}
