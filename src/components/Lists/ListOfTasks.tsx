"use client";

import React from "react";
import Task from "../Task";
import { format } from "date-fns";
import type { TaskType } from "@/context/TaskContext";

interface NewProps {
  currentTasks: TaskType[] | undefined;
}

interface Props {
  currentTasks:
    | ({
        author: {
          name: string | null;
        } | null;
      } & {
        id: string;
        title: string;
        date: Date;
        content: string | null;
      })[]
    | undefined;
}

export default function ListOfTasks({ currentTasks }: NewProps) {
  return (
    <div>
      {currentTasks?.map((item) => (
        <Task
          key={item.id}
          author={item.author?.name}
          title={item.title}
          date={format(new Date(item.date), "dd/MM/yyyy")}
          content={item.content}
          id={item.id}
        ></Task>
      ))}
    </div>
  );
}
