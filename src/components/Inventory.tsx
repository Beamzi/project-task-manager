"use client";
import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";
import { PrioritiesContext } from "@/context/PrioritiesContext";
import { projectContext } from "@/context/ProjectContext";
import { TaskDueDateContext } from "@/context/TaskDueDateContext";
import { ChevronRightIcon, MinusIcon } from "@heroicons/react/24/outline";
import React, { useContext } from "react";
import { SiListmonk } from "react-icons/si";
import { LuDot } from "react-icons/lu";
import { TaskContext } from "@/context/TaskContext";
import { AllProjectsContext } from "@/context/AllProjectsContext";
import { AllCommentsContext } from "@/context/AllCommentsContext";

const ellipsis = "overflow-hidden whitespace-nowrap text-ellipsis w-40";

export default function Inventory() {
  const projectsContext = useContext(AllProjectsContext);
  const tasksContext = useContext(TaskContext);
  const commentsContext = useContext(AllCommentsContext);
  if (!projectsContext || !tasksContext || !commentsContext) {
    throw new Error("context not loaded");
  }
  const { allTasksClient } = tasksContext;
  const { allProjectsClient } = projectsContext;
  const { allCommentsClient } = commentsContext;

  const priorities = [
    ...allTasksClient.filter((item) => item.priority === true),
  ];
  const notes = [...allCommentsClient.filter((item) => !item.projectId)];
  const tasks = [...allTasksClient];
  const projects = [...allProjectsClient];

  return (
    <div className="flex flex-wrap md:min-w-100 lg:min-w-200">
      <div className="border-t-1 w-full h-3 border-neutral-800"></div>
      <div className="mr-2 pb-4">
        <h3 className="text-rose-600 text-lg mb-1 ml-2">Tasks</h3>
        <ul>
          {tasks.map((item) => (
            <li key={item.id} className={`flex items-center `}>
              <LuDot />
              <span className={`${ellipsis}`}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mr-2 pb-4">
        <h3 className="text-rose-600 text-lg mb-1 ml-2">Projects</h3>
        <ul>
          {projects.map((item) => (
            <li key={item.id} className={`flex items-center `}>
              <LuDot />
              <span className={`${ellipsis}`}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mr-2 pb-4">
        <h3 className="text-rose-600 text-lg mb-1 ml-2">Priorities</h3>
        <ul>
          {priorities.map((item) => (
            <li key={item.id} className={`flex items-center `}>
              <LuDot />
              <span className={`${ellipsis}`}>{item.title}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="mr-2 pb-4">
        <h3 className="text-rose-600 text-lg mb-1 ml-2">Notes</h3>
        <ul>
          {notes.map((item) => (
            <li key={item.id} className={`flex items-center `}>
              <LuDot />
              <span className={`${ellipsis}`}>{item.content}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="border-t-1 w-full h-3 border-neutral-800"></div>
    </div>
  );
}

// <li className={`pointer-events-none ${ellipsis}`}>
