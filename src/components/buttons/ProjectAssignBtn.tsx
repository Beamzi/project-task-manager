"use client";

import { projectContext } from "@/context/ProjectContext";
import { useContext } from "react";
import { useState } from "react";
import React from "react";
import LinkTaskToProjectBtn from "./LinkTaskToProjectBtn";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";

export default function ProjectAssignBtn({ id }: { id: string }) {
  const taskId = id;
  const projects = useContext(projectContext);
  const [list, setList] = useState(false);

  return (
    <div className="flex flex-col w-full py-2 px-2 relative">
      <button
        className="text-start flex"
        onClick={() => (list ? setList(false) : setList(true))}
      >
        <ChevronDownIcon className="mr-2" />
        Projects
      </button>
      {list && (
        <motion.ul
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, transition: { duration: 0.1 } }}
          className="absolute top-13 left-0 border-t-1 origin-top bg-black"
        >
          {projects?.map((item) => (
            <motion.li
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1, transition: { duration: 0.1 } }}
              className="border-x-1 border-b-1 pointer-none origin-top hover:ml-2 hover:-mr-2  hover:border-transparent hover:py-1 hover:outline-1 outline-neutral-400 transition-all duration-100"
              key={item.id}
            >
              <LinkTaskToProjectBtn
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
