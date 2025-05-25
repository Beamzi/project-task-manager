"use client";

import React, { useEffect } from "react";
import ScheduleTask from "./ScheduleTask";
import { format, parseISO } from "date-fns";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
import { useState, useRef, useContext } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { dateRange, ScheduleTasks } from "./helpers";

export default function ListOfScheduleTasks({ scheduleTasks }: ScheduleTasks) {
  const [overDue, isOverDue] = useState(true);

  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("scrollDivRef not loaded");
  }
  const { scrollDivRef } = context;

  const getDateRange = dateRange({ scheduleTasks });

  const taskDates = scheduleTasks?.map((item) =>
    format(new Date(item.date), "yyyy-MM-dd")
  );

  const formattedDates = getDateRange.map((date) => format(date, "yyyy-MM-dd"));

  const reformat = (date: string) => {
    let reformattedDate = parseISO(date);
    const output = format(reformattedDate, "EEE MMM d");
    return output;
  };

  return (
    <>
      <div ref={scrollDivRef} className="overflow-hidden ">
        <div>
          {scheduleTasks?.map(
            (item) =>
              item.date < new Date() && (
                <ScheduleTask
                  overDue={overDue}
                  key={item.id}
                  taskId={item.id}
                  title={item.title}
                  date={item.date}
                  content={item.content}
                ></ScheduleTask>
              )
          )}
        </div>

        {formattedDates.map((date, i) =>
          taskDates?.includes(date) ? (
            <div className="" key={date}>
              {scheduleTasks?.map((item) =>
                date === format(new Date(item.date), "yyyy-MM-dd") ? (
                  <ScheduleTask
                    key={item.id}
                    dateId={date}
                    title={item.title}
                    date={item.date}
                    content={item.content}
                  />
                ) : null
              )}
            </div>
          ) : (
            <div className="  bg-neutral-800 w-full" key={date}>
              <h3 id={date} className="font-bold py-2 px-5">
                {reformat(date)}
              </h3>
              <hr></hr>
              <div className="flex align-center h-full">
                <div className="py-5  px-5 h-full   wrap-normal text-neutral-500">
                  <button className="flex  [&>*]:mr-2">
                    <PlusIcon className="fill-neutral-100 w-5" />
                    new task
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>
    </>
  );
}
