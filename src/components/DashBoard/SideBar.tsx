"use client";

import React, { useContext } from "react";
import NewTaskBtn from "../buttons/NewTaskBtn";
import NewProjectBtn from "../buttons/NewProjectBtn";
import ProjectList from "../Lists/ProjectList";
import { DashBoardContext } from "@/context/DashBoardContext";

import {
  StarIcon,
  CheckCircleIcon,
  ListBulletIcon,
} from "@heroicons/react/24/outline";

export default function SideBar({ className }: { className: string }) {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard globals not loaded");
  }

  const { sideMenu, setSideMenu } = context;
  return (
    <>
      <aside className={`${className} ${sideMenu}`}>
        <NewTaskBtn />
        <button>
          <CheckCircleIcon />
          All Tasks
        </button>
        <button>
          <StarIcon />
          Prioties
        </button>
        <button>
          <ListBulletIcon />
          Projects
        </button>
        <NewProjectBtn />
        <ProjectList />
      </aside>
    </>
  );
}
