"use client";

import React, { useContext } from "react";
import NewTaskBtn from "../buttons/NewTaskBtn";
import NewProjectBtn from "../buttons/NewProjectBtn";
import ProjectList from "../Lists/ProjectList";
import { DashBoardContext } from "@/context/DashBoardContext";

export default function SideBar({ className }: { className: string }) {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard globals not loaded");
  }

  const { sideMenu, setSideMenu } = context;
  return (
    <>
      <aside className={`${className} ${sideMenu}`}>
        <NewTaskBtn></NewTaskBtn>
        <button>All Tasks</button>
        <button>Prioties</button>
        <button>Projects</button>
        <NewProjectBtn></NewProjectBtn>
        <ProjectList></ProjectList>
      </aside>
    </>
  );
}
