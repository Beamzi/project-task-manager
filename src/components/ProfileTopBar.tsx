"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import ChevronDown from "./icons/ChevronDown";
import DropDown from "./icons/DropDown";
import { ArrowRightEndOnRectangleIcon } from "@heroicons/react/24/outline";
interface Props {
  session: any;
}

export default function ProfileTopBar({ session }: Props) {
  const [showOptions, setShowOptions] = useState(false);
  console.log({ session });
  return (
    <div className=" relative flex justify-center items-center align-middle">
      <button
        className={`hover:text-rose-600 transition-all duration-300 flex ${
          showOptions && "text-rose-600"
        }`}
        onClick={() => setShowOptions(showOptions ? false : true)}
      >
        <ChevronDown isRendered={showOptions} />
        {session.user.name}
      </button>
      <DropDown isRendered={showOptions}>
        <li className="li-hover pointer-none">
          <button
            className=" w-full h-full text-left flex py-1 px-2"
            onClick={() => signOut()}
          >
            <ArrowRightEndOnRectangleIcon />
            Sign Out
          </button>
        </li>
      </DropDown>
      <Image
        className="rounded-full mx-2"
        src={session?.user?.image}
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
        alt="user profile picture"
      ></Image>
    </div>
  );
}
