"use client";

import React, { useContext, useState } from "react";
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

import { TaskDueDateContext } from "@/context/TaskDueDateContext";
import SearchModal from "../SearchModal";

export default function SideBar({ className }: { className: string }) {
  const dashBoardProps = useContext(DashBoardContext);

  if (!dashBoardProps) {
    throw new Error("context not provided");
  }
  const { sideMenu, setSideMenu } = dashBoardProps;

  return (
    <>
      <aside className={`${className} ${sideMenu}`}>
        <SearchModal />

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

// w-100 h-100 mx-auto border-1 absolute left-0 right-0 fixed inset-0 z-100
