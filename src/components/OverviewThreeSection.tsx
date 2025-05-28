"use client";

import React, { useState } from "react";
import { GiNotebook } from "react-icons/gi";
import { GiBurningEmbers } from "react-icons/gi";
import Timer from "./Timer";
import Inventory from "./Inventory";
import { createPortal } from "react-dom";
import Analytics from "./Analytics";

export default function OverviewThreeSection() {
  const [showInventory, setShowInventory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);

  return (
    <div className="h-full w-full py-5 flex">
      <div className="w-1/3 flex  flex-col justify-center items-center h-full border-1 rounded-xl ml-5">
        <div></div>
        <GiBurningEmbers className="w-full h-10" />
        <p>Due Date Chart</p>
        <button
          onClick={() => setShowAnalytics(true)}
          className="bg-black py-1 px-1"
        >
          Start
        </button>

        {showAnalytics &&
          createPortal(
            <>
              <div
                onClick={() => setShowAnalytics(false)}
                className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
              ></div>
              <div className="bg-black border-1 z-1000 rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%]">
                <Analytics />
              </div>
            </>,
            document.body
          )}
        {/* <Timer /> */}
        {/* <p>{now.getTime()}</p> */}
      </div>
      <div className="w-1/3 flex  flex-col justify-center items-center h-full border-1 rounded-xl mx-5">
        <div></div>
        <GiNotebook className="w-full h-10" />
        <p>Quick Notes</p>
        <button className="bg-black py-1 px-1">new note</button>
      </div>
      <div className="w-1/3 flex  flex-col justify-center items-center h-full border-1 rounded-xl mr-5">
        <div></div>
        <GiBurningEmbers className="w-full h-10" />
        <p>Inventory</p>

        <button
          onClick={() => setShowInventory(showInventory ? false : true)}
          className="bg-black py-1 px-1"
        >
          check
        </button>
        {showInventory &&
          createPortal(
            <>
              <div
                onClick={() => setShowInventory(false)}
                className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
              ></div>
              <div className="bg-black border-1 z-1000 rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%]">
                <Inventory />
              </div>
            </>,
            document.body
          )}
      </div>
    </div>
  );
}
