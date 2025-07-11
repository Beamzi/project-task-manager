"use client";

import { useContext } from "react";
import { useState } from "react";
import React from "react";
import LinkTaskToProjectBtn from "./LinkTaskToProjectBtn";
import { motion } from "motion/react";
import ChevronDown from "../icons/ChevronDown";
import DropDown from "../icons/DropDown";
import { AllProjectsContext } from "@/context/AllProjectsContext";
import { PlusIcon } from "@heroicons/react/24/outline";
import { GiFriedFish } from "react-icons/gi";
import NewProjectBtn from "./NewProjectBtn";
import { LuBox } from "react-icons/lu";

const overflowEllipsis = "overflow-hidden whitespace-nowrap text-ellipsis ";

export default function ProjectAssignBtn({
  taskId,
  projectIdOfTask,
  minimise,
  parentHover,
}: {
  taskId?: string;
  projectIdOfTask?: string | null;
  minimise: boolean;
  parentHover: boolean;
}) {
  const projectsContext = useContext(AllProjectsContext);

  if (!projectsContext) {
    throw new Error("projects not loaded");
  }

  const { allProjectsClient } = projectsContext;
  const projects = [...allProjectsClient];

  const [list, setList] = useState(false);
  const [titleCheck, setTitleCheck] = useState("");
  const [assignCheck, setAssignCheck] = useState(false);
  const [showProjectForm, setShowProjectForm] = useState(false);

  return (
    <div
      className={` max-w-17 ${
        minimise && parentHover && " from-neutral-900 to-neutral-800"
      } flex flex-col w-full py-1 px-2 ${list && ""} `}
    >
      <button
        className={`hover:text-rose-600 text-md font-light text-start flex transition-all text-neutral-400 duration-300 hover:[&>*]: ${
          list && "text-rose-600"
        }`}
        onClick={() => (list ? setList(false) : setList(true))}
      >
        <div className="min-w-17 min-h-5 flex">
          <ChevronDown isRendered={list} />
          <LuBox className="w-5 h-5" />
        </div>

        {(!minimise && allProjectsClient.length === 0 && !assignCheck && (
          <span
            className={`block min-w-20 -ml-2 max-[346px]:min-w-12 max-[310px]:min-w-10 overflow-hidden whitespace-nowrap text-ellipsis max-[295px]:invisible  `}
          >
            Projects
          </span>
        )) ||
          (!minimise &&
            allProjectsClient.length !== 0 &&
            !projectIdOfTask &&
            !assignCheck && (
              <span
                className={`block min-w-20 -ml-2 max-[346px]:min-w-12 max-[310px]:min-w-10 max-[295px]:invisible overflow-hidden whitespace-nowrap text-ellipsis  `}
              >
                Projects
              </span>
            ))}

        {!minimise && assignCheck ? (
          <>
            <motion.p
              key={titleCheck}
              initial={{ opacity: 0.5, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`${overflowEllipsis} min-w-20 xl:min-w-30 lg:min-w-25 max-[346px]:min-w-12 max-[310px]:min-w-10  -ml-2`}
            >{`${titleCheck}`}</motion.p>
          </>
        ) : (
          !minimise &&
          projects?.map(
            (item) =>
              item.id === projectIdOfTask && (
                <p
                  key={item.id}
                  className={` min-w-20 xl:min-w-30 lg:min-w-25 -ml-2 max-[346px]:min-w-12 max-[310px]:min-w-10 ${overflowEllipsis}`}
                >{`${item.title}`}</p>
              )
          )
        )}
      </button>

      <DropDown isRendered={list}>
        {allProjectsClient.length === 0 && (
          <div className="flex flex-col items-center p-2 ">
            <GiFriedFish className="w-10 h-10" />
            <p className="my-2">You Have No Projects</p>

            <button
              className="flex bg-white text-black p-1 px-2 hover:text-rose-600 hover:[&>*]:stroke-black hover:[&>*]:scale-110 transition-all duration-200"
              type="button"
              onClick={() => {
                setList(false);
                setShowProjectForm(true);
              }}
            >
              <PlusIcon className="transition-all duration-200" />
              New Project
            </button>
          </div>
        )}

        {projects?.map((item) => (
          <motion.li
            initial={{ opacity: 0, scaleY: 0 }}
            animate={{ opacity: 1, scaleY: 1, transition: { duration: 0.1 } }}
            className="pointer-none li-hover rounded-lg "
            key={item.id}
          >
            <LinkTaskToProjectBtn
              setList={setList}
              setTitleCheck={setTitleCheck}
              setAssignCheck={setAssignCheck}
              title={item.title}
              projectId={item.id}
              taskId={taskId}
            ></LinkTaskToProjectBtn>
          </motion.li>
        ))}
      </DropDown>

      {showProjectForm && (
        <NewProjectBtn setShowProjectForm={setShowProjectForm} />
      )}
    </div>
  );
}
