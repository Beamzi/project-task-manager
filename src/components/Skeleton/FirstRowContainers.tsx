import React from "react";

interface Props {
  leftData: React.ReactElement;
  rightData: React.ReactElement;
  leftTitle: string;
  rightTitle: string;
}

export default function FirstRowContainers({
  leftData,
  rightData,
  leftTitle,
  rightTitle,
}: Props) {
  return (
    <>
      <div className="flex px-6 relative bg-transparent justify-center">
        <div className="border-1 border-dotted w-1/2 bg-neutral-900">
          <p className="px-2 py-2">{leftTitle}</p>
          <div
            id="task-scroll-container"
            className=" border-t-1 border-dotted bg-neutral-800 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[40dvh]"
          >
            {leftData}
            {/* <ListOfTasks currentTasks={priorityTasks}></ListOfTasks>{" "} */}
          </div>
        </div>

        <div className="w-1/2 flex flex-col border-1 border-dotted ml-6 dark:bg-neutral-900">
          <p className="border-b-1 border-dotted px-2 py-2">{rightTitle}</p>
          <div className="dark:bg-neutral-800 h-full w-full">
            {rightData}
            {/* <ListOfReminderTasks /> */}
          </div>
        </div>
      </div>
    </>
  );
}
