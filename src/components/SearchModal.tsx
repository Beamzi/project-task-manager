"use client";
import React from "react";
import { useState, useContext } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { createPortal } from "react-dom";
import SearchClient from "./SearchClient";
import SingleContainer from "./Skeleton/SingleContainer";
import ListOfSearchTasks from "./Lists/ListOfSearchTasks";
import { AllTasksDueDateContext } from "@/context/AllTasksDueDateContext";
import { DashBoardContext } from "@/context/DashBoardContext";
import { TaskContext } from "@/context/TaskContext";

export default function SearchModal() {
  const tasks = useContext(TaskContext);
  if (!tasks) {
    throw new Error("context not provided");
  }

  const { setAllTasksClient, allTasksClient } = tasks;

  const [showSearch, setShowSearch] = useState(false);
  const [searching, setSearching] = useState("");

  return (
    <>
      <button onClick={() => setShowSearch(showSearch ? false : true)}>
        <MagnifyingGlassIcon />
        Search
      </button>
      {showSearch &&
        createPortal(
          <div>
            <div
              onClick={() => setShowSearch(false)}
              className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
            ></div>
            <div className="fixed md:w-120 min-w-80 top-[50%] left-[50%] z-100 translate-[-50%]">
              <SearchClient
                searching={searching}
                setSearching={setSearching}
                xlWidth="a"
                inputWidth="w-[calc(100%-4rem)]"
                autoFocus={true}
              />

              <SingleContainer
                data={
                  <ListOfSearchTasks
                    allTasksClientCopy={allTasksClient}
                    setAllTasksClient={setAllTasksClient}
                    searching={searching}
                  />
                }
                width="w-2/2"
                xlWidth="a"
              ></SingleContainer>
            </div>
          </div>,

          document.body
        )}
    </>
  );
}
