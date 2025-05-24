"use client";
import React from "react";
import { SessionContext } from "@/context/SessionContext";

export default function CurrentSessionProvider({ value, children }) {
  return (
    <SessionContext.Provider value={value}>{children}</SessionContext.Provider>
  );
}
