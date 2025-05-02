"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";

import { project } from "@/context/ProjectContext";
import type { TaskType } from "@/context/TaskContext";
interface NewProps {
  modelList: TaskType[] | undefined | project[];
}

export default function EasySelect({ modelList }: NewProps) {
  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("Dashboard state not loaded");
  }

  const { globalMinimised } = context;
  const [selected, setSelected] = useState("");
  //const { taskRef } = context
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setSelected(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5, // adjust if needed
      }
    );

    modelList?.forEach((modelList) => {
      const el = document.getElementById(modelList.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="py-2  px-5 h-[100%] bg-neutral-900  ">
      <div className="py-3 bg-transparent">
        <h3 className="py-1 bg-transparent">Tasks</h3>
        <hr></hr>
      </div>
      <ul className="bg-transparent">
        {modelList?.map((item) => (
          <li key={item.id} className="flex bg-transparent ">
            <div className=""></div>

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
