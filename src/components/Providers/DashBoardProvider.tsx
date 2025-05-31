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

  type TaskValues = {
    title: string;
    content: string;
    date: Date;
  };

  const [newTaskValues, setNewTaskValues] = useState<TaskValues>({
    title: "",
    content: "",
    date: new Date(),
  });

  const [newTaskFlag, setNewTaskFlag] = useState(false);

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
        newTaskValues,
        setNewTaskValues,
        newTaskFlag,
        setNewTaskFlag,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
