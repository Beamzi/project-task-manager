"use client";
import React from "react";
import { useState } from "react";
import type { SVGProps } from "react";

import {
  ChevronDoubleDownIcon,
  ChevronDoubleUpIcon,
  ChevronDoubleLeftIcon,
} from "@heroicons/react/24/solid";

interface Props {
  setAction: (value: string) => void;
  operation: string;
  icon: React.ReactElement;
}

export default function SortButton({ setAction, operation, icon }: Props) {
  const [init, setInit] = useState(true);
  const [invertSort, setInvertSort] = useState(init);

  const handleInversion = (operation: string) => {
    setInvertSort(invertSort ? false : true);
    invertSort ? setAction(`${operation}Desc`) : setAction(`${operation}Asc`);
    setInit(false);
  };

  return (
    <>
      <li className="flex ">
        <button
          onClick={() => {
            handleInversion(`${operation}`);
          }}
          className="flex"
        >
          <div
            className={`border-1 mx-2 p-1 ${!invertSort && "text-rose-600"}`}
          >
            {icon}
          </div>
          <div className="border-1 p-1">
            {init ? (
              <ChevronDoubleLeftIcon className="w-7" />
            ) : invertSort ? (
              <ChevronDoubleDownIcon className="w-7" />
            ) : (
              <ChevronDoubleUpIcon className="w-7" />
            )}
          </div>
        </button>
      </li>
    </>
  );
}
