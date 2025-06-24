"use client";
import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
export interface Props {
  taskId: string;
  title: string;
  date: Date;
  content: string | null;
  allTasksClientCopy: getAllTasksTypeOf[];
  setAllTasksClient: Dispatch<SetStateAction<getAllTasksTypeOf[]>>;
}

export default function ScheduleMenuItems({ date }: Props) {
  const day = date.toString().slice(0, 3);
  const dayNum = date.toString().slice(7, 10);

  const formDate = format(new Date(date), "yyyy-MM-dd");

  return (
    <button
      onClick={() => {
        const element = document.getElementById(formDate);
        element?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="flex justify-center px-2 "
    >{`${day + dayNum}`}</button>
  );
}
