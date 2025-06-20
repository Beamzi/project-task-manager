"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import React, { useState, useRef } from "react";

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);
  const [sideMenu, setSideMenu] = useState(false);
  const scrollDivRef = useRef<HTMLDivElement | null>(null);
  const [globalMinimised, setGlobalMinimised] = useState(false);
  const [removeProjectFromDashboard, setRemoveProjectFromDashboard] = useState<
    string[]
  >([]);

  interface CommentData {
    content: string;
    createdAt: Date;
    id: string;
  }
  const [localComment, setLocalComment] = useState<CommentData[]>([]);

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
        localComment,
        setLocalComment,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
