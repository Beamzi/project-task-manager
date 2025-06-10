"use client";

import React, { Dispatch, SetStateAction, useState } from "react";
import Task from "../Task";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

import { PlusIcon } from "@heroicons/react/24/outline";
import { GiSalmon } from "react-icons/gi";
import { createPortal } from "react-dom";
import NewTask from "../NewTask";

interface NewProps {
  isPriority?: boolean;
  isAssigned?: boolean;
  projectId?: string;
  projectTitle?: string;
  allTasksClientCopy: getAllTasksTypeOf[];
  setAllTasksClient: Dispatch<SetStateAction<getAllTasksTypeOf[]>>;
}

export default function ListOfTasks({
  setAllTasksClient,
  allTasksClientCopy,
  isPriority,
  isAssigned,
  projectId,
  projectTitle,
}: NewProps) {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      {allTasksClientCopy.length === 0 && (
        <div className="flex flex-col justify-center items-center pt-31 h-full">
          <GiSalmon className="h-10 w-10" />
          <p className="my-1">{`You Have No ${
            (isPriority ? "Priority" : "") || (isAssigned ? "Assigned" : "")
          } Tasks`}</p>
          <p className="text-sm text-neutral-500 mb-2 w-70 text-center">
            {(isPriority && "Prioritise an existing task in your inbox, or") ||
              (isAssigned &&
                "Assign an existing task to this project from your inbox task menu, or")}
          </p>

          <button
            onClick={() => setShowForm(true)}
            className="flex justify-center bg-neutral-600 py-2 hover:text-rose-600 hover:[&>*]:stroke-black px-2  rounded-lg duration-200 transition-all"
          >
            <PlusIcon className="duration-200 transition-all" />
            {`${
              (isPriority ? "Prioritise a new Task" : "") ||
              (isAssigned ? "Assign a new Task" : "") ||
              (!isAssigned || !isPriority ? "Add a Task" : "")
            }`}
          </button>

          {showForm &&
            createPortal(
              <>
                {isAssigned && (
                  <NewTask
                    setShowForm={setShowForm}
                    isAssigned={true}
                    currentProjectId={projectId}
                    currentProjectTitle={projectTitle}
                  />
                )}
                {isPriority && (
                  <NewTask setShowForm={setShowForm} isPriority={true} />
                )}
                {!isAssigned && !isPriority && (
                  <NewTask setShowForm={setShowForm} />
                )}
              </>,
              document.body
            )}
        </div>
      )}

      {allTasksClientCopy.map((item) => (
        <Task
          key={item.id}
          title={item.title}
          date={item.date}
          content={item.content}
          priority={item?.priority}
          id={item.id}
          projectId={item?.projectId}
          setAllTasksClient={setAllTasksClient}
        ></Task>
      ))}
    </>
  );
}
