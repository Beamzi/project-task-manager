"use client";

import React from "react";
import ScheduleMenuItems from "./ScheduleMenuItems";
import {
  eachDayOfInterval,
  format,
  interval,
  intervalToDuration,
} from "date-fns";

interface Props {
  scheduleTasks:
    | {
        title: string;
        date: Date;
        content: string | null;
        id: string;
        published: boolean;
        authorId: string | null;
        projectId: string | null;
        priority: boolean;
        createdAt: Date;
      }[]
    | undefined;
}

// const futureDate = addDays(currentDate, 7); // Adds 7 days to the current date

export default function ScheduleMenu({ scheduleTasks }: Props) {
  const latestTask = scheduleTasks?.[scheduleTasks.length - 1];

  const getDateRange = eachDayOfInterval({
    start: new Date(),
    end: new Date(latestTask.date),
  });

  const formattedDates = getDateRange.map((date) => format(date, "yyyy-MM-dd"));

  const taskDates = scheduleTasks?.map((item) =>
    format(new Date(item.date), "yyyy-MM-dd")
  );

  return (
    <div>
      <div
        className="scroll-x-containers w-[70dvw] flex overflow-x-scroll  h-20 overflow-y-hidden overflow-auto "
        onWheel={(e) => {
          // here im handling the horizontal scroll inline, without the use of hooks
          const strength = Math.abs(e.deltaY);
          if (e.deltaY === 0) return;
          const el = e.currentTarget;
          if (
            !(el.scrollLeft === 0 && e.deltaY < 0) &&
            !(
              el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) ===
                0 && e.deltaY > 0
            )
          ) {
            e.preventDefault();
          }
          el.scrollTo({
            left: el.scrollLeft + e.deltaY,
            // large scrolls with smooth animation behavior will lag, so switch to auto
            behavior: strength > 70 ? "auto" : "smooth",
          });
        }}
      >
        {formattedDates.map((date) => {
          return (
            <button
              id={`${date}-horizontal`}
              onClick={(e) => {
                const el = document.getElementById(date);
                el.scrollIntoView({
                  behavior: "smooth",
                });
              }}
              className="border-2 min-w-30 flex"
              key={date}
            >{`${date}`}</button>
          );
        })}
      </div>

      <div className="flex justify-center py-1 ">
        {scheduleTasks?.map((item) => {
          return (
            <ScheduleMenuItems
              key={item.id}
              date={item.date}
              title={item.title}
              taskId={item.id}
              content={item.content}
            ></ScheduleMenuItems>
          );
        })}
      </div>
      <hr></hr>
    </div>
  );
}
