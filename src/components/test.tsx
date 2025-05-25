"use client";
import React from "react";
import SignInBtn from "./buttons/SignInBtn";
import Image from "next/image";

export default function Test() {
  return (
    <main className="h-screen min-h-0 flex flex-col">
      <header className="z-2 gradient-for-thin-containers invisible relative md:h-12 h-0 md:border-y-1 w-full md:visible">
        <div
          className={` flex justify-between align-middle content-center z-50`}
        >
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
          <div className="flex align-middle justify-center content-center px-2"></div>
        </div>
      </header>
      <section className="flex border-1">
        <h1>welcome to Project-maasasdasdnager</h1>
        <button>signin</button>
        {/* <SignInBtn></SignInBtn> */}
      </section>
    </main>
  );
}
