"use client";

import type { Session } from "next-auth";
import { createContext } from "react";

export const SessionContext = createContext<Session | null>(null);
