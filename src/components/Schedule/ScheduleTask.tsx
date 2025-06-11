"use client";
import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import NewTask from "../NewTask";
import { TaskContext } from "@/context/TaskContext";
import RemoveTaskBtn from "../buttons/RemoveTaskBtn";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

export interface Props {
  dateId?: string;
  id?: string;
  title: string;
  date: Date;
  content: string | null;
  overDue?: boolean;
  taskDates: string[];
  dateIndex: number;
}

export default function ScheduleTask({
  dateId,
  id,
  title,
  date,
  content,
  overDue,
  dateIndex,
  taskDates,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [fixedDate, setFixedDate] = useState<Date>();
  const dueDate = format(new Date(date), "yyyy-MM-dd");
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const dateForDisplay = date.toString().slice(0, 10);

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) throw new Error("tasks not loaded");

  const [hideInClient, setHideInClient] = useState(false);
  const { setAllTasksClient, allTasksClient } = tasksContext;

  const setAllTasksClientCopy = [...allTasksClient];

  const getDate = () => {
    const date =
      dueDate === currentDate ? `Today ${dateForDisplay}` : `${dateForDisplay}`;
    return date;
  };

  return (
    <div className="overflow-hidden w-full border-b-1 border-dotted relative ">
      {!overDue ? (
        <>
          {taskDates[dateIndex] !== taskDates[dateIndex - 1] && (
            <h3 id={dateId} className={`font-bold pt-3 px-5`}>
              {getDate()}
            </h3>
          )}
        </>
      ) : (
        <>
          <h3 className="pt-3 px-5">Overdue</h3>
        </>
      )}
      <div className="absolute right-0 top-0 mx-2 pt-2 ">
        <RemoveTaskBtn
          id={id}
          setHideInClient={setHideInClient}
          setAllTasksClient={setAllTasksClient}
        ></RemoveTaskBtn>
      </div>

      <div className="flex align-center h-full w-full">
        <div className="pt-3 px-3 h-full w-full wrap-normal text-neutral-500">
          <div className="[&>*]:mr-2 flex">
            <CheckCircleIcon className={`stroke-neutral-300 min-w-5`} />
            <span
              className={`block text-neutral-400 [&>*]:mr-2 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-70 lg:max-w-60 md:max-w-25`}
            >
              {title}
            </span>
          </div>
          <p
            className={`block pl-7 pb-2 text-neutral-400  xl:max-w-85 lg:max-w-80 md:max-w-40  overflow-hidden whitespace-nowrap text-ellipsis`}
          >
            {content}
          </p>
          {!overDue ? (
            <>
              {/* <hr className="pt-2"></hr> */}
              <button
                onClick={() => {
                  setFixedDate(date);
                  setShowForm(true);
                }}
                className="flex [&>*]:mr-2 hover:text-rose-600 transition-all duration-200 hover:[&>*]:stroke-white "
              >
                <PlusIcon className="fill-neutral-100 w-5 pb-3 transition-all duration-200 " />
                new task
              </button>
            </>
          ) : (
            <span className="block will-change-auto text-red-700 pb-3">
              {getDate()}
            </span>
          )}
          {showForm && (
            <NewTask setShowForm={setShowForm} fixedDate={fixedDate} />
          )}
        </div>
      </div>
    </div>
  );
}
