"use client";

import React from "react";
import { useState } from "react";
import FirstRowContainers from "./Skeleton/FirstRowContainers";
import SortByButtons from "./buttons/SortByButtons";
import ListOfTasks from "./Lists/ListOfTasks";
import { TasksForSorting } from "@/app/inbox/page";
import ListOfSearchTasks from "./Lists/ListOfSearchTasks";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

interface Props {
  tasks: TasksForSorting[];
}

export default function InboxClient({ tasks }: Props) {
  const [action, setAction] = useState("");
  const [searching, setSearching] = useState("");

  const orderBy = (action: String, tasks: Props["tasks"]) => {
    const tasksCopy = [...tasks];
    switch (action) {
      case "dateDesc":
        return tasksCopy.sort((a, b) => a.date.getTime() - b.date.getTime());
      case "dateAsc":
        return tasksCopy.sort((a, b) => b.date.getTime() - a.date.getTime());
      default:
        return tasksCopy;
    }
  };

  return (
    <>
      <div className="w-full px-6 pt-6 xl:w-[80%]  ">
        <h3 className="px-2 text-xl py-2 border-b-1 border-dotted">Inbox</h3>
      </div>

      <div className="px-6 xl:px-7 w-full flex border- justify-center items-center content-center ">
        <div className="gradient-for-inner-containers border-1 outline-5 -outline-offset-6 outline-neutral-900 rounded-2xl  w-full flex px-6 mt-6  py-4 xl:w-[80%]">
          <div className="border-1 mx-2 flex flex-col justify-center items-center content-center text-center rounded-lg ">
            <MagnifyingGlassIcon className="mx-1 w-7 text-center " />
          </div>
          <input
            placeholder="Search..."
            value={searching}
            onChange={(e) => setSearching(e.target.value)}
            type="search"
            className="border-1 py-2 px-3 w-1/2 text-neutral-300 rounded-lg"
          ></input>
        </div>
      </div>
      <FirstRowContainers
        leftData={
          searching.length > 0 ? (
            <ListOfSearchTasks
              currentTasks={orderBy(action, tasks)}
              searching={searching}
            />
          ) : (
            <ListOfTasks currentTasks={orderBy(action, tasks)} />
          )
        }
        leftWidth="w-4/2"
        rightData={<SortByButtons setAction={setAction} />}
      ></FirstRowContainers>
    </>
  );
}
