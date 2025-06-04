"use client";
import React, { Dispatch, SetStateAction } from "react";
import Fuse, { Expression } from "fuse.js";
import Task from "../Task";
import { GetAllTasksByDueDateTypeOf } from "@/lib/queries/getAllTasksByDueDate";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

interface Props {
  allTasksClientCopy: GetAllTasksByDueDateTypeOf[];
  newTaskResponse?: getAllTasksTypeOf[];
  searching: string | Expression;
  setAllTasksClient: Dispatch<SetStateAction<getAllTasksTypeOf[]>>;
}
export default function ListOfSearchTasks({
  allTasksClientCopy,
  searching,
  setAllTasksClient,
}: Props) {
  const fuse = new Fuse(allTasksClientCopy, {
    keys: ["title"],
  });

  return (
    <>
      {fuse.search(searching).length < 1 ? (
        <div className="ml-1.5 flex justify-center w-full py-15 h-full ">
          <h2>No Tasks Found</h2>
        </div>
      ) : (
        fuse
          .search(searching)
          .map((item) => (
            <Task
              key={item.item.id}
              title={item.item.title}
              date={item.item.date}
              content={item.item.content}
              id={item.item.id}
              author={item.item?.author?.name}
              priority={item.item.priority}
              projectId={item.item.projectId}
              setAllTasksClient={setAllTasksClient}
            ></Task>
          ))
      )}
    </>
  );
}
