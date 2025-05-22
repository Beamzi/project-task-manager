"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useContext, useRef } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
interface Props {
  id: string;
  title: string;
  active: (value: string) => void;
}
const overflowEllipsis =
  "block overflow-hidden whitespace-nowrap text-ellipsis w-30";

export default function ProjectListBtn({ id, title, active }: Props) {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard props not loaded");
  }

  const { removeProjectFromDashboard } = context;
  const index = removeProjectFromDashboard.indexOf(id);

  return (
    <div className={`flex overflow-hidden w-[95%]`}>
      <div className={`border-l-2 pl-3 ml-4 border-neutral-600`}></div>

      <Link
        className={`${
          id === removeProjectFromDashboard[index] && "hidden"
        } ${overflowEllipsis} ${active(
          `/projects/${id}`
        )} text-start py-1 text-sm  text-neutral-400
        }`}
        href={`/projects/${id}`}
      >
        {title}
      </Link>
    </div>
  );
}
