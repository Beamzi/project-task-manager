"use client";

import React from "react";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import SingleContainer from "@/components/Skeleton/SingleContainer";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import { SessionContext } from "@/context/SessionContext";
import OverviewThreeSection from "@/components/OverviewThreeSection";

export default function AllTasksView() {
  const tasks = useContext(TaskContext);

  if (!tasks) {
    throw new Error("tasks not loaded ");
  }
  const session = useContext(SessionContext);

  if (!session) {
    throw new Error("session not loaded");
  }

  const userName = session?.user?.name;
  const firstNameOfUser = userName?.substring(0, userName?.indexOf(" "));

  return (
    <>
      <div className="break-words px-5 py-3 absolute top-20 right-10 bg-black border-1 rounded-xl w-60  flex content-center items-center align-middle  flex-shrink-0 justify-start  ">
        <h2 className=" text-[clamp(1rem,2dvh,1.5rem)]">
          {tasks[0]
            ? `Welcome Back, ${firstNameOfUser}, You have 12 active projects `
            : `Welcome, ${firstNameOfUser}, Click 'New Project or create task to get started! `}
        </h2>
      </div>

      <FirstRowContainers
        leftData={<ListOfTasks currentTasks={tasks}></ListOfTasks>}
        rightData={<ListOfReminderTasks />}
        leftTitle="Recently Created"
        rightTitle="Reminders"
        height="h-[50dvh] "
      ></FirstRowContainers>

      <SingleContainer data={<OverviewThreeSection />} height="h-full" />
    </>
  );
}
