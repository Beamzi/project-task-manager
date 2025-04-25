"use client";

import { createContext } from "react";

export interface project {
  title: string;
  id: string;
}

export const projectContext = createContext<project[] | null>(null);
