"use client";

import React, { Dispatch, SetStateAction } from "react";
import Task from "../Task";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { useContext, useEffect, useRef } from "react";
import { TaskContext } from "@/context/TaskContext";

interface NewProps {
  allTasksClientCopy: getAllTasksTypeOf[];
  setAllTasksClient: Dispatch<SetStateAction<getAllTasksTypeOf[]>>;
}

export default function ListOfTasks({
  setAllTasksClient,
  allTasksClientCopy,
}: NewProps) {
  return (
    <>
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
