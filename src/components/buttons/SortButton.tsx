"use client";
import React from "react";
import { useState } from "react";
import type { SVGProps } from "react";

import { motion } from "motion/react";
import { LuArrowBigDownDash } from "react-icons/lu";
import { LuArrowBigUpDash } from "react-icons/lu";
import { LuArrowBigLeftDash } from "react-icons/lu";

import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";

const buttonclasses =
  "hover:scale-120 transition-all duration-200 hover:text-rose-600";

const toolTips = [
  "Sort By Due Date",
  "Sort From Date of Creation",
  "Sort By Title",
  "Sort By Content",
  "Sort By Priority",
];

interface Props {
  setAction: (value: string) => void;
  setTypeInterpolate: (
    value: "title" | "content" | "date" | "createdAt" | "priority"
  ) => void;
  operation: string;
  icon: React.ReactElement;
  setIconReset: (value: number) => void;
  iconReset: number;
  btnIndex: number;
  toolTipIndex: number;
  setToolTipIndex: (value: number) => void;
}

export default function SortButton({
  setAction,
  setTypeInterpolate,
  operation,
  icon,
  setIconReset,
  iconReset,
  btnIndex,
}: Props) {
  const [init, setInit] = useState(true);
  const [invertSort, setInvertSort] = useState(init);
  const [showToolTip, setShowToolTip] = useState(false);

  const handleInversion = (operation: string) => {
    setIconReset(btnIndex);
    setInit(false);

    setInvertSort(invertSort ? false : true);
    setTypeInterpolate(
      operation as "title" | "content" | "date" | "createdAt" | "priority"
    );
    invertSort ? setAction(`desc`) : setAction(`asc`);
  };

  return (
    <>
      <li className="flex relative   ">
        {showToolTip && (
          <div className="absolute top-0 -left-35 z-100 bg-black p-5 w-30 rounded-xl border-1">
            {toolTips[btnIndex]}
          </div>
        )}

        <button
          onClick={() => {
            handleInversion(`${operation}`);
          }}
          className="flex justify-center items-center h-full p-1 rounded-md ml-1"
        >
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            onMouseEnter={() => setShowToolTip(true)}
            onMouseLeave={() => setShowToolTip(false)}
            className={`border-1 w-8 h-8 max-[440px]:border-0 max-[400px]:scale-80 max-[315px]:scale-70 my-1 md:mr-1 rounded-xl p-1  transition-colors [&>*] hover:text-rose-600 ${
              iconReset === btnIndex ? "text-rose-600" : "text-neutral-400"
            }`}
          >
            {icon}
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.8 }}
            className={`transition-colors  invisible lg:visible lg:relative absolute  hover:text-rose-600 border-1 my-1 p-1 ml-1 rounded-xl  ${
              iconReset === btnIndex && ""
            }`}
          >
            {iconReset !== btnIndex ? (
              <LuArrowBigLeftDash className=" w-6 h-6" />
            ) : init ? (
              <LuArrowBigLeftDash className="w-6 h-6" />
            ) : invertSort ? (
              <LuArrowBigDownDash className="w-6 h-6" />
            ) : (
              <LuArrowBigUpDash className="w-6 h-6" />
            )}
          </motion.div>
        </button>
      </li>
    </>
  );
}
