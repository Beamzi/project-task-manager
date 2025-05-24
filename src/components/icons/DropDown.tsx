"use client";

import React from "react";
import { motion } from "motion/react";

interface Props {
  isRendered: boolean;
  children: React.ReactNode;
}
export default function DropDown({ isRendered, children }: Props) {
  return (
    <>
      {isRendered && (
        <motion.ul
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1, transition: { duration: 0.1 } }}
          className="z-50 absolute top-10 left-0 border-t-1 origin-top bg-black shadow-2xl shadow-black border-r-3"
        >
          {children}
        </motion.ul>
      )}
    </>
  );
}
