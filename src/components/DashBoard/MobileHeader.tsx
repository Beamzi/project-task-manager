"use client";
import { DashBoardContext } from "@/context/DashBoardContext";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { useContext, useState } from "react";
import Image from "next/image";

import { motion } from "motion/react";

export default function MobileHeader({ className }: { className: string }) {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard globals not loaded");
  }

  const { sideMenu, setSideMenu } = context;

  return (
    <div className={`${className} flex space-around`}>
      <motion.button
        whileHover={{ scale: 1.2 }}
        whileTap={{ scale: 0.8 }}
        onClick={() => setSideMenu(sideMenu ? false : true)}
      >
        <Bars3Icon
          className={`w-20 p-5 ${sideMenu && "fill-rose-600"}`}
        ></Bars3Icon>
      </motion.button>

      <div className="w-full h-full pl-5 pr-5.5 py-3 flex justify-end">
        <Image
          className="h-full w-15"
          src="/logo/2.svg"
          style={{ objectFit: "contain" }}
          alt="logo"
          width={60}
          height={60}
          priority
        />
      </div>
    </div>
  );
}
