"use client";

import React, { useState } from "react";
import { AllProjectsContext } from "@/context/AllProjectsContext";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";

interface Props {
  allProjects: GetAllProjecttypeOf[];
  children: React.ReactNode;
}

export default function AllProjectsProvider({ allProjects, children }: Props) {
  const [allProjectsClient, setAllProjectsClient] =
    useState<GetAllProjecttypeOf[]>(allProjects);

  return (
    <AllProjectsContext.Provider
      value={{ allProjectsClient, setAllProjectsClient }}
    >
      {children}
    </AllProjectsContext.Provider>
  );
}
