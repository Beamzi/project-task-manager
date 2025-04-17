"use client";
import { DashBoardContext } from "@/context/DashBoardContext";
import { Bars3Icon } from "@heroicons/react/16/solid";
import { useContext, useState } from "react";

export default function Header({ className }: { className: string }) {
  const [localSideMenu, setLocalSideMenu] = useState(false);
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard globals not loaded");
  }

  const { sideMenu, setSideMenu } = context;

  return (
    <div className={className}>
      <Bars3Icon
        onClick={() =>
          sideMenu === "visible"
            ? setSideMenu("invisible")
            : setSideMenu("visible")
        }
        className="w-20"
      ></Bars3Icon>
    </div>
  );
}
