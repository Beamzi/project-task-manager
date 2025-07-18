import React from "react";
import Image from "next/image";

import { LuGithub } from "react-icons/lu";
import { LuMailCheck } from "react-icons/lu";
export default async function TopBar({ className }: { className: string }) {
  return (
    <div
      className={`h-full  min-h-[40px] flex justify-between text-neutral-200 ${className} `}
    >
      <div className="flex">
        <div className="w-[60px] h-full flex items-center justify-center pl-5 pr-3 py-3">
          <Image
            className="object-contain"
            src="/logo/2.svg"
            // style={{ objectFit: "contain" }}
            alt="logo"
            width={60}
            height={60}
            priority
          />
        </div>
        <div className="h-full flex align-middle flex-col justify-center">
          <h3 className="min-w-50">Welcome to Manaboard!</h3>
        </div>
      </div>
      <div className="flex items-center pr-4">
        <div className="flex h-full align-middle justify-center items-center content-center my-1 text-sm">
          <a
            target="_blank"
            href={"https://github.com/Beamzi"}
            className="hover:text-rose-600 transition-colors duration-200 hover:scale-110"
          >
            <LuGithub className="w-5 h-5 mx-2" />
          </a>
          <a
            target="_blank"
            href={"mailto:james@daymedia.com.au"}
            className="hover:text-rose-600 transition-colors duration-200 hover:scale-110"
          >
            <LuMailCheck className="w-5 h-5 mr-2" />
          </a>
        </div>
      </div>
    </div>
  );
}
