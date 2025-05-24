"use client";

import { PrioritiesContext } from "@/context/PrioritiesContext";
import { GetPrioritiesTypeOf } from "@/lib/queries/getPriorities";
import React from "react";

interface Props {
  value: GetPrioritiesTypeOf[];
  children: React.ReactNode;
}

export default function PrioritiesProvider({ value, children }: Props) {
  return (
    <PrioritiesContext.Provider value={value}>
      {children}
    </PrioritiesContext.Provider>
  );
}
