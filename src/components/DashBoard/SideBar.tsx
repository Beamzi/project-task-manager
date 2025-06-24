"use client";

import React, { useContext, useState } from "react";
import NewTaskBtn from "../buttons/NewTaskBtn";
import NewProjectBtn from "../buttons/NewProjectBtn";
import ProjectList from "../Lists/ProjectList";
import { DashBoardContext } from "@/context/DashBoardContext";
import Link from "next/link";
import SearchModal from "../SearchModal";
import { usePathname } from "next/navigation";
import ChevronUp from "../icons/ChevronUp";
import { motion } from "motion/react";
import { SessionContext } from "@/context/SessionContext";
import ProfileTopBar from "../ProfileTopBar";
import { LuHouse } from "react-icons/lu";
import { LuInbox } from "react-icons/lu";
import { LuCalendarCheck } from "react-icons/lu";
import { LuStar } from "react-icons/lu";
import { LuBox } from "react-icons/lu";
import { LuDiamondPlus } from "react-icons/lu";

export default function SideBar({ className }: { className: string }) {
  const pathName = usePathname();
  const [isRendered, setIsRendered] = useState(true);

  const [showProjectForm, setShowProjectForm] = useState(false);
  const session = useContext(SessionContext);
  const dashBoardProps = useContext(DashBoardContext);
  if (!dashBoardProps || !session) {
    throw new Error("context not provided");
  }
  const { sideMenu, setSideMenu } = dashBoardProps;

  const active = (path: string) =>
    `${
      pathName === path &&
      "bg-neutral-700/50 [&>*]:stroke-rose-600 text0 text-white hover:text-black hover:bg-white"
    }`;

  return (
    <>
      <motion.aside
        animate={sideMenu ? { scaleX: [0, 1] } : {}}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.2 }}
        className={`sidebar origin-left md:opacity-100 ${className} ${
          sideMenu ? "visible !opacity-100" : "invisible opacity-0 "
        } `}
      >
        <ProfileTopBar session={session}></ProfileTopBar>
        <SearchModal />
        <NewTaskBtn />
        <Link
          className={` flex ${active("/")}`}
          href={"/"}
          onClick={() => setSideMenu(false)}
        >
          <LuHouse className="w-5 h-5" />
          Overview
        </Link>
        <Link
          className={` flex ${active("/inbox")}`}
          href={"/inbox"}
          onClick={() => setSideMenu(false)}
        >
          <LuInbox className="w-5 h-5" />
          Inbox
        </Link>
        <Link
          className={` flex ${active("/schedule")}`}
          href={"/schedule"}
          onClick={() => setSideMenu(false)}
        >
          <LuCalendarCheck className="w-5 h-5" />
          Schedule
        </Link>
        <Link
          className={` flex ${active("/priorities")}`}
          href={"/priorities"}
          onClick={() => setSideMenu(false)}
        >
          <LuStar className="w-5 h-5" />
          Priorities
        </Link>

        <button
          className="flex"
          type="button"
          onClick={() => {
            setShowProjectForm(true);
          }}
        >
          <LuDiamondPlus className="w-5 h-5" />
          New Project
        </button>
        {showProjectForm && (
          <NewProjectBtn setShowProjectForm={setShowProjectForm} />
        )}

        <div className=" flex justify-between">
          <button
            id={"all-projects"}
            className="all-projects hover:bg-transparent hover:[&>svg]:scale-120 hover:[&>svg]:stroke-rose-600  "
            onClick={() => {
              setIsRendered(isRendered ? false : true);
            }}
          >
            <LuBox className="w-5 h-5" />

            <span className="block mr-2">All Projects</span>
            <div>
              <ChevronUp className={""} isRendered={isRendered} />
            </div>
          </button>
        </div>

        {isRendered && <ProjectList active={active} />}

        <div></div>
      </motion.aside>
    </>
  );
}
