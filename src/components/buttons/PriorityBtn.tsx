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
    <div className="flex">
      <button
        className="bg-orange-900"
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
          className="bg-gray-800 mx-5 px-5"
        >
          X
          {unpriority && (
            <li>
              <button
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
