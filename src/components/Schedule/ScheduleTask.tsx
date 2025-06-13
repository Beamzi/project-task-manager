"use client";
import React, { useContext, useEffect } from "react";
import { format } from "date-fns";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CheckCircleIcon, PencilIcon } from "@heroicons/react/24/outline";
import NewTask from "../NewTask";
import { TaskContext } from "@/context/TaskContext";
import RemoveTaskBtn from "../buttons/RemoveTaskBtn";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import Task from "../Task";

export interface Props {
  dateId?: string;
  id?: string;
  title: string;
  date: Date;
  content: string | null;
  overDue?: boolean;
  taskDates: string[];
  dateIndex: number;
  isReminderView?: boolean;
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
  isReminderView,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [fixedDate, setFixedDate] = useState<Date>();
  const [hoverBtns, setHoverBtns] = useState(false);
  const [showTask, setShowTask] = useState(false);

  const dueDate = format(new Date(date), "yyyy-MM-dd");
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const dateForDisplay = date.toString().slice(0, 10);

  const tasksContext = useContext(TaskContext);
  if (!tasksContext) throw new Error("tasks not loaded");

  const [hideInClient, setHideInClient] = useState(false);
  const { setAllTasksClient, allTasksClient } = tasksContext;

  // const setAllTasksClientCopy = [...allTasksClient];

  const getDate = () => {
    const date =
      dueDate === currentDate ? `Today ${dateForDisplay}` : `${dateForDisplay}`;
    return date;
  };

  return (
    <div className="overflow-hidden w-full border-b-1 border-dotted  ">
      {!overDue ? (
        <>
          {taskDates[dateIndex] !== taskDates[dateIndex - 1] && (
            <h3
              id={dateId}
              className={`font-bold  ${
                isReminderView && "bg-neutral-900/70"
              }  py-1 px-5 border-b-1 border-dotted rounded-md`}
            >
              {getDate()}
            </h3>
          )}
        </>
      ) : (
        <>
          {taskDates[dateIndex] !== taskDates[dateIndex - 1] && (
            <h3 className=" py-1 px-5 border-b-1 border-dotted bg-neutral-900">
              Overdue
            </h3>
          )}
        </>
      )}

      <div
        onMouseEnter={() => setHoverBtns(true)}
        onMouseLeave={() => setHoverBtns(false)}
        className={`flex  hover:bg-neutral-900/20 relative align-center h-full w-full`}
      >
        <div className="pt-3 px-3 h-full w-full wrap-normal text-neutral-500">
          <div className="[&>*]:mr-2 flex relative">
            <CheckCircleIcon className={`stroke-neutral-300 min-w-5`} />
            <span
              className={`block text-neutral-400 [&>*]:mr-2 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-70 lg:max-w-60 md:max-w-25`}
            >
              {title}
            </span>
          </div>

          <div className="absolute right-0 top-0 flex mx-2 pt-2 ">
            {hoverBtns && (
              <div
                onClick={() => setShowTask(true)}
                className="ml-1 py-1 min-w-10 items-center content-center border-1 rounded-md relative px-2 flex  justify-center z-2 traition-all duration-100 hover:[&>*]:fill-rose-600 "
              >
                <PencilIcon className="min-w-5" />
              </div>
            )}

            <RemoveTaskBtn
              id={id}
              setHideInClient={setHideInClient}
              setAllTasksClient={setAllTasksClient}
            ></RemoveTaskBtn>
          </div>
          <p
            className={`block pl-7 pb-2 text-neutral-400  xl:max-w-85 lg:max-w-80 md:max-w-40  overflow-hidden whitespace-nowrap text-ellipsis`}
          >
            {content}
          </p>
          {!overDue ? (
            <>
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

          {showTask && (
            <>
              <div
                className="fixed top-0 left-0 h-screen w-screen z-100 backdrop-blur-md"
                onClick={() => setShowTask(false)}
              ></div>
              <div className="fixed z-100 top-[50%] left-[50%] translate-[-50%] ">
                <div className="w-100 p-3 gradient-for-inner-containers rounded-xl border-1">
                  {allTasksClient
                    .filter((item) => item.id === id)
                    .map((item) => (
                      <Task
                        key={item.id}
                        title={item.title}
                        date={item.date}
                        content={item.content}
                        priority={item?.priority}
                        id={item.id}
                        projectId={item?.projectId}
                        setAllTasksClient={setAllTasksClient}
                        initMaximise={true}
                      ></Task>
                    ))}
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
