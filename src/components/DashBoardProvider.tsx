"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import React, { useState } from "react";

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);
  const [sideMenu, setSideMenu] = useState("");

  return (
    <DashBoardContext.Provider
      value={{ modal, setModal, sideMenu, setSideMenu }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
