import React from "react";

interface Props {
  leftData: React.ReactElement;
  rightData: React.ReactElement;
  leftTitle?: string;
  rightTitle?: string;
  leftWidth?: string | undefined;
  rightWidth?: string;
  height?: string;
  leftScrollYDisable?: boolean;
  rightScrollYDisable?: boolean;
  ifBottomRow?: boolean;
  leftId?: boolean;
  rightId?: boolean;
}
const localHeight = "h-[40dvh]";

export default function FirstRowContainers({
  leftData,
  rightData,
  leftTitle,
  rightTitle,
  leftWidth,
  rightWidth,
  height,
  ifBottomRow,
  leftScrollYDisable,
  rightScrollYDisable,
  leftId,
  rightId,
}: Props) {
  return (
    // we usually put this next to h-full in ifbottomRow, but for now it's commented pb-[clamp(16px,2vw,24px)]
    <>
      <div className="flex w-full px-[clamp(16px,2vw,24px)] xl:w-[80%] ">
        {leftTitle && (
          <p className="px-2 w-full  text-start py-2 text-scaley-lg border-dotted">
            {leftTitle}
          </p>
        )}
        {rightTitle && (
          <p className="ml-[clamp(16px,2vw,24px)] text-scaley-lg bg-transparent  w-full border-dotted px-2 py-2">
            {rightTitle}
          </p>
        )}
      </div>

      <div
        className={`flex px-[clamp(16px,2vw,24px)] min-h-0 w-full ${
          ifBottomRow && "h-full "
        } xl:w-[80%] bg-transparent justify-center ${
          !leftTitle && "pt-[clamp(16px,2vw,24px)]"
        }`}
      >
        <div className={leftWidth ? leftWidth : `min-h-0 w-1/2`}>
          <div
            className={`rounded-2xl flex-1 justify-center align-middle relative custom-top-accent  flex-col h-full min-h-0 ${
              leftScrollYDisable ? "" : "overflow-hidden"
            }`}
          >
            {/* down-light-shadow  */}
            <div className="absolute z-15 bg-neutral-800 border-neutral-900 scale-x-99  border-t-5 border-x-4 rounded-t-2xl left-0 top-[1px] h-6  w-full"></div>
            <div
              id={`${leftId && "task-scroll-container"}`}
              className={` pt-4 rounded-2xl border-1 first-row-containers outline-5 -outline-offset-6 outline-neutral-900 p-2 z-10  pb-31 flex w-full flex-wrap ${
                leftScrollYDisable
                  ? ""
                  : "min-h-0 overflow-y-scroll z-10 overflow-x-hidden"
              } content-start  ${height ? height : localHeight}`}
            >
              {leftData}
            </div>
          </div>
        </div>

        <div
          className={`${
            rightWidth ? rightWidth : "min-h-0 w-1/2 "
          } flex flex-col ml-[clamp(16px,2vw,24px)]`}
        >
          <div
            className={`rounded-2xl flex-1 relative  flex-col h-full min-h-0 ${
              rightScrollYDisable ? "" : "overflow-hidden"
            }`}
          >
            <div
              id={`${rightId && "task-scroll-container"}`}
              className={`${
                rightScrollYDisable
                  ? ""
                  : "min-h-0 overflow-y-scroll z-10 overflow-x-hidden"
              } first-row-containers rounded-2xl border-1 outline-5 p-2 -outline-offset-6 outline-neutral-900 flex w-full pb-31 content-start flex-wrap   ${
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
