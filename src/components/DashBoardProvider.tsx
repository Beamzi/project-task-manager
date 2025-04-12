"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import React, { useState } from "react";

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);

  return (
    <DashBoardContext.Provider value={{ modal, setModal }}>
      {children}
    </DashBoardContext.Provider>
  );
}
