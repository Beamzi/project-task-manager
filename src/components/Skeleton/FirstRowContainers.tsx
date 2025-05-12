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
      <div className=" flex px-6 w-full  xl:w-[80%] pt-6 bg-transparent justify-center">
        <div className=" w-1/2 ">
          <p className="px-2 py-2  border-t-1 border-dotted">{leftTitle}</p>
          <div className="rounded-2xl overflow-hidden">
            <div
              id="task-scroll-container"
              className={`relative z-10 rounded-2xl  border-1 first-row-containers outline-5 -outline-offset-6 outline-neutral-900 p-2   flex w-full flex-wrap overflow-y-scroll content-start min-h-[40dvh] ${
                height ? height : localHeight
              }`}
            >
              {leftData}
              {/* <ListOfTasks currentTasks={priorityTasks}></ListOfTasks>{" "} */}
            </div>
          </div>
        </div>

        {/* lg:min-w-[36dvw] */}

        <div className="w-1/2 flex flex-col ml-6">
          <p className=" bg-transparent border-t-1 border-dotted px-2 py-2">
            {rightTitle}
          </p>
          <div className="rounded-2xl overflow-hidden">
            <div
              className={`first-row-containers rounded-2xl  border-1 outline-5 p-2 -outline-offset-6 outline-neutral-900 overflow-y-scroll overflow-x-hidden flex  w-full content-start flex-wrap  dark:bg-neutral-800 ${
                height ? height : localHeight
              } w-full`}
            >
              {rightData}
              {/* <ListOfReminderTasks /> */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
