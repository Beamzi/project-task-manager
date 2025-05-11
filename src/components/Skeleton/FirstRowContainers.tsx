import React from "react";

interface Props {
  leftData: React.ReactElement;
  rightData: React.ReactElement;
  leftTitle: string;
  rightTitle: string;
  height?: string;
}
const localHeight = "h-[40dvh]";

export default function FirstRowContainers({
  leftData,
  rightData,
  leftTitle,
  rightTitle,
  height,
}: Props) {
  return (
    <>
      <div className="flex px-6 w-full  xl:w-[80%]  pt-6 relative bg-transparent justify-center">
        <div className="border-1 border-dotted w-1/2  bg-neutral-900">
          <p className="px-2 py-2">{leftTitle}</p>
          <div
            id="task-scroll-container"
            className={`bg-neutral-800 flex w-ful flex-wrap overflow-y-scroll content-start min-h-[40dvh] ${
              height ? height : localHeight
            }`}
          >
            {leftData}
            {/* <ListOfTasks currentTasks={priorityTasks}></ListOfTasks>{" "} */}
          </div>
        </div>

        {/* lg:min-w-[36dvw] */}

        <div className="w-1/2 flex flex-col border-1 border-dotted ml-6 dark:bg-neutral-900">
          <p className="border-b-1 border-dotted px-2 py-2">{rightTitle}</p>
          <div
            className={`overflow-y-scroll overflow-x-hidden flex content-start flex-wrap  dark:bg-neutral-800 ${
              height ? height : localHeight
            } w-full`}
          >
            {rightData}
            {/* <ListOfReminderTasks /> */}
          </div>
        </div>
      </div>
    </>
  );
}
