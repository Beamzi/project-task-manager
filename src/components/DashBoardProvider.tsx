"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import React, { useState, useRef } from "react";

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);
  const [sideMenu, setSideMenu] = useState("");
  const taskRef = useRef({});
  const [globalMinimised, setGlobalMinimised] = useState(false);

  return (
    <DashBoardContext.Provider
      value={{
        modal,
        setModal,
        sideMenu,
        setSideMenu,
        taskRef,
        globalMinimised,
        setGlobalMinimised,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
