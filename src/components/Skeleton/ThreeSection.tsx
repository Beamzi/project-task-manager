import React from "react";
import { GiNotebook } from "react-icons/gi";
import { GiBurningEmbers } from "react-icons/gi";
import Timer from "../Timer";
import Inventory from "../Inventory";
import SingleContainer from "./SingleContainer";
import CardContainer from "./CardContainer";

interface Props {
  data: React.ReactElement;
  title?: string;
  width?: string | undefined;
  height?: string;
  scrollYDisable?: boolean;
  xlWidth?: string;
}
const localHeight = "h-[40dvh]";

export default function ThreeSection({
  data,
  title,
  width,
  height,
  scrollYDisable,
  xlWidth,
}: Props) {
  const now = new Date();

  return (
    //pb-[clamp(16px,2vw,24px)]
    <>
      <div
        className={`px-[clamp(16px,2vw,24px)] w-full  flex flex-1 ${
          height ? height : "h-full"
        } min-h-0 ${
          xlWidth ? xlWidth : "2xl:w-[70%] xl:w-[80%]"
        } bg-transparent justify-center ${!title && ""}`}
      >
        {data}
      </div>
    </>
  );
}
