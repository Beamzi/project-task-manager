"use client";

import React from "react";
import ScheduleMenuItems from "./ScheduleMenuItems";
import { format, parseISO } from "date-fns";
import { useEffect, useState, useContext, useRef } from "react";
import { DashBoardContext } from "@/context/DashBoardContext";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { CalendarDaysIcon } from "@heroicons/react/24/outline";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/24/solid";
import { dateRange, ScheduleTasks } from "./helpers";
import { map } from "motion/react-client";
import Task from "../Task";
import { arrayBuffer } from "stream/consumers";

export default function ScheduleMenu({ scheduleTasks }: ScheduleTasks) {
  const [inView, setInView] = useState("");
  const [sequence, setSequence] = useState(0);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [calendarOpen, setCalendarOpen] = useState(false);
  const [activeSequence, setActiveSequence] = useState(0);

  const context = useContext(DashBoardContext);

  if (!context) {
    throw new Error("scrollDivRef not loaded");
  }
  const { scrollDivRef } = context;
  const getDateRange = dateRange({ scheduleTasks });
  const formattedDates = getDateRange.map((date) => format(date, "yyyy-MM-dd"));

  const activeDates = () => {
    const extract = scheduleTasks?.map(
      (task) => `${format(new Date(task.date), "yyyy-MM-dd")}`
    );
    const result = extract?.filter(
      (date, index) => extract.indexOf(date) === index
    );
    return result;
  };
  const getActiveDates = activeDates();

  const prevActiveSequence = useRef<number>(0);

  useEffect(() => {
    const scrollingDiv = document.querySelector(".scrolling-container");
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(entry.target.id);
            setSequence(formattedDates.indexOf(entry.target.id));

            const newActiveSequence = getActiveDates?.indexOf(entry.target.id);

            if (newActiveSequence !== -1 && newActiveSequence !== undefined) {
              prevActiveSequence.current = newActiveSequence;
              setActiveSequence(newActiveSequence);
            } else {
              setActiveSequence(prevActiveSequence.current);
            }
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

  const handleCalendar = (date: Date | null) => {
    if (!date) return;
    setStartDate(date);
    setCalendarOpen(false);
    const validString = format(new Date(date), "yyyy-MM-dd");

    setInView(validString);
    const element = document.getElementById(validString);
    element?.scrollIntoView({
      behavior: "smooth",
    });
  };
  const inViewParse = parseISO(inView);

  const validParse = () =>
    inViewParse >= new Date()
      ? format(new Date(inViewParse), "eee d yyyy")
      : format(new Date(), "eee d yyyy");

  return (
    <div className="flex flex-col w-full border-t-1 relative">
      <div className="px-2 py-2 flex justify-between">
        <button
          className="flex w-30"
          onClick={() => {
            setCalendarOpen(calendarOpen ? false : true);
            if (inViewParse >= new Date()) {
              setStartDate(inViewParse);
            }
          }}
        >
          <CalendarDaysIcon className="mr-2" />
          {validParse()}
        </button>
        <h2>Schedule</h2>

        <div className="px-2 w-30 flex justify-end ">
          <button
            onClick={() => {
              const currentIndex = formattedDates.indexOf(inView);
              const previousId =
                formattedDates[formattedDates.indexOf(inView) - 1];
              if (currentIndex > 0) {
                setInView(previousId);
                const element = document.getElementById(previousId);
                element?.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="border-1 mr-1"
          >
            <ChevronLeftIcon className="pointer-events-none" />
          </button>
          <button
            onClick={() => {
              const currentIndex = formattedDates.indexOf(inView);
              const nextId = formattedDates[formattedDates.indexOf(inView) + 1];
              if (currentIndex < formattedDates.length - 1) {
                setInView(nextId);
                const element = document.getElementById(nextId);
                element?.scrollIntoView({
                  behavior: "smooth",
                });
              }
            }}
            className="border-1 "
          >
            <ChevronRightIcon className="pointer-events-none" />
          </button>
        </div>
      </div>
      {calendarOpen && (
        <div className="absolute top-15 left-0">
          <DatePicker
            minDate={new Date()}
            maxDate={getDateRange[getDateRange.length - 1]}
            inline
            selected={startDate}
            onChange={(date) => handleCalendar(date)}
          />
        </div>
      )}

      <div className=" py-1 scroll-x-containers w-full flex justify-center">
        {formattedDates.map((date, i) => {
          const windowSize = 7;
          const windowStart = Math.floor(sequence / windowSize) * windowSize;
          const windowEnd = windowStart + windowSize;
          if (i >= windowStart && i < windowEnd)
            return (
              <button
                className={` scale-90 px-4 lg:min-w-20 max-h-10 flex align-middle text-center justify-center content-center ${
                  inView === date &&
                  "text-rose-600 scale-120 transition-all duration-50 "
                }`}
                id={`${date}-horizontal`}
                onClick={(e) => {
                  setInView(date);
                  const element = document.getElementById(date);
                  element?.scrollIntoView({
                    // behavior: "smooth",
                  });
                }}
                key={date}
              >{`${format(new Date(date), "EEE d")}`}</button>
            );
        })}
      </div>

      <div className="flex border-t-1 justify-center py-1 flex-col text-center">
        <h2 className="py-2 text-sm ">Active Dates</h2>
        <div className="flex justify-center py-1">
          {getActiveDates?.map((item, i) => {
            const windowSize = 7;
            const windowStart =
              Math.floor(activeSequence / windowSize) * windowSize;
            const windowEnd = windowStart + windowSize;
            if (i >= windowStart && i < windowEnd)
              return (
                <button
                  key={i}
                  onClick={() => {
                    const element = document.getElementById(item);
                    element?.scrollIntoView({
                      behavior: "smooth",
                    });
                  }}
                  className={`flex justify-center px-2 scale-90  ${
                    inView === item &&
                    "text-rose-300 scale-120 transition-all duration-100 "
                  }`}
                >
                  {format(new Date(item), "eee d")}
                </button>
              );
          })}
        </div>
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
