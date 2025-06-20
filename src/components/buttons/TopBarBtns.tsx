"use client";

import React, { useState } from "react";
import TopBarContainer from "../Skeleton/TopBarContainer";
import { createPortal } from "react-dom";
import Analytics from "../Analytics";
import { LuPackageCheck, LuPencilLine, LuTimerReset } from "react-icons/lu";
import PersonalNotes from "../PersonalNotes";
import Inventory from "../Inventory";

export default function TopBarBtns() {
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  const [showInventory, setShowInventory] = useState(false);

  return (
    <TopBarContainer
      title="Recents & Reminders"
      data={
        <>
          <button
            onClick={() => setShowAnalytics(true)}
            className=" flex flex-col justify-center items-center  anim h-full border-1 p-1 rounded-md ml-1"
          >
            <LuTimerReset className="w-full h-6 " />
          </button>
          {showAnalytics &&
            createPortal(
              <>
                <div
                  onClick={() => setShowAnalytics(false)}
                  className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%]  left-[50%] z-999 w-full h-full translate-[-50%]`}
                ></div>
                <div className="gradient-for-inner-containers md:w-1/2 w-[calc(100dvw-20px)] md:max-w-150 border-1 z-1000 rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%] ">
                  <Analytics />
                </div>
              </>,
              document.body
            )}

          <button
            onClick={() => setShowNotes(true)}
            className=" flex flex-col justify-center items-center h-full border-1 p-1 rounded-md ml-1"
          >
            <LuPencilLine className="w-full h-6" />
          </button>
          {showNotes &&
            createPortal(
              <>
                <div
                  onClick={() => setShowNotes(false)}
                  className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-100 left-[50%] w-full h-full translate-[-50%]`}
                ></div>
                <div className=" w-[calc(100dvw-20px)] sm:w-100 lg:w-180 gradient-for-inner-containers border-1 z-1000 h-[80vh] rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%]">
                  <PersonalNotes />
                </div>
              </>,
              document.body
            )}
          <button
            onClick={() => setShowInventory(showInventory ? false : true)}
            className="flex flex-col justify-center items-center h-full border-1 p-1 rounded-md ml-1"
          >
            <LuPackageCheck className="w-full h-6" />
          </button>
          {showInventory &&
            createPortal(
              <>
                <div
                  onClick={() => setShowInventory(false)}
                  className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-100 left-[50%] w-full h-full translate-[-50%]`}
                ></div>
                <div className=" z-1000 rounded-xl fixed top-[50%] left-[50%] translate-[-50%]">
                  <Inventory setShowInventory={setShowInventory} />
                </div>
              </>,
              document.body
            )}
        </>
      }
    />
  );
}
