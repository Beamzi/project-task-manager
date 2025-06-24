"use client";

import React from "react";

import { PencilSquareIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { LuMinus } from "react-icons/lu";

interface Props {
  id?: string;
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
      className={`w-10 items-center content-center border-1  relative px-2 flex  justify-center transition-all duration-100 ${
        !minimise && "hover:[&>*]:scale-150 "
      } hover:[&>*]:fill-rose-600`}
    >
      {!minimise ? (
        <LuMinus className="transition-all duration-100 w-5 h-5"></LuMinus>
      ) : (
        <PencilSquareIcon className="absolute top transition-all duration-100" />
      )}
    </button>
  );
  1;
}
