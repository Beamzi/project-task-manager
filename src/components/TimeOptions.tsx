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

interface Props {
  setQuickDate: (value: Date) => void;
  trueDate: Date;
  setShowTimeOptions: (value: boolean) => void;
}
export default function TimeOptions({
  setQuickDate,
  trueDate,
  setShowTimeOptions,
}: Props) {
  const [showCalendar] = useState(true);
  const [time, setTime] = useState("");
  const currentDate = new Date();

  const lastDayOfYear = new Date(new Date().getFullYear(), 11, 31);

  const handleDateChange = (date: Date | null) => {
    if (date) setQuickDate(date);
    setShowTimeOptions(false);
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
    <div>
      <div className="absolute z-10">
        <ul className="bg-neutral-900 w-80 ">
          <li className="w-full ">
            <button
              onClick={() => {
                setShowTimeOptions(false);
                setQuickDate(getEndOfDay());
              }}
              className="bg-black px-2 w-1/2 text-left"
            >
              today
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowTimeOptions(false);
                setQuickDate(getTomorrow());
              }}
              className="bg-black px-2 w-1/2 text-left"
            >
              tomorrow
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setShowTimeOptions(false);
                setQuickDate(getNextWeek());
              }}
              className="bg-black px-2 w-1/2 text-left"
            >
              next Week
            </button>
          </li>
        </ul>
        {showCalendar && (
          <DatePicker
            selected={new Date()}
            onChange={handleDateChange}
            inline
            minDate={new Date()}
            maxDate={lastDayOfYear}
          />
        )}

        <input
          className="bg-black p-2"
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
            if (
              trueDate > new Date() &&
              format(new Date(trueDate), "yyyy-MM-dd") ===
                format(new Date(), "yyyy-MM-dd")
            ) {
              alert("please select a valid time of day");
            } else setQuickDate(parseISO(trueDateFormat));
            setShowTimeOptions(false);
          }}
          type="submit"
        >
          submit
        </button>
      </div>
    </div>
  );
}

// if (
//   format(new Date(trueDate), "yyyy-MM-dd'T'HH:mm") ===
//   format(new Date(), "yyyy-MM-dd'T'HH:mm")
// )
