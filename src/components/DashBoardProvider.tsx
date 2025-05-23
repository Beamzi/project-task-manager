"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import React, { useState, useRef } from "react";

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);
  const [sideMenu, setSideMenu] = useState("");
  const scrollDivRef = useRef<HTMLDivElement | null>(null);
  const [globalMinimised, setGlobalMinimised] = useState(false);
  const [removeProjectFromDashboard, setRemoveProjectFromDashboard] = useState<
    string[]
  >([]);

  return (
    <DashBoardContext.Provider
      value={{
        modal,
        setModal,
        sideMenu,
        setSideMenu,
        scrollDivRef,
        globalMinimised,
        setGlobalMinimised,
        removeProjectFromDashboard,
        setRemoveProjectFromDashboard,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
