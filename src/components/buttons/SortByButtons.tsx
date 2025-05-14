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

const operations = [
  { type: "date", icon: <ClockIcon className="w-7" /> },
  { type: "createdAt", icon: <CalendarIcon className="w-7" /> },
  { type: "title", icon: <BarsArrowDownIcon className="w-7" /> },
  { type: "content", icon: <DocumentTextIcon className="w-7" /> },
  { type: "priority", icon: <FlagIcon className="w-7" /> },
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
    <div className="w-full">
      <ul className="flex flex-col py-6  justify-center items-center content-center  w-full">
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
