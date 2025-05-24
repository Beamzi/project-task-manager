"use client";

import { GetPrioritiesTypeOf } from "@/lib/queries/getPriorities";
import { createContext } from "react";

export const PrioritiesContext = createContext<GetPrioritiesTypeOf[]>([]);
