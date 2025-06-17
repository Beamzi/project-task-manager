"use client";
import React from "react";

import ListOfScheduleTasks from "@/components/Schedule/ListOfScheduleTasks";
import ScheduleMenu from "@/components/Schedule/ScheduleMenu";
import { useContext } from "react";
import { AllTasksDueDateContext } from "@/context/AllTasksDueDateContext";
import { TaskContext } from "@/context/TaskContext";

export default function Schedule() {
  //   const allTasksByDueDate = useContext(AllTasksDueDateContext);

  const allTasksContext = useContext(TaskContext);
  if (!allTasksContext) throw new Error("tasks not laoded ");
  const { setAllTasksClient, allTasksClient } = allTasksContext;

  const allTasksClientCopy = [...allTasksClient];

  allTasksClientCopy.sort((a, b) => b.date.getTime() - a.date.getTime());

  return (
    <div className="mt-[clamp(8px,4vh,50px)] gradient-for-thin-containers min-h-0 flex flex-col border-1 rounded-2xl w-[calc(100%-4dvw)] 2xl:w-[calc(72%-4dvw)] xl:w-[calc(72%-4dvw)] outline-5 -outline-offset-6  outline-neutral-900">
      <div className="">
        <ScheduleMenu
          allTasksClientCopy={allTasksClientCopy}
          setAllTasksClient={setAllTasksClient}
        />
      </div>
      <div className="flex-1 flex-col rounded-b-2xl scrolling-container gradient-for-inner-containers  overflow-y-scroll h-full min-h-0 ">
        {/* <div className="h-800"></div> */}
        <ListOfScheduleTasks
          allTasksClientCopy={allTasksClientCopy}
          //   setAllTasksClient={setAllTasksClient}
        />
      </div>
    </div>
  );
}
