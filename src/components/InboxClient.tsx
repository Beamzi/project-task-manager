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

interface Props {
  tasks: TasksForSorting[];
}

export default function InboxClient({ tasks }: Props) {
  const [action, setAction] = useState("");
  const [typeInterpolate, setTypeInterpolate] = useState<
    "title" | "content" | "date" | "createdAt" | "priority"
  >("date");
  const [searching, setSearching] = useState("");
  const [searchClick, setSearchClick] = useState(false);

  const searchRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   searchRef.current !== document.activeElement && setSearchClick(false);
  // }, [searchRef]);

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
      <div className="w-full px-6 pt-6 xl:w-[80%]  ">
        <h3 className="px-2 text-xl py-2 border-b-1 border-dotted">Inbox</h3>
      </div>
      <div className="px-6 xl:px-7 w-full flex border- justify-center items-center content-center ">
        <div className="gradient-for-inner-containers border-1 outline-5 -outline-offset-6 outline-neutral-900 rounded-2xl  w-full flex px-6 mt-6  py-4 xl:w-[80%]">
          <motion.div
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            onClick={() => {
              searchRef.current?.focus();
              setSearchClick(true);
            }}
            className={`${
              searchClick && "text-rose-600"
            } border-1 mx-2 flex flex-col justify-center items-center content-center text-center rounded-lg`}
          >
            <MagnifyingGlassIcon className="mx-1 w-7 text-center " />
          </motion.div>
          <motion.input
            whileFocus={{ scale: 0.95 }}
            onBlur={() => setSearchClick(false)}
            ref={searchRef}
            placeholder="Search..."
            value={searching}
            onChange={(e) => setSearching(e.target.value)}
            type="search"
            className="border-1 py-2 px-3 w-1/2 text-neutral-300 rounded-lg"
          ></motion.input>
        </div>
      </div>
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
