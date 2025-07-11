"use client";

import React from "react";
import Image from "next/image";
import { useState } from "react";
import { signOut } from "next-auth/react";
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
    <div className=" relative flex  justify-start items-center align-middle pt-1 pb-2">
      <Image
        className="rounded-full mx-1"
        src={session?.user?.image}
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
        //  loading="lazy"
        loading={undefined} // Explicitly set to undefined
        priority={true}
        alt="user profile picture"
      ></Image>
      <button
        className={`hover:text-rose-600 transition-all duration-300 flex ${
          showOptions && "text-rose-600"
        }`}
        onClick={() => setShowOptions(showOptions ? false : true)}
      >
        {session.user.name}
        <ChevronDown className="ml-2" isRendered={showOptions} />
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
    </div>
  );
}
