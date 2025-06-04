"use client";
import React, { createContext, Dispatch, SetStateAction } from "react";

import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";

export interface Props {
  allProjectsClient: GetAllProjecttypeOf[];
  setAllProjectsClient: Dispatch<SetStateAction<GetAllProjecttypeOf[]>>;
}

export const AllProjectsContext = createContext<Props | null>(null);
