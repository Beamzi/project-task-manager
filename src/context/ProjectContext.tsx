"use client";

import { createContext } from "react";

interface keys {
  title: string;
  id: string;
}

export const projectContext = createContext<keys[] | null>(null);
