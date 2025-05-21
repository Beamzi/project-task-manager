"use client";

import React from "react";
import {
  eachDayOfInterval,
  eachWeekOfInterval,
  format,
  parseISO,
} from "date-fns";
import { useState, useContext } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ClockIcon,
  CalendarDaysIcon,
  CalendarDateRangeIcon,
  SunIcon,
  MoonIcon,
} from "@heroicons/react/24/solid";

interface Props {
  quickDate?: Date;
  setQuickDate: (value: Date) => void;
  trueDate: Date;
  setShowTimeOptions: (value: boolean) => void;
  callApi?: (scopedDate: Date) => Promise<void>;
  isNewTask?: boolean;
}
export default function TimeOptions({
  quickDate,
  setQuickDate,
  trueDate,
  setShowTimeOptions,
  callApi,
  isNewTask,
}: Props) {
  const [showCalendar] = useState(true);
  const [time, setTime] = useState("");
  const [isoInput, setIsoInput] = useState("");
  const [timeOption, setTimeOption] = useState(false);
  const [isoOption, setIsoOption] = useState(false);

  const currentDate = new Date();
  const getYear = () => new Date().getFullYear();

  const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);

  const handleDateChange = (date: Date | null) => {
    if (date) {
      setQuickDate(date);
      if (!isNewTask && callApi) {
        callApi(date);
      }
      setTimeout(() => {
        setShowTimeOptions(false);
      });
    }
  };

  const getEndOfDay = () => {
    const currentDate = new Date();
    currentDate.setHours(23, 59, 59, 999);
    return currentDate;
  };

  const getTomorrow = () => {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 24);
    return currentDate;
  };

  const getNextWeek = () => {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 7);
    return currentDate;
  };

  const nextWeek = eachWeekOfInterval({
    start: new Date(),
    end: new Date(),
  });

  return (
    <div className="absolute z-10 px-1 border-1 dark:bg-neutral-900 flex flex-col">
      <div className="">
        <ul className="bg-neutral-900  ">
          <li className="w-full ">
            <button
              type="button"
              onClick={() => {
                setQuickDate(getEndOfDay());
                if (!isNewTask && callApi) {
                  callApi(getEndOfDay());
                }
                setTimeout(() => {
                  setShowTimeOptions(false);
                });
              }}
              className=" date-options "
            >
              <SunIcon />
              today
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setQuickDate(getTomorrow());
                if (!isNewTask && callApi) {
                  callApi(getTomorrow());
                }
                setTimeout(() => {
                  setShowTimeOptions(false);
                });
              }}
              className="date-options "
            >
              <MoonIcon />
              tomorrow
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => {
                setQuickDate(getNextWeek());
                if (!isNewTask && callApi) {
                  callApi(getNextWeek());
                }
                setTimeout(() => {
                  setShowTimeOptions(false);
                });
              }}
              className="date-options "
            >
              <CalendarDaysIcon />
              next Week
            </button>
          </li>
        </ul>
        {showCalendar && (
          <DatePicker
            selected={isNewTask ? quickDate : trueDate}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
            maxDate={lastDayOfYear}
          />
        )}
      </div>
      <button
        type="button"
        className="py-2 px-2 "
        onClick={() => setTimeOption(timeOption ? false : true)}
      >
        set a time
      </button>
      {timeOption && (
        <div>
          <input
            className="date-options"
            onChange={(e) => setTime(e.target.value)}
            type="time"
          ></input>
          <button
            type="button"
            className="bg-black p-2"
            onClick={() => {
              const trueDateFormat = format(
                new Date(trueDate),
                `yyyy-MM-dd'T'${time}`
              );
              const parseIso = parseISO(trueDateFormat);
              if (
                trueDate > new Date() &&
                format(new Date(trueDate), "yyyy-MM-dd") ===
                  format(new Date(), "yyyy-MM-dd")
              ) {
                alert("please select a valid time of day");
              } else {
                setQuickDate(parseIso);
                if (!isNewTask && callApi) {
                  callApi(parseIso);
                }
                setTimeout(() => {
                  setShowTimeOptions(false);
                });
              }
            }}
          >
            submit
          </button>
        </div>
      )}

      <button
        type="button"
        className="py-2 px-2"
        onClick={() => setIsoOption(isoOption ? false : true)}
      >
        manual
      </button>

      {isoOption && (
        <div>
          <input
            onChange={(event) => setIsoInput(event.target.value)}
            value={
              isoInput
                ? isoInput
                : format(new Date(trueDate), "yyyy-MM-dd'T'HH:mm")
            }
            className="border-2 w-full"
            type="datetime-local"
            min={`${format(new Date(), "yyyy-MM-dd'T'HH:mm")}`}
            max={`${getYear()}-12-31T23:59`}
          ></input>
          <button
            type="button"
            className="bg-black"
            onClick={() => {
              const parseIso = parseISO(isoInput);
              const current = new Date();
              const maxDate = new Date(`${getYear()}-12-31T23:59`);

              if (parseIso < current || parseIso > maxDate) {
                alert("Please select a valid date");
                return;
              }

              setQuickDate(parseIso);
              if (!isNewTask && callApi) {
                callApi(parseIso);
              }
              setTimeout(() => {
                setShowTimeOptions(false);
              });
            }}
          >
            submit
          </button>
        </div>
      )}
    </div>
  );
}
