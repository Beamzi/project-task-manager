"use client";

import React from "react";

import { MinusIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";

interface Props {
  id: string;
  setMinimise: (value: boolean) => void;
  minimise: boolean;
  setStatus: (value: string) => void;
  status: string;
}

export default function MinimiseTaskBtn({
  id,
  setMinimise,
  minimise,
  setStatus,
  status,
}: Props) {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("state not loaded");
  }
  const { globalMinimised, setGlobalMinimised } = context;

  return (
    <button
      onClick={() => {
        minimise ? setMinimise(false) : setMinimise(true);
        globalMinimised ? setGlobalMinimised(false) : setGlobalMinimised(true);
        status === "closed" ? setStatus("open") : setStatus("closed");
      }}
      className="w-10 border-1   relative px-2 flex  justify-center hover:border-x-5 transition-all duration-100 hover:[&>*]:scale-150 hover:[&>*]:fill-rose-600"
    >
      <MinusIcon className="absolute top -mt-[1px]  transition-all duration-100"></MinusIcon>
    </button>
  );
}
