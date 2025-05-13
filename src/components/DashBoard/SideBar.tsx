"use client";

import React, { useContext } from "react";
import NewTaskBtn from "../buttons/NewTaskBtn";
import NewProjectBtn from "../buttons/NewProjectBtn";
import ProjectList from "../Lists/ProjectList";
import { DashBoardContext } from "@/context/DashBoardContext";
import Link from "next/link";
import SearchTasks from "../SearchTasks";

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
        <SearchTasks />
        <NewTaskBtn />
        <Link className="flex" href={"/"}>
          <HomeIcon />
          Overview
        </Link>

        <Link href={"/inbox"}>
          <InboxIcon />
          Inbox
        </Link>
        <Link href={"/schedule"}>
          <CalendarDaysIcon />
          Schedule
        </Link>

        <Link href={"/priorities"}>
          <StarIcon />
          Priorities
        </Link>

        <NewProjectBtn />

        <Link href={"/projects"}>
          <ListBulletIcon />
          All Projects
        </Link>
        <ProjectList />
      </aside>
    </>
  );
}
