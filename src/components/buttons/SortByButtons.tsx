"use client";

import React from "react";
import { useState } from "react";
import SortButton from "./SortButton";
import {
  CalendarIcon,
  ClockIcon,
  DocumentTextIcon,
  FlagIcon,
} from "@heroicons/react/24/outline";
import { BarsArrowDownIcon } from "@heroicons/react/24/solid";

import { LuClockAlert } from "react-icons/lu";
import { LuCalendar1 } from "react-icons/lu";
import { LuArrowDownNarrowWide } from "react-icons/lu";
import { LuBookOpenText } from "react-icons/lu";
import { LuClipboardPen } from "react-icons/lu";
import { LuBookmarkCheck } from "react-icons/lu";

const operations = [
  { type: "date", icon: <LuClockAlert className="w-full h-full " /> },
  { type: "createdAt", icon: <LuCalendar1 className="w-full h-full" /> },
  { type: "title", icon: <LuArrowDownNarrowWide className="w-full h-full" /> },
  { type: "content", icon: <LuClipboardPen className="w-full h-full" /> },
  { type: "priority", icon: <LuBookmarkCheck className="w-full h-full" /> },
];

export default function SortByButtons({
  setAction,
  setTypeInterpolate,
}: {
  setAction: (value: string) => void;
  setTypeInterpolate: (
    value: "title" | "content" | "date" | "createdAt" | "priority"
  ) => void;
}) {
  const [iconReset, setIconReset] = useState(0);
  const [toolTipIndex, setToolTipIndex] = useState(0);

  return (
    <div className="w-full px-1 pr-2">
      <ul className="flex flex-col py-6 justify-center items-center content-center  w-full">
        {operations.map((item, index) => (
          <SortButton
            key={`${item}${index}`}
            setAction={setAction}
            setTypeInterpolate={setTypeInterpolate}
            operation={item.type}
            icon={item.icon}
            setIconReset={setIconReset}
            iconReset={iconReset}
            btnIndex={index}
            toolTipIndex={toolTipIndex}
            setToolTipIndex={setToolTipIndex}
          ></SortButton>
        ))}
      </ul>
    </div>
  );
}
