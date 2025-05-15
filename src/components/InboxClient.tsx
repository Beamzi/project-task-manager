"use client";

import React, { useEffect } from "react";
import { useState, useRef } from "react";
import FirstRowContainers from "./Skeleton/FirstRowContainers";
import SortByButtons from "./buttons/SortByButtons";
import ListOfTasks from "./Lists/ListOfTasks";
import { TasksForSorting } from "@/app/inbox/page";
import ListOfSearchTasks from "./Lists/ListOfSearchTasks";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { motion } from "motion/react";
import SearchClient from "./SearchClient";

interface Props {
  tasks: TasksForSorting[];
}

export default function InboxClient({ tasks }: Props) {
  const [action, setAction] = useState("");
  const [typeInterpolate, setTypeInterpolate] = useState<
    "title" | "content" | "date" | "createdAt" | "priority"
  >("date");
  const [searching, setSearching] = useState("");

  const orderBy = (
    action: string,
    typeInterpolate: "title" | "content" | "date" | "createdAt" | "priority",
    tasks: Props["tasks"]
  ) => {
    const tasksCopy = [...tasks];
    //just be aware of any type here
    if (action === "desc")
      tasksCopy.sort((a, b) =>
        typeInterpolate === "title" || typeInterpolate === "content"
          ? //for string coercing null to string
            (b[`${typeInterpolate}`] ?? "").localeCompare(
              a[`${typeInterpolate}`] ?? ""
            )
          : // for number or boolean
            (b[`${typeInterpolate}`] as any) - (a[`${typeInterpolate}`] as any)
      );
    else
      tasksCopy.sort((a, b) =>
        typeInterpolate === "title" || typeInterpolate === "content"
          ? (a[`${typeInterpolate}`] ?? "").localeCompare(
              b[`${typeInterpolate}`] ?? ""
            )
          : (a[`${typeInterpolate}`] as any) - (b[`${typeInterpolate}`] as any)
      );

    return tasksCopy;
  };

  return (
    <>
      <div className="w-full px-6 pt-6 xl:w-[80%]">
        <h3 className="px-2 text-xl py-2 border-b-1 border-dotted">Inbox</h3>
      </div>

      <SearchClient
        searching={searching}
        setSearching={setSearching}
        autoFocus={false}
      />
      <FirstRowContainers
        leftData={
          searching.length > 0 ? (
            <ListOfSearchTasks
              currentTasks={orderBy(action, typeInterpolate, tasks)}
              searching={searching}
            />
          ) : (
            <ListOfTasks
              currentTasks={orderBy(action, typeInterpolate, tasks)}
            />
          )
        }
        height="h-[60dvh]"
        leftWidth="w-4/2 xl:w-6/2"
        rightScrollYDisable={true}
        rightData={
          <SortByButtons
            setAction={setAction}
            setTypeInterpolate={setTypeInterpolate}
          />
        }
      ></FirstRowContainers>
    </>
  );
}
