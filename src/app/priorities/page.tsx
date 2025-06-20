"use client";

import React, { useContext, useState } from "react";
import ListOfTasks from "@/components/Lists/ListOfTasks";
import FirstRowContainers from "@/components/Skeleton/FirstRowContainers";
import PersonalNotes from "@/components/PersonalNotes";
import { SessionContext } from "@/context/SessionContext";
import { TaskContext } from "@/context/TaskContext";
import { LuTimerReset } from "react-icons/lu";
import TopBarContainer from "@/components/Skeleton/TopBarContainer";
import Analytics from "@/components/Analytics";
import { createPortal } from "react-dom";

export default function Priorities() {
  const tasksContext = useContext(TaskContext);
  const session = useContext(SessionContext);

  if (!tasksContext || !session) {
    throw new Error("context not loaded - priorities");
  }

  const [showAnalytics, setShowAnalytics] = useState(false);

  const { setAllTasksClient, allTasksClient } = tasksContext;
  const allTasksClientCopy = [...allTasksClient];

  const priorityFilter = allTasksClientCopy.filter(
    (item) => item.priority === true
  );

  return (
    <>
      <TopBarContainer
        title="Priority Tasks & Notes"
        data={
          <>
            <button
              onClick={() => setShowAnalytics(true)}
              className=" flex flex-col justify-center items-center  anim h-full border-1 p-1 rounded-md ml-1"
            >
              <LuTimerReset className="w-full h-6 " />
            </button>
            {showAnalytics &&
              createPortal(
                <>
                  <div
                    onClick={() => setShowAnalytics(false)}
                    className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%]  left-[50%] z-999 w-full h-full translate-[-50%]`}
                  ></div>
                  <div className="gradient-for-inner-containers md:w-1/2 w-[calc(100dvw-20px)] md:max-w-150 border-1 z-1000 rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%] ">
                    <Analytics />
                  </div>
                </>,
                document.body
              )}
          </>
        }
      />

      <FirstRowContainers
        rightId={true}
        leftData={
          <ListOfTasks
            isPriority={true}
            allTasksClientCopy={priorityFilter}
            setAllTasksClient={setAllTasksClient}
          ></ListOfTasks>
        }
        rightScrollYDisable={true}
        rightData={<PersonalNotes />}
        height="h-full"
        ifBottomRow={true}
        // leftTitle="Priority Tasks"
        // rightTitle="Personal Notes"
      ></FirstRowContainers>
    </>
  );
}
