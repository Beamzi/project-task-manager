"use client";
import React, { useEffect } from "react";
import { format } from "date-fns";
export interface Props {
  taskId: string;
  title: string;
  date: Date;
  content: string | null;
}

export default function ScheduleMenuItems({
  taskId,
  title,
  date,
  content,
}: Props) {
  const day = date.toString().slice(0, 3);
  const dayNum = date.toString().slice(7, 10);

  return (
    <button
      onClick={() => {
        const element = document.getElementById(taskId);
        element?.scrollIntoView({
          behavior: "smooth",
        });
      }}
      className="flex justify-center px-2"
    >{`${day + dayNum}`}</button>
  );
}
