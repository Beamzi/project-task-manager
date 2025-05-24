"use client";
import React, { createContext } from "react";

import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";

export interface AllProjects {
  project: GetAllProjecttypeOf;
}

export const AllProjectsContext = createContext<GetAllProjecttypeOf[]>([]);
