"use client";
import React from "react";
import { format } from "date-fns";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CheckCircleIcon } from "@heroicons/react/24/outline";

export interface Props {
  dateId: string;
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
  const dueDate = format(new Date(date), "yyyy-MM-dd");
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const dateForDisplay = date.toString().slice(0, 10);

  const getDate = () => {
    const date =
      dueDate === currentDate ? `Today ${dateForDisplay}` : `${dateForDisplay}`;
    return date;
  };

  return (
    <div className="overflow-hidden bg-neutral-800 w-full ">
      {!overDue ? (
        <>
          <h3 id={dateId} className="font-bold pb-3 pt-3 px-5">
            {getDate()}
          </h3>
          <hr></hr>
        </>
      ) : (
        <>
          <h3 className=" pb-3 pt-3 px-5">Overdue</h3>
          <hr></hr>
        </>
      )}

      <div className="flex align-center h-full w-full">
        <div className="pt-3 px-3 h-full wrap-normal text-neutral-500">
          <span className="flex wrap-normal [&>*]:mr-2 ">
            <CheckCircleIcon className="stroke-neutral-300 min-w-5 " />
            {title}
          </span>
          <p className="wrap-normal pl-7 pb-2">{content}</p>
          {!overDue ? (
            <>
              <hr className="pt-2"></hr>
              <button className="flex  [&>*]:mr-2">
                <PlusIcon className="fill-neutral-100 w-5 pb-3" />
                new task
              </button>
            </>
          ) : (
            <span className="text-red-700 ">{getDate()}</span>
          )}

          {/* {overDue && <h3 className="text-red-700">{getDate()}</h3>} */}
        </div>
      </div>
    </div>
  );
}
