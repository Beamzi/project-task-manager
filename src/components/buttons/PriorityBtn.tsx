"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import { StarIcon as StarIconSolid } from "@heroicons/react/24/solid";
import { StarIcon as StarIconOutline } from "@heroicons/react/24/outline";
import { ChevronDownIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";

export default function PriorityBtn({
  id,
  priorityState,
}: {
  id: string;
  priorityState: boolean;
}) {
  const [localPriorityState, setLocalPriorityState] = useState(priorityState);
  const [toggleItem, setToggleItem] = useState("");
  const [unpriority, setUnpriority] = useState(false);
  async function makePriority(value: boolean) {
    try {
      await fetch("/api/priority-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ priority: value, id: id }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex w-2/4">
      <button
        className=" w-full flex justify-center ml-2"
        onClick={() => {
          makePriority(true);
          setLocalPriorityState(true);
        }}
      >
        {localPriorityState ? (
          <>
            <StarIconSolid className="ml-2" />
          </>
        ) : (
          <StarIconOutline className="ml-2" />
        )}
        {/* {localPriorityState ? "prioritised"  : "priority"} */}
      </button>
      {localPriorityState && (
        <ul
          onClick={() => {
            setUnpriority(true);
            toggleItem === "visible"
              ? setToggleItem("invisible")
              : setToggleItem("visible");
          }}
          className="bg-red-900 relative ml-1 p-2 text-center my-1 flex flex-col items-center justify-center"
        >
          <ChevronDownIcon className="ml-2" />
          {unpriority && (
            <li className={`${toggleItem} absolute top-0, -left-12 -bottom-13`}>
              <button
                className={`${toggleItem}`}
                onClick={() => {
                  setTimeout(() => {
                    setUnpriority(false);
                  }, 100);
                  makePriority(false);
                  setLocalPriorityState(false);
                }}
              >
                unprioritise?
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
