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
  ChevronDownIcon,
  ChevronUpIcon,
} from "@heroicons/react/24/outline";

import { TaskDueDateContext } from "@/context/TaskDueDateContext";
import SearchModal from "../SearchModal";
import { usePathname } from "next/navigation";
import ChevronDown from "../icons/ChevronDown";
import ChevronUp from "../icons/ChevronUp";

export default function SideBar({ className }: { className: string }) {
  const pathName = usePathname();
  const [isRendered, setIsRendered] = useState(true);
  const [init, setInit] = useState(true);
  const [projectListClient, setProjectListClient] = useState<string[]>([]);
  const [projectListIds, setProjectListIds] = useState<string[]>([]);

  const dashBoardProps = useContext(DashBoardContext);
  if (!dashBoardProps) {
    throw new Error("context not provided");
  }
  const { sideMenu } = dashBoardProps;

  const active = (path: string) =>
    `${
      pathName === path &&
      "bg-neutral-700/50 [&>*]:stroke-rose-600 text-white hover:text-black  hover:bg-white"
    }`;
  return (
    <>
      <aside className={`sidebar ${className} ${sideMenu}`}>
        <SearchModal />
        <NewTaskBtn />
        <Link className={` flex ${active("/")}`} href={"/"}>
          <HomeIcon />
          Overview
        </Link>
        <Link className={` flex ${active("/inbox")}`} href={"/inbox"}>
          <InboxIcon />
          Inbox
        </Link>
        <Link className={` flex ${active("/schedule")}`} href={"/schedule"}>
          <CalendarDaysIcon />
          Schedule
        </Link>
        <Link className={` flex ${active("/priorities")}`} href={"/priorities"}>
          <StarIcon />
          Priorities
        </Link>
        <NewProjectBtn
          projectListClient={projectListClient}
          setProjectListClient={setProjectListClient}
          projectListIds={projectListIds}
          setProjectListIds={setProjectListIds}
        />
        {/* <Link className={`flex ${active("/projects")}`} href={"/projects"}> */}
        <div className=" flex justify-between">
          <button
            onClick={() => {
              setIsRendered(isRendered ? false : true);
            }}
          >
            <div className="flex items-center pointer-events-none">
              <ListBulletIcon />
              All Projects
            </div>
            <div className=" flex justify-center align-middle items-center content-center w-10 h-5">
              <ChevronUp isRendered={isRendered} />
            </div>
          </button>
        </div>
        {isRendered && (
          <ProjectList
            projectListClient={projectListClient}
            active={active}
            projectListIds={projectListIds}
          />
        )}
      </aside>
    </>
  );
}

// w-100 h-100 mx-auto border-1 absolute left-0 right-0 fixed inset-0 z-100
