import React from "react";
import { GiNotebook } from "react-icons/gi";
import { GiBurningEmbers } from "react-icons/gi";
import Timer from "../Timer";

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
  const now = new Date();

  console.log(now.getTime());
  return (
    //pb-[clamp(16px,2vw,24px)]
    <>
      <div
        className={`px-[clamp(16px,2vw,24px)] w-full  flex flex-1 flex-col h-full min-h-0 ${
          xlWidth ? xlWidth : "2xl:w-[70%] xl:w-[80%]"
        } bg-transparent justify-center ${
          !title && "pt-[clamp(16px,2vw,24px)]"
        }`}

        // mb-[clamp(16px,2vw,24px)]
      >
        <div className={width ? width : `h-full w-2/2`}>
          {title && (
            <p className="px-2 py-2 border-t-1 border-dotted">{title}</p>
          )}
          <div
            className={`h-full rounded-2xl ${
              scrollYDisable ? "" : "overflow-hidden"
            }`}
          >
            <div
              id="task-scroll-container"
              className={`relative z-10 rounded-2xl border-1 first-row-containers outline-5 -outline-offset-6 outline-neutral-900 p-2 flex w-full flex-wrap   ${
                scrollYDisable ? "" : "overflow-y-auto "
              } content-start  ${height ? height : localHeight}`}
            >
              <div className="h-full w-full py-5 flex">
                <div className="w-1/3 flex  flex-col justify-center items-center h-full border-1 rounded-xl ml-5">
                  <div></div>
                  <GiBurningEmbers className="w-full h-10" />
                  <p>Sprint</p>
                  <Timer />
                  {/* <p>{now.getTime()}</p> */}
                  <button className="bg-black py-1 px-1">Start</button>
                </div>
                <div className="w-1/3 flex  flex-col justify-center items-center h-full border-1 rounded-xl mx-5">
                  <div></div>
                  <GiNotebook className="w-full h-10" />
                  <p>Quick Notes</p>
                  <button className="bg-black py-1 px-1">new note</button>
                </div>
                <div className="w-1/3 flex  flex-col justify-center items-center h-full border-1 rounded-xl mr-5">
                  <div></div>
                  <GiBurningEmbers className="w-full h-10" />
                  <p>Inventory</p>
                  <button className="bg-black py-1 px-1">check</button>
                </div>
              </div>

              {/* /////////////////////////////////////////////////////// */}
              {/* {data} */}
              {/* /////////////////////////////////////////////////////// */}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
