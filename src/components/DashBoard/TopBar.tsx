import React from "react";
import Image from "next/image";

import { LuGithub } from "react-icons/lu";
import { LuMailCheck } from "react-icons/lu";
import { LuShare2 } from "react-icons/lu";

export default async function TopBar({ className }: { className: string }) {
  return (
    <div className={`h-full flex justify-between ${className} `}>
      <div className="flex">
        <Image
          className="h-full w-full pl-5 pr-3 py-3 "
          src="/logo/2.svg"
          style={{ objectFit: "contain" }}
          alt="logo"
          width={60}
          height={60}
          priority
        />
        <div className="h-full flex align-middle flex-col justify-center">
          <h3 className="min-w-50">Welcome to Manaboard!</h3>
        </div>
      </div>
      <div className="flex items-center pr-4">
        <div className="flex h-full align-middle justify-center items-center content-center my-1 text-sm">
          Share
          <LuShare2 className="w-5 h-5 ml-1 " />
          <LuGithub className="w-5 h-5 mx-2" />
          <LuMailCheck className="w-5 h-5 mr-2" />
        </div>
      </div>
    </div>
  );
}
