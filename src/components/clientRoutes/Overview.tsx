"use client";

import React from "react";
import ListOfReminderTasks from "@/components/Lists/ListOfReminderTasks";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import SingleContainer from "@/components/Skeleton/SingleContainer";
import { useContext, useState } from "react";
import { TaskContext } from "@/context/TaskContext";
import { SessionContext } from "@/context/SessionContext";
import OverviewThreeSection from "@/components/OverviewThreeSection";
import ThreeSection from "../Skeleton/ThreeSection";
import { GiDuration, GiStack } from "react-icons/gi";
import { createPortal } from "react-dom";
import Analytics from "../Analytics";
import PersonalNotes from "../PersonalNotes";
import { GiPencil } from "react-icons/gi";
import { LuPencilLine } from "react-icons/lu";
import { LuTimerReset } from "react-icons/lu";
import Inventory from "../Inventory";
import { LuPackageCheck } from "react-icons/lu";
import TopBarContainer from "../Skeleton/TopBarContainer";

export default function Overview() {
  const session = useContext(SessionContext);
  if (!session) {
    throw new Error("session not loaded");
  }

  const userName = session?.user?.name;
  const firstNameOfUser = userName?.substring(0, userName?.indexOf(" "));

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) {
    throw new Error("task context not loaded");
  }
  const { allTasksClient, setAllTasksClient } = tasksContext;

  const allTasksClientCreatedAt = [...allTasksClient];

  allTasksClientCreatedAt.sort(
    (a, b) => b.createdAt.getTime() - a.createdAt.getTime()
  );

  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  // h-[50vh]
  return (
    <>
      <TopBarContainer
        title="Recents & Reminders"
        data={
          <>
            <button
              onClick={() => setShowAnalytics(true)}
              className=" flex flex-col justify-center items-center h-full border-1 p-1 rounded-md ml-1"
            >
              <LuTimerReset className="w-full h-6" />
            </button>
            {showAnalytics &&
              createPortal(
                <>
                  <div
                    onClick={() => setShowAnalytics(false)}
                    className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%]  left-[50%] z-999 w-full h-full translate-[-50%]`}
                  ></div>
                  <div className="gradient-for-inner-containers scale-65 md:scale-90 border-1 z-1000 rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%] ">
                    <Analytics />
                  </div>
                </>,
                document.body
              )}

            <button
              onClick={() => setShowNotes(true)}
              className=" flex flex-col justify-center items-center h-full border-1 p-1 rounded-md ml-1"
            >
              <LuPencilLine className="w-full h-6" />
            </button>
            {showNotes &&
              createPortal(
                <>
                  <div
                    onClick={() => setShowNotes(false)}
                    className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
                  ></div>
                  <div className=" gradient-for-inner-containers border-1 z-1000 h-[80vh] rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%]">
                    <PersonalNotes />
                  </div>
                </>,
                document.body
              )}

            <button
              onClick={() => setShowInventory(showInventory ? false : true)}
              className="flex flex-col justify-center items-center h-full border-1 p-1 rounded-md ml-1"
            >
              <LuPackageCheck className="w-full h-6" />
            </button>
            {showInventory &&
              createPortal(
                <>
                  <div
                    onClick={() => setShowInventory(false)}
                    className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
                  ></div>
                  <div className="bg-black border-1 z-1000 rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%]">
                    <Inventory />
                  </div>
                </>,
                document.body
              )}
          </>
        }
      />

      <FirstRowContainers
        leftData={
          <ListOfTasks
            allTasksClientCopy={allTasksClientCreatedAt}
            setAllTasksClient={setAllTasksClient}
          ></ListOfTasks>
        }
        rightData={<ListOfReminderTasks />}
        // leftTitle="Recently Created"
        // rightTitle="Reminders"
        //height={`h-[50dvh] custom-height-media`}
        height={`h-full`}
      ></FirstRowContainers>

      {/* <OverviewThreeSection /> */}
    </>
  );
}
