"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
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
  const [unpriority, setUnpriority] = useState(false);
  const router = useRouter();
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
        className=" w-full"
        onClick={() => {
          makePriority(true);
          setLocalPriorityState(true);
        }}
      >
        {localPriorityState ? "prioritised" : "priority"}
      </button>
      {localPriorityState && (
        <ul
          onClick={() => {
            setUnpriority(true);
          }}
          className="bg-red-900 ml-1 p-2 text-center my-1"
        >
          X
          {unpriority && (
            <li className="">
              <button
                className=""
                onClick={() => {
                  setTimeout(() => {
                    setUnpriority(false);
                  }, 100);
                  makePriority(false);
                  setLocalPriorityState(false);
                }}
              >
                unprioritise
              </button>
            </li>
          )}
        </ul>
      )}
    </div>
  );
}
