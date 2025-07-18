import React from "react";

interface Props {
  data: React.ReactElement;
  title?: string;
  width?: string | undefined;
  height?: string;
  scrollYDisable?: boolean;
  xlWidth?: string;
  isCenterCard?: boolean;
  disabled?: boolean;
}
const localHeight = "h-[40dvh]";

export default function CardContainer({
  data,
  title,
  width,
  height,
  scrollYDisable,
  xlWidth,
  isCenterCard,
  disabled,
}: Props) {
  const now = new Date();

  console.log(now.getTime());
  return (
    <>
      <div
        className={`${
          disabled && "invisible md:visible absolute md:relative top-0 left-0  "
        } ${
          isCenterCard &&
          "md:px-[clamp(16px,2vw,24px)] pl-[clamp(16px,2vw,24px)] "
        } w-full flex flex-1 flex-col h-full min-h-0 ${
          xlWidth ? xlWidth : "2xl:w-[70%] xl:w-[80%]"
        } bg-transparent justify-center ${
          !title && "pt-[clamp(16px,2vw,24px)]"
        }`}
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
              className={`relative z-10 rounded-2xl border-1 first-row-containers outline-5 -outline-offset-6 outline-neutral-900 p-2 flex w-full flex-wrap ${
                scrollYDisable ? "" : "overflow-y-auto "
              } content-start  ${height ? height : localHeight}`}
            >
              {data}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
