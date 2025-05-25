import React from "react";
import Image from "next/image";
import { auth } from "../../../auth";
import ProfileTopBar from "../ProfileTopBar";

export default async function TopBar({ className }: { className: string }) {
  const session = await auth();

  return (
    <div
      className={`${className} flex justify-between align-middle content-center z-50`}
    >
      <div className="pointer-events-none md:h-full md:w-full md:scale-y-145 md:scale-x-100 md:p-2 md:border-x-1 md:bg-transparent md:z-1 md:absolute md:bottom-0 md:top-0 md:left-0 md:right-0"></div>
      <div className="pointer-events-none md:h-full md:w-full md:scale-x-103 md:border-y-1 md:scale-y-102 md:bg-transparent md:z-1 md:absolute md:bottom-0 md:top-0 md:left-0 md:right-0"></div>

      <div className="flex justify-center align-middle items-center h-12 text-center">
        <div className="w-full h-full pl-5 pr-3 py-3 ">
          <Image
            className="h-full w-full"
            src="/logo/2.svg"
            style={{ objectFit: "contain" }}
            alt="logo"
            width={60}
            height={60}
            priority
          />
        </div>
        <div>
          <h1 className="h-full text-lg">manaboard</h1>
        </div>
      </div>
      <div className="flex align-middle justify-center content-center px-2">
        <ProfileTopBar session={session}></ProfileTopBar>
      </div>
    </div>
  );
}

//promana

// width={500} height={500}
