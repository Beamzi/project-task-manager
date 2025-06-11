"use client";

import React, { Dispatch, SetStateAction } from "react";
import ScheduleTask from "./ScheduleTask";
import { format, parseISO, endOfDay } from "date-fns";
import { PlusIcon } from "@heroicons/react/24/solid";
import { useState, useContext } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { dateRange } from "./helpers";
import NewTask from "../NewTask";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";

interface Props {
  allTasksClientCopy: getAllTasksTypeOf[];
  setAllTasksClient?: Dispatch<SetStateAction<getAllTasksTypeOf>>;
}

const endOfToday = new Date();
endOfToday.setHours(0, 0, 0, 0);

export default function ListOfScheduleTasks({ allTasksClientCopy }: Props) {
  const [overDue] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [clickedDate, setClickedDate] = useState<Date>();

  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("scrollDivRef not loaded");
  }
  const { scrollDivRef } = context;
  const getDateRange = dateRange(allTasksClientCopy);

  const taskDates = allTasksClientCopy?.map((item) =>
    format(new Date(item.date), "yyyy-MM-dd")
  );

  const formattedDates = getDateRange.map((date) => format(date, "yyyy-MM-dd"));
  const reformat = (date: string) => {
    const reformattedDate = parseISO(date);
    const output = format(reformattedDate, "EEE MMM d");
    return output;
  };

  const toDate = (date: string) => {
    const newDate = parseISO(date);
    return newDate;
  };

  return (
    <>
      <div ref={scrollDivRef} className="overflow-hidden ">
        <div>
          {allTasksClientCopy?.map(
            (item, index) =>
              item.date < endOfToday && (
                <ScheduleTask
                  overDue={overDue}
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  date={item.date}
                  content={item.content}
                  taskDates={taskDates}
                  dateIndex={index}
                ></ScheduleTask>
              )
          )}
        </div>
        {formattedDates.map((date) =>
          taskDates?.includes(date) ? (
            <div className="" key={date}>
              {allTasksClientCopy?.map((item, index) =>
                date === format(new Date(item.date), "yyyy-MM-dd") ? (
                  <ScheduleTask
                    key={item.id}
                    id={item.id}
                    dateId={date}
                    title={item.title}
                    date={item.date}
                    content={item.content}
                    taskDates={taskDates}
                    dateIndex={index}
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
                  <button
                    onClick={() => {
                      setShowForm(true);
                      setClickedDate(toDate(date));
                    }}
                    className="flex  [&>*]:mr-2"
                  >
                    <PlusIcon className="fill-neutral-100 w-5" />
                    new task
                  </button>
                </div>
              </div>
            </div>
          )
        )}
      </div>

      {showForm && (
        <NewTask setShowForm={setShowForm} fixedDate={clickedDate} />
      )}
    </>
  );
}
