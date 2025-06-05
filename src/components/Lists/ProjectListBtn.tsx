"use client";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useState, useContext, useRef } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { motion } from "motion/react";
interface Props {
  id: string;
  title: string;
  active: (value: string) => void;
  variantItems: any;
  variantLines: any;
}
const overflowEllipsis =
  "block overflow-hidden whitespace-nowrap text-ellipsis w-30";

export default function ProjectListBtn({
  id,
  title,
  active,
  variantItems,
  variantLines,
}: Props) {
  // const context = useContext(DashBoardContext);
  // if (!context) {
  //   throw new Error("dashboard props not loaded");
  // }

  // const { removeProjectFromDashboard } = context;
  // const index = removeProjectFromDashboard.indexOf(id);

  return (
    <div className="flex w-full">
      <motion.div
        variants={variantLines}
        className={`origin-top border-l-2 pl-3 ml-4 border-rose-600 `}
      ></motion.div>
      <motion.div
        variants={variantItems}
        className={`flex overflow-hidden w-[95%]`}
      >
        <Link
          className={`hover:text-rose-600 ${overflowEllipsis} ${active(
            `/projects/${id}`
          )} text-start py-1 text-sm  text-neutral-400
        }`}
          href={`/projects/${id}`}
        >
          {title}
        </Link>
      </motion.div>
    </div>
  );
}
