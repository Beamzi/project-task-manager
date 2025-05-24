"use client";

import { projectContext } from "@/context/ProjectContext";
import { useContext } from "react";
import { useState } from "react";
import React from "react";
import LinkTaskToProjectBtn from "./LinkTaskToProjectBtn";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import ChevronDown from "../icons/ChevronDown";
import DropDown from "../icons/DropDown";

const overflowEllipsis =
  "overflow-hidden whitespace-nowrap text-ellipsis w-18 lg:w-18 xl:w-22 md:w-18";

export default function ProjectAssignBtn({
  taskId,
  projectIdOfTask,
  minimise,
  parentHover,
}: {
  taskId: string;
  projectIdOfTask: string;
  minimise: boolean;
  parentHover: boolean;
}) {
  const projects = useContext(projectContext);

  if (!projects) {
    throw new Error("projects not loaded");
  }

  const [list, setList] = useState(false);
  const [titleCheck, setTitleCheck] = useState("");
  const [assignCheck, setAssignCheck] = useState(false);
  // bg-linear-to-r/srgb from-neutral-900 to-neutral-800
  return (
    <div
      className={` ${
        minimise &&
        parentHover &&
        "bg-linear-to-r/srgb from-neutral-900 to-neutral-800"
      } flex flex-col w-full py-1 px-2 ${list && ""} `}
    >
      <button
        className={`hover:text-rose-600 text-md font-light text-start flex transition-all duration-300 hover:[&>*]: ${
          list && "text-rose-600"
        }`}
        onClick={() => (list ? setList(false) : setList(true))}
      >
        <ChevronDown isRendered={list} />

        {!projectIdOfTask && !assignCheck && "Projects"}
        {assignCheck ? (
          <>
            <p className={`${overflowEllipsis}`}>{`${titleCheck}`}</p>
          </>
        ) : (
          projects?.map((item) => (
            <div className="" key={item.id}>
              {item.id === projectIdOfTask ? (
                <div className={`flex `}>
                  <p className={`${overflowEllipsis}`}>{`${item.title}`}</p>
                </div>
              ) : null}
            </div>
          ))
        )}
      </button>

      <DropDown isRendered={list}>
        {projects?.map((item) => (
          <motion.li
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1, transition: { duration: 0.1 } }}
            className="pointer-none li-hover "
            key={item.id}
          >
            <LinkTaskToProjectBtn
              setList={setList}
              setTitleCheck={setTitleCheck}
              setAssignCheck={setAssignCheck}
              title={item.title}
              projectId={item.id}
              taskId={taskId}
            >
              {item.title}
            </LinkTaskToProjectBtn>
          </motion.li>
        ))}
      </DropDown>
    </div>
  );
}
