"use client";
import React from "react";
import Fuse, { Expression } from "fuse.js";
import Task from "../Task";
import { TasksForSorting } from "@/app/inbox/page";

interface Props {
  currentTasks: TasksForSorting[];
  searching: string | Expression;
}
export default function ListOfSearchTasks({ currentTasks, searching }: Props) {
  const fuse = new Fuse(currentTasks, {
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
            ></Task>
          ))
      )}
    </>
  );
}
