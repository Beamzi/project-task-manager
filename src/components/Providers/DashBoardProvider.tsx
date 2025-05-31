"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import { TaskInput } from "@/context/DashBoardContext";
import React, { useState, useRef } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

export function DashBoardProvider({ children }: { children: React.ReactNode }) {
  const [modal, setModal] = useState(false);
  const [sideMenu, setSideMenu] = useState("");
  const scrollDivRef = useRef<HTMLDivElement | null>(null);
  const [globalMinimised, setGlobalMinimised] = useState(false);
  const [removeProjectFromDashboard, setRemoveProjectFromDashboard] = useState<
    string[]
  >([]);

  const [newTaskValues, setNewTaskValues] = useState<TaskInput[]>([]);

  const [newTaskResponse, setNewTaskResponse] = useState<getAllTasksTypeOf[]>(
    []
  );

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
        setNewTaskValues,
        newTaskValues,
        newTaskResponse,
        setNewTaskResponse,
      }}
    >
      {children}
    </DashBoardContext.Provider>
  );
}
