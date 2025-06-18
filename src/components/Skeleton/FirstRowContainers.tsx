"use client";

import { ChevronDoubleRightIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleLeftIcon } from "@heroicons/react/24/solid";
import React, { useState, useEffect } from "react";

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
  noExpand?: boolean;
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
  noExpand,
}: Props) {
  const [expand, setExpand] = useState(false);

  return (
    <>
      <div
        className={`flex px-[clamp(16px,2vw,24px)] max-[330px]:px-3  min-h-0 w-full ${
          ifBottomRow && "h-full "
        } 2xl:w-[70%] xl:w-[80%] bg-transparent justify-center ${
          !leftTitle && "pt-[clamp(16px,2vw,24px)]"
        }`}
      >
        <div
          onClick={() => setExpand(false)}
          className={
            leftWidth
              ? leftWidth
              : `min-h-0 md:w-1/2 w-1/8 ${
                  !noExpand && !expand && "w-full md:1/2 "
                }`
          }
        >
          <div
            className={`rounded-2xl flex-1 justify-center align-middle relative custom-top-accent flex-col h-full min-h-0 ${
              leftScrollYDisable ? "" : "overflow-hidden"
            }`}
          >
            <div
              id={`${leftId && "task-scroll-container"}`}
              className={` rounded-2xl border-1 first-row-containers outline-5 -outline-offset-6 outline-neutral-900 p-2 z-10  pb-31 flex w-full flex-wrap  ${
                !noExpand &&
                expand &&
                "!overflow-y-hidden md:!overflow-y-scroll"
              }  ${
                leftScrollYDisable
                  ? ""
                  : "min-h-0 overflow-y-scroll z-10 overflow-x-hidden"
              } content-start  ${height ? height : localHeight}`}
            >
              {!noExpand && (
                <div
                  className={`${
                    !noExpand && !expand && "hidden"
                  } md:hidden flex items-center pb-4 justify-center align-middle content-center w-full h-full absolute top-0 left-0`}
                >
                  <ChevronDoubleRightIcon className="w-7" />
                </div>
              )}

              <div
                className={`${
                  !noExpand &&
                  expand &&
                  "invisible md:visible  opacity-0 md:opacity-100"
                } w-full h-full`}
              >
                {leftData}
              </div>
              {/* {leftData} */}
              {/* <div className="w-full">{leftData}</div> */}
            </div>
          </div>
        </div>

        <div
          onClick={() => setExpand(true)}
          className={`${
            rightWidth
              ? rightWidth
              : `min-h-0 md:w-1/2 w-1/8 ${
                  !noExpand && expand && "w-full md:1/2 "
                }`
          } flex flex-col ml-[clamp(16px,2vw,24px)] max-[330px]:ml-3 `}
        >
          <div
            className={`rounded-2xl flex-1 relative flex-col h-full min-h-0 ${
              rightScrollYDisable ? "" : "overflow-hidden"
            }`}
          >
            <div
              id={`${rightId && "task-scroll-container"}`}
              className={`${
                rightScrollYDisable
                  ? ""
                  : "min-h-0 overflow-y-scroll z-10 overflow-x-hidden"
              } ${
                !noExpand &&
                !expand &&
                !rightScrollYDisable &&
                "!overflow-y-hidden md:!overflow-y-scroll"
              } first-row-containers rounded-2xl border-1 outline-5 p-2   -outline-offset-6 outline-neutral-900 flex w-full pb-31 content-start flex-wrap ${
                height ? height : localHeight
              } w-full`}
            >
              {!noExpand && (
                <div
                  className={`${
                    !noExpand && expand && "hidden"
                  } md:hidden flex pb-4 items-center justify-center align-middle content-center w-full h-full absolute top-0 left-0`}
                >
                  <ChevronDoubleLeftIcon className="w-7 " />
                </div>
              )}
              <div
                className={`${
                  !noExpand &&
                  !expand &&
                  "invisible md:visible opacity-0 md:opacity-100"
                } w-full h-full`}
              >
                {rightData}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
