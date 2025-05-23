"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronUpIcon } from "@heroicons/react/24/solid";

export default function ChevronUp({ isRendered }: { isRendered: boolean }) {
  return (
    <motion.div
      animate={isRendered ? { rotate: 0 } : { rotate: 180 }}
      transition={{ duration: 0.2 }}
      className="mr-2 w-5"
    >
      <ChevronUpIcon
        className={`text-white w-full h-full ${isRendered && "fill-white "}`}
      />
    </motion.div>
  );
}
