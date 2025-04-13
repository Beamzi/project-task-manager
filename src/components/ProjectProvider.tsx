"use client";
import { projectContext } from "@/context/ProjectContext";
import React from "react";

interface keys {
  title: string;
  id: string;
}

interface Props {
  value: keys[];
  children: React.ReactNode;
}

export function ProjectProvider({ value, children }: Props) {
  return (
    <projectContext.Provider value={value}>{children}</projectContext.Provider>
  );
}
