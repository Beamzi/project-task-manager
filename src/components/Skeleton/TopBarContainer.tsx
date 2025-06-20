import React, { ReactElement } from "react";

interface Props {
  title?: string;
  data?: ReactElement;
  isDashboard?: boolean;
}

export default function TopBarContainer({ data, title, isDashboard }: Props) {
  return (
    <section className="topbar-icons w-full pt-[clamp(8px,4vh,50px)] px-[clamp(16px,2vw,24px)] max-[330px]:px-3 2xl:w-[70%] xl:w-[80%]">
      <div
        className={`gradient-for-thin-containers border-1 ${
          !isDashboard && " flex justify-between"
        } rounded-xl h-full py-2 px-2 outline-4 -outline-offset-5 outline-neutral-900`}
      >
        {!isDashboard && (
          <div className="flex h-full align-middle pl-2 ">
            <h1 className="self-center">{title}</h1>
          </div>
        )}

        <div className=" flex justify-center items-center content-center px-2 py-1 rounded-lg mr-2">
          {data}
        </div>
      </div>
    </section>
  );
}
