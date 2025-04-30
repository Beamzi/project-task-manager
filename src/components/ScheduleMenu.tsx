"use client";

import React from "react";
import ScheduleMenuItems from "./ScheduleMenuItems";
import {
  eachDayOfInterval,
  format,
  interval,
  intervalToDuration,
} from "date-fns";
import { useEffect, useState, useContext } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import { count } from "console";
import { form } from "motion/react-client";

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
  const [inView, setInView] = useState("");
  const [sequence, setSequence] = useState(0);
  const [nextColumn, setNextColumn] = useState(0);

  const context = useContext(DashBoardContext);

  if (!context) {
    throw new Error("scrollDivRef not loaded");
  }
  const { scrollDivRef } = context;

  const getDateRange = eachDayOfInterval({
    start: new Date(),
    end: new Date(latestTask.date),
  });

  const formattedDates = getDateRange.map((date) => format(date, "yyyy-MM-dd"));

  useEffect(() => {
    const scrollingDiv = document.querySelector(".scrolling-container");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(entry.target.id);
            setSequence(formattedDates.indexOf(entry.target.id));
          }
        });
      },
      {
        threshold: 0.1,
        root: scrollingDiv,
        rootMargin: "0% 0px -90% 0px",
      }
    );

    formattedDates.forEach((date) => {
      const element = document.getElementById(date);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, []);

  const overflow = () => "overflow-x-hidden";

  return (
    <div>
      <div className="scroll-x-containers w-[70dvw] flex h-20">
        {formattedDates.map((date, i) => {
          const windowSize = 8;
          const windowStart = Math.floor(sequence / windowSize) * windowSize;
          const windowEnd = windowStart + windowSize;

          if (i >= windowStart && i < windowEnd)
            return (
              <button
                className={`border-2 min-w-20 flex ${
                  inView === date && "text-rose-600"
                }`}
                id={`${date}-horizontal`}
                onClick={(e) => {
                  setInView(date);
                  const el = document.getElementById(date);
                  el.scrollIntoView({
                    // behavior: "smooth",
                  });
                }}
                key={date}
              >{`${date}`}</button>
            );
        })}
      </div>

      <div className="flex justify-center py-1  ">
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

//className="scroll-x-containers w-[70dvw] flex overflow-x-scroll  h-20 overflow-y-hidden overflow-auto "

// onWheel={(e) => {
//   // here im handling the horizontal scroll inline, without the use of hooks
//   const strength = Math.abs(e.deltaY);
//   if (e.deltaY === 0) return;
//   const el = e.currentTarget;
//   if (
//     !(el.scrollLeft === 0 && e.deltaY < 0) &&
//     !(
//       el.scrollWidth - el.clientWidth - Math.round(el.scrollLeft) ===
//         0 && e.deltaY > 0
//     )
//   ) {
//     e.preventDefault();
//   }
//   el.scrollTo({
//     left: el.scrollLeft + e.deltaY,
//     // large scrolls with smooth animation behavior will lag, so switch to auto
//     behavior: strength > 70 ? "auto" : "smooth",
//   });
// }}
