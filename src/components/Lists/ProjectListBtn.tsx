"use client";

import Link from "next/link";
import { useContext } from "react";
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
  "block overflow-hidden whitespace-nowrap text-ellipsis w-40";

export default function ProjectListBtn({
  id,
  title,
  active,
  variantItems,
  variantLines,
}: Props) {
  const dashBoardProps = useContext(DashBoardContext);
  if (!dashBoardProps) {
    throw new Error("context not provided");
  }
  const { setSideMenu } = dashBoardProps;

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
          onClick={() => setSideMenu(false)}
        >
          {title}
        </Link>
      </motion.div>
    </div>
  );
}
