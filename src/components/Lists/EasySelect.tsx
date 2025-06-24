"use client";

import React, { useEffect, useState } from "react";
import { ChevronDoubleRightIcon } from "@heroicons/react/24/solid";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

import { project } from "@/context/ProjectContext";
interface NewProps {
  modelList: getAllTasksTypeOf[] | undefined | project[];
}

export default function EasySelect({ modelList }: NewProps) {
  const [selected, setSelected] = useState("");
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
        threshold: 0.5,
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
