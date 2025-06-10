"use client";

import React from "react";
import { useContext, useState } from "react";
import { TaskDueDateContext } from "@/context/TaskDueDateContext";
import ScheduleTask from "../Schedule/ScheduleTask";
import { GiFlyingTrout } from "react-icons/gi";
import { CalendarIcon, EyeIcon } from "@heroicons/react/24/outline";
import { TaskContext } from "@/context/TaskContext";
import Link from "next/link";

export default function ListOfReminderTasks() {
  // const tasksByDueDate = useContext(TaskDueDateContext);
  const [overDue] = useState(true);
  const [showForm, setShowForm] = useState(false);

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) throw new Error("tasks not loaded");
  const { setAllTasksClient, allTasksClient } = tasksContext;

  const tasksByDueDate = [
    ...allTasksClient.sort((a, b) => b.date.getTime() - a.date.getTime()),
  ];

  return (
    <>
      {tasksByDueDate.length === 0 && (
        <div className="flex flex-col justify-center items-center pt-31 h-full">
          <GiFlyingTrout className="h-10 w-10" />
          <p className="my-1 mb-2">You Have No Reminders</p>
          <Link
            href={"/schedule"}
            className="flex justify-center bg-neutral-600 py-2 hover:text-rose-600 hover:[&>*]:stroke-black px-2  rounded-lg duration-200 transition-all"
          >
            <CalendarIcon className="mr-1 duration-200 transition-all" />
            See Schedule
          </Link>
        </div>
      )}

      <div className="flex flex-wrap justify-center items-center content-center">
        {tasksByDueDate?.map(
          (item) =>
            item.date < new Date() && (
              <ScheduleTask
                overDue={overDue}
                key={item.id}
                // taskId={item.id}
                title={item.title}
                date={item.date}
                content={item.content}
              ></ScheduleTask>
            )
        )}
        {tasksByDueDate?.map(
          (item) =>
            item.date > new Date() && (
              <ScheduleTask
                key={item.id}
                // taskId={item.id}
                title={item.title}
                date={item.date}
                content={item.content}
              ></ScheduleTask>
            )
        )}
      </div>
    </>
  );
}
