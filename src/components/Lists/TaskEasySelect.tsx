"use client";

import React, { useContext, useRef, useState } from "react";
import type { TaskType } from "@/context/TaskContext";
import Link from "next/link";
import { DashBoardContext } from "@/context/DashBoardContext";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

interface NewProps {
  tasks: TaskType[] | undefined;
}

export default function TaskEasySelect({ tasks }: NewProps) {
  const context = useContext(DashBoardContext);
  const [selected, setSelected] = useState("");

  // const { taskRef } = context;
  return (
    <div className="py-2">
      <div className="py-3">
        <h3 className="py-1">Tasks</h3>
        <hr></hr>
      </div>
      <ul className="">
        {tasks?.map((item) => (
          <li key={item.id} className="flex">
            <ChevronDoubleRightIcon className="" />
            <button
              className={`hover:text-rose-600 hover:scale-110 bg-transparent w-full text-start py-1 px-2 pr-5 ${
                selected === item.id && "text-rose-600"
              }`}
              onClick={() => {
                setSelected(item.id);
                const element = document.getElementById(item.id);
                element?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {item.title}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
