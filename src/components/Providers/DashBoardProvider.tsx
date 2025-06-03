"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import React, { useState, useRef } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

export function DashBoardProvider({
  children,
  allTasks,
}: {
  children: React.ReactNode;
  allTasks: getAllTasksTypeOf[];
}) {
  const [modal, setModal] = useState(false);
  const [sideMenu, setSideMenu] = useState("");
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
