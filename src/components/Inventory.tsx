"use client";

import React, { useContext } from "react";
import { LuChevronRight } from "react-icons/lu";
import { TaskContext } from "@/context/TaskContext";
import { AllProjectsContext } from "@/context/AllProjectsContext";
import { AllCommentsContext } from "@/context/AllCommentsContext";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { GetAllCommentsTypeof } from "@/lib/queries/getAllComments";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";
import { DashBoardContext } from "@/context/DashBoardContext";

const ellipsis = "overflow-hidden whitespace-nowrap text-ellipsis w-40";

export default function Inventory({
  setShowInventory,
}: {
  setShowInventory: (value: boolean) => void;
}) {
  const projectsContext = useContext(AllProjectsContext);
  const tasksContext = useContext(TaskContext);
  const commentsContext = useContext(AllCommentsContext);
  const dashboardContext = useContext(DashBoardContext);
  if (
    !projectsContext ||
    !tasksContext ||
    !commentsContext ||
    !dashboardContext
  ) {
    throw new Error("context not loaded");
  }
  const { allTasksClient } = tasksContext;
  const { allProjectsClient } = projectsContext;
  const { allCommentsClient } = commentsContext;

  const { globalIdScroll, setGlobalIdScroll } = dashboardContext;

  const priorities = [
    ...allTasksClient.filter((item) => item.priority === true),
  ];
  const notes = allCommentsClient.filter((item) => !item.projectId);
  const tasks = [...allTasksClient];
  const projects = [...allProjectsClient];

  const getList = (
    model: string,
    isNote: boolean,
    data: getAllTasksTypeOf[] | GetAllCommentsTypeof[] | GetAllProjecttypeOf[]
  ) => {
    return (
      <div className={"mr-2 pb-4 w-full px-2 py-2"}>
        <h3 className=" text-lg !font-light mb-1 ml-2 ">{model}</h3>
        <ul>
          {data?.map((item) => (
            <li
              onClick={() => {
                const id = document.getElementById(item.id);
                setShowInventory(false);
                setTimeout(() => {
                  id?.scrollIntoView({});
                });
                // setGlobalIdScroll(item.id);
              }}
              key={item.id}
              className="flex text-neutral-400 ml-1 items-center border-b-1 border-neutral-700/50 py-1"
            >
              <LuChevronRight className="stroke-rose-600" />
              <span className={`${ellipsis}`}>
                {isNote
                  ? (item as GetAllCommentsTypeof).content
                  : (item as getAllTasksTypeOf | GetAllProjecttypeOf).title}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  };

  return (
    <div className="flex justify-center  h-full flex-wrap outline-neutral-900 outline-4 -outline-offset-5 border-1 rounded-xl p-4 w-[calc(100dvw-30px)] md:w-full md:min-w-150 gradient-for-vert-containers">
      <div className="w-1/2">{getList("Tasks", false, tasks)}</div>
      <div className="w-1/2">
        {getList("Projects", false, projects)}
        {getList("Priorities", false, priorities)}
        {getList("Notes", true, notes)}
      </div>
    </div>
  );
}
