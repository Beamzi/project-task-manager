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
  setQuickDate: (value: Date) => void;
  trueDate: Date;
  setShowTimeOptions: (value: boolean) => void;
  callApi: (scopedDate: Date) => Promise<void>;
}
export default function TimeOptions({
  setQuickDate,
  trueDate,
  setShowTimeOptions,
  callApi,
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
      callApi(date);
      setQuickDate(date);
      setShowTimeOptions(false);
    }
  };

  const getEndOfDay = () => {
    currentDate.setHours(23, 59, 59, 999);
    return currentDate;
  };

  const getTomorrow = () => {
    currentDate.setHours(currentDate.getHours() + 24);
    return currentDate;
  };

  const getNextWeek = () => {
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
              onClick={() => {
                callApi(getEndOfDay());
                setQuickDate(getEndOfDay());
                setShowTimeOptions(false);
              }}
              className=" date-options "
            >
              <SunIcon />
              today
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                callApi(getTomorrow());
                setQuickDate(getTomorrow());
                setShowTimeOptions(false);
              }}
              className="date-options "
            >
              <MoonIcon />
              tomorrow
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                callApi(getNextWeek());
                setShowTimeOptions(false);
                setQuickDate(getNextWeek());
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
            selected={trueDate}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
            maxDate={lastDayOfYear}
          />
        )}
      </div>
      <button
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
                callApi(parseIso);
                setShowTimeOptions(false);
              }
            }}
            type="submit"
          >
            submit
          </button>
        </div>
      )}

      <button
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
            className="bg-black"
            onClick={() => {
              const parseIso = parseISO(isoInput);
              callApi(parseIso);
              setQuickDate(parseIso);
              setShowTimeOptions(false);
            }}
          >
            submit
          </button>
        </div>
      )}
    </div>
  );
}
