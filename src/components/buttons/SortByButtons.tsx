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
}: {
  setAction: (value: string) => void;
}) {
  return (
    <div className="w-full">
      <ul className="flex flex-col py-6 ml-0.5 justify-center items-center content-center  w-full">
        {operations.map((item, index) => (
          <SortButton
            key={`${item}${index}`}
            setAction={setAction}
            operation={item.type}
            icon={item.icon}
          ></SortButton>
        ))}
      </ul>
    </div>
  );
}
