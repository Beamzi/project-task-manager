import React from "react";
import SignInBtn from "../buttons/SignInBtn";
import { SignOutBtn } from "../buttons/SignOutBtn";

export default function TopBar({ className }: { className: string }) {
  return (
    <div
      className={`${className} flex justify-between align-middle content-center`}
    >
      <div className="h-full w-full scale-y-145 scale-x-100 p-2 border-x-1 bg-transparent z-1 absolute bottom-0 top-0 left-0 right-0"></div>

      <div className="h-full w-full scale-x-103 border-y-1 scale-y-102 bg-transparent z-1 absolute bottom-0 top-0 left-0 right-0"></div>

      <div></div>
      <div className="flex align-middle justify-center content-center px-2">
        <SignOutBtn></SignOutBtn>
        <SignInBtn></SignInBtn>
      </div>
    </div>
  );
}
