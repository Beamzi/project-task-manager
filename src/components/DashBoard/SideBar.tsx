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
import { usePathname } from "next/navigation";

export default function SideBar({ className }: { className: string }) {
  const dashBoardProps = useContext(DashBoardContext);

  if (!dashBoardProps) {
    throw new Error("context not provided");
  }
  const { sideMenu, setSideMenu } = dashBoardProps;
  const pathName = usePathname();
  const [projectListClient, setProjectListClient] = useState<string[]>([]);
  const [projectListIds, setProjectListIds] = useState<string[]>([]);

  const active = (path: string) =>
    `${
      pathName === path &&
      "bg-neutral-700/50 [&>*]:stroke-rose-600 text-white hover:text-black  hover:bg-white"
    }`;
  return (
    <>
      <aside className={`${className} ${sideMenu}`}>
        <SearchModal />
        <NewTaskBtn />
        <Link className={`buttons flex ${active("/")}`} href={"/"}>
          <HomeIcon />
          Overview
        </Link>
        <Link className={`buttons flex ${active("/inbox")}`} href={"/inbox"}>
          <InboxIcon />
          Inbox
        </Link>
        <Link
          className={`buttons flex ${active("/schedule")}`}
          href={"/schedule"}
        >
          <CalendarDaysIcon />
          Schedule
        </Link>

        <Link
          className={`buttons flex ${active("/priorities")}`}
          href={"/priorities"}
        >
          <StarIcon />
          Priorities
        </Link>

        <NewProjectBtn
          projectListClient={projectListClient}
          setProjectListClient={setProjectListClient}
          projectListIds={projectListIds}
          setProjectListIds={setProjectListIds}
        />

        <Link className={`flex ${active("/projects")}`} href={"/projects"}>
          <ListBulletIcon />
          All Projects
        </Link>
        <ProjectList
          projectListClient={projectListClient}
          active={active}
          projectListIds={projectListIds}
        />
      </aside>
    </>
  );
}

// w-100 h-100 mx-auto border-1 absolute left-0 right-0 fixed inset-0 z-100
