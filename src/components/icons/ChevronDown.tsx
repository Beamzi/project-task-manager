"use client";

import React from "react";
import { motion } from "motion/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";

export default function ChevronDown({
  isRendered,
  className,
}: {
  isRendered: boolean;
  className?: string;
}) {
  return (
    <motion.div
      animate={isRendered ? { rotate: 180 } : { rotate: 0 }}
      transition={{ duration: 0.2 }}
      className={`mr-2 w-5 ${className}`}
    >
      <ChevronDownIcon
        className={`text-white w-full h-full ${isRendered && "fill-white "}`}
      />
    </motion.div>
  );
}
