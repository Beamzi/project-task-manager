"use client";

import { projectContext } from "@/context/ProjectContext";
import { useContext } from "react";
import { useState } from "react";
import React from "react";
import LinkTaskToProjectBtn from "./LinkTaskToProjectBtn";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";

export default function ProjectAssignBtn({
  taskId,
  projectIdOfTask,
}: {
  taskId: string;
  projectIdOfTask: string;
}) {
  const projects = useContext(projectContext);

  if (!projects) {
    throw new Error("projects not loaded");
  }

  const [list, setList] = useState(false);
  const [titleCheck, setTitleCheck] = useState(false);

  return (
    <div className="flex flex-col w-full py-2 px-2 relative">
      <button
        className={`hover:text-rose-600  text-start flex  transition-all duration-300 hover:[&>*]:scale-120 ${
          list && "text-rose-600"
        }`}
        onClick={() => (list ? setList(false) : setList(true))}
      >
        <motion.div
          animate={list ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
          className="mr-2 w-5"
        >
          <ChevronDownIcon
            className={`text-white w-full h-full ${list && "fill-white "}`}
          />
        </motion.div>
        Projects
        {projects?.map((item) => (
          <p key={item.id}>{item.id === projectIdOfTask ? item.title : null}</p>
        ))}
      </button>
      {list && (
        <motion.ul
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, transition: { duration: 0.1 } }}
          className="absolute top-15 left-0 border-t-1 origin-top bg-black  shadow-2xl shadow-black border-r-3"
        >
          {projects?.map((item) => (
            <motion.li
              initial={{ opacity: 0, scaleY: 0 }}
              animate={{ opacity: 1, scaleY: 1, transition: { duration: 0.1 } }}
              className="border-x-1 border-b-1 pointer-none origin-top h-full hover:bg-neutral-800 hover:py-1 hover:ml-2 hover:-mr-2 px-1 hover:border-transparent  hover:outline-1 outline-neutral-400 transition-all duration-100"
              key={item.id}
            >
              <LinkTaskToProjectBtn
                setList={setList}
                setTitleCheck={setTitleCheck}
                titleCheck={titleCheck}
                title={item.title}
                projectId={item.id}
                taskId={taskId}
              >
                {item.title}
              </LinkTaskToProjectBtn>
            </motion.li>
          ))}
        </motion.ul>
      )}
    </div>
  );
}
