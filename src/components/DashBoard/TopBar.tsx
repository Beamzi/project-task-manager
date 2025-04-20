import React from "react";
import SignInBtn from "../buttons/SignInBtn";
import { SignOutBtn } from "../buttons/SignOutBtn";

export default function TopBar({ className }: { className: string }) {
  return (
    <div
      className={`${className} flex justify-between align-middle content-center`}
    >
      <div className="pointer-events-none md:h-full md:w-full md:scale-y-145 md:scale-x-100 md:p-2 md:border-x-1 md:bg-transparent md:z-1 md:absolute md:bottom-0 md:top-0 md:left-0 md:right-0"></div>

      <div className="pointer-events-none md:h-full md:w-full md:scale-x-103 md:border-y-1 md:scale-y-102 md:bg-transparent md:z-1 md:absolute md:bottom-0 md:top-0 md:left-0 md:right-0"></div>

      <div></div>
      <div className="flex align-middle justify-center content-center px-2">
        <SignOutBtn></SignOutBtn>
        <SignInBtn></SignInBtn>
      </div>
    </div>
  );
}
