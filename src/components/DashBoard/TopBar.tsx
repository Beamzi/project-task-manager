import React from "react";
import SignInBtn from "../buttons/SignInBtn";
import { SignOutBtn } from "../buttons/SignOutBtn";
import Image from "next/image";

export default function TopBar({ className }: { className: string }) {
  return (
    <div
      className={`${className} flex justify-between align-middle content-center`}
    >
      <div></div>
      <div className="flex border-2 align-middle justify-center content-center px-2">
        <SignOutBtn></SignOutBtn>
        <SignInBtn></SignInBtn>
      </div>
    </div>
  );
}
