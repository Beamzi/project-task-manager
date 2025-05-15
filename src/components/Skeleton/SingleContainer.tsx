import React from "react";

interface Props {
  data: React.ReactElement;
  title?: string;
  width?: string | undefined;
  height?: string;
  scrollYDisable?: boolean;
  xlWidth?: string;
}
const localHeight = "h-[40dvh]";

export default function SingleContainer({
  data,
  title,
  width,
  height,
  scrollYDisable,
  xlWidth,
}: Props) {
  return (
    <>
      <div
        className={`flex px-6 w-full ${
          xlWidth ? xlWidth : "xl:w-[80%]"
        } pt-6 bg-transparent justify-center`}
      >
        <div className={width ? width : `w-1/2`}>
          {title && (
            <p className="px-2 py-2  border-t-1 border-dotted">{title}</p>
          )}
          <div
            className={`rounded-2xl ${scrollYDisable ? "" : "overflow-hidden"}`}
          >
            <div
              id="task-scroll-container"
              className={`relative z-10 rounded-2xl  border-1 first-row-containers outline-5 -outline-offset-6 outline-neutral-900 p-2 flex w-full flex-wrap ${
                scrollYDisable ? "" : "overflow-y-scroll"
              } content-start min-h-[40dvh] ${height ? height : localHeight}`}
            >
              {data}
              {/* <ListOfTasks currentTasks={priorityTasks}></ListOfTasks>{" "} */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
