"use client";

import React, { useState } from "react";
import { GiDuration, GiPencil, GiStack } from "react-icons/gi";
import { GiBurningEmbers } from "react-icons/gi";
import Timer from "./Timer";
import Inventory from "./Inventory";
import { createPortal } from "react-dom";
import Analytics from "./Analytics";
import PersonalNotes from "./PersonalNotes";
import ThreeSection from "./Skeleton/ThreeSection";
import CardContainer from "./Skeleton/CardContainer";

export default function OverviewThreeSection() {
  const [showInventory, setShowInventory] = useState(false);
  const [showAnalytics, setShowAnalytics] = useState(false);
  const [showNotes, setShowNotes] = useState(false);
  return (
    <>
      <ThreeSection
        height="h-full"
        data={
          <>
            <CardContainer
              data={
                <>
                  <button
                    onClick={() => setShowAnalytics(true)}
                    className="w-full flex flex-col justify-center items-center h-full"
                  >
                    <GiDuration className="w-full h-10" />
                    <p>Time Chart</p>
                  </button>
                  {showAnalytics &&
                    createPortal(
                      <>
                        <div
                          onClick={() => setShowAnalytics(false)}
                          className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%]  left-[50%] z-999 w-full h-full translate-[-50%]`}
                        ></div>
                        <div className="gradient-for-inner-containers scale-65 md:scale-90 border-1 z-1000 rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%]">
                          <Analytics />
                        </div>
                      </>,
                      document.body
                    )}
                </>
              }
              height="h-full"
            />

            <CardContainer
              isCenterCard={true}
              data={
                <>
                  <button
                    onClick={() => setShowNotes(true)}
                    className="w-full flex flex-col justify-center items-center h-full"
                  >
                    <GiPencil className="w-full h-10" />
                    <p>Quick Notes</p>
                  </button>
                  {showNotes &&
                    createPortal(
                      <>
                        <div
                          onClick={() => setShowNotes(false)}
                          className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
                        ></div>
                        <div className=" gradient-for-inner-containers border-1 z-1000 h-[80vh] rounded-xl p-5 fixed top-[50%] left-[50%] translate-[-50%]">
                          <PersonalNotes />
                        </div>
                      </>,
                      document.body
                    )}
                </>
              }
              height="h-full"
            />

            <CardContainer
              disabled={true}
              data={
                <>
                  <button
                    onClick={() =>
                      setShowInventory(showInventory ? false : true)
                    }
                    className="w-full  flex flex-col justify-center items-center h-full"
                  >
                    <GiStack className="w-full h-10" />
                    <p>Inventory</p>
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
                </>
              }
              height="h-full
"
            />
          </>
        }
      />
    </>
  );
}
