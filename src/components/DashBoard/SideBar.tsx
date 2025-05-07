"use client";

import React, { useContext } from "react";
import NewTaskBtn from "../buttons/NewTaskBtn";
import NewProjectBtn from "../buttons/NewProjectBtn";
import ProjectList from "../Lists/ProjectList";
import { DashBoardContext } from "@/context/DashBoardContext";
import Link from "next/link";

import {
  StarIcon,
  CheckCircleIcon,
  ListBulletIcon,
  InboxIcon,
  HomeIcon,
  CalendarDaysIcon,
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
        <Link className="flex" href={"/"}>
          <HomeIcon />
          Overview
        </Link>

        <button>
          <InboxIcon />
          Inbox
        </button>
        <button>
          <CalendarDaysIcon />
          Schedule
        </button>

        <button>
          <StarIcon />
          Priorities
        </button>

        <NewProjectBtn />
        <button>
          <ListBulletIcon />
          All Projects
        </button>
        <ProjectList />
      </aside>
    </>
  );
}
