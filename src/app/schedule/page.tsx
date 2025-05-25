"use client";
import React from "react";

import ListOfScheduleTasks from "@/components/Schedule/ListOfScheduleTasks";
import ScheduleMenu from "@/components/Schedule/ScheduleMenu";
import { useContext } from "react";
import { AllTasksDueDateContext } from "@/context/AllTasksDueDateContext";

export default function Schedule() {
  const allTasksByDueDate = useContext(AllTasksDueDateContext);

  return (
    <div className="gradient-for-thin-containers min-h-0 flex flex-col border-1 rounded-2xl w-[80%] 2xl:w-[70%] outline-5 -outline-offset-6  outline-neutral-900">
      <div className="">
        <ScheduleMenu scheduleTasks={allTasksByDueDate} />
      </div>

      <div className="flex-1 flex-col rounded-b-2xl scrolling-container gradient-for-inner-containers  overflow-y-scroll h-full min-h-0 ">
        {/* <div className="h-800"></div> */}
        <ListOfScheduleTasks scheduleTasks={allTasksByDueDate} />
      </div>
    </div>
  );
}
