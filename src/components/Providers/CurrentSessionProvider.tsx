"use client";
import React from "react";
import type { Session } from "next-auth";
import { SessionContext } from "@/context/SessionContext";

interface SessionProviderProps {
  value: Session | null;
  children: React.ReactNode;
}

export default function CurrentSessionProvider({
  value,
  children,
}: SessionProviderProps) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
