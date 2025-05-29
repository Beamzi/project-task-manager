"use client";
import React from "react";
import { format } from "date-fns";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";
import NewTask from "../NewTask";

export interface Props {
  dateId?: string;
  title: string;
  date: Date;
  content: string | null;
  overDue?: boolean;
}

export default function ScheduleTask({
  dateId,
  title,
  date,
  content,
  overDue,
}: Props) {
  const [showForm, setShowForm] = useState(false);
  const [fixedDate, setFixedDate] = useState<Date>();
  const dueDate = format(new Date(date), "yyyy-MM-dd");
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const dateForDisplay = date.toString().slice(0, 10);

  const getDate = () => {
    const date =
      dueDate === currentDate ? `Today ${dateForDisplay}` : `${dateForDisplay}`;
    return date;
  };

  return (
    <div className="overflow-hidden w-full border-b-1 border-dotted ">
      {!overDue ? (
        <>
          <h3 id={dateId} className={`font-bold pt-3 px-5`}>
            {getDate()}
          </h3>
        </>
      ) : (
        <>
          <h3 className="pt-3 px-5">Overdue</h3>
        </>
      )}

      <div className="flex align-center h-full w-full">
        <div className="pt-3 px-3 h-full w-full wrap-normal text-neutral-500">
          <div className="[&>*]:mr-2 flex">
            <CheckCircleIcon className={`stroke-neutral-300 min-w-5`} />
            <span
              className={`block [&>*]:mr-2 overflow-hidden whitespace-nowrap text-ellipsis xl:max-w-70 lg:max-w-60 md:max-w-25`}
            >
              {title}
            </span>
          </div>
          <p
            className={`block pl-7 pb-2  xl:max-w-85 lg:max-w-80 md:max-w-40  overflow-hidden whitespace-nowrap text-ellipsis`}
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
                className="flex [&>*]:mr-2"
              >
                <PlusIcon className="fill-neutral-100 w-5 pb-3" />
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
