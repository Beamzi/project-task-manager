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
  CogIcon,
  SunIcon,
  MoonIcon,
  XCircleIcon,
} from "@heroicons/react/24/outline";

interface Props {
  quickDate?: Date;
  setQuickDate: (value: Date) => void;
  trueDate: Date;
  setShowTimeOptions: (value: boolean) => void;
  callApi?: (scopedDate: Date) => Promise<void>;
  isNewTask?: boolean;
}
const btnClasses =
  "date-options rounded-lg py-2 hover:bg-white hover:[&>*]:stroke-black hover:[&>*]:scale-110 transition-all duration-200 [&>*]:mr-2";

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
    <div className="absolute  gradient-for-thin-containers  outline-4 -outline-offset-5 outline-neutral-900 rounded-xl z-10 px-2 border-1 dark:bg-neutral-900 py-2 flex flex-row">
      <ul className="bg-transparent -mt-0.5 ">
        <li className=" ">
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
            className={` ${btnClasses}`}
          >
            <SunIcon />
            Today
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
            className={` ${btnClasses}`}
          >
            <MoonIcon />
            Tomorrow
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
            className={` ${btnClasses}`}
          >
            <CalendarDaysIcon />
            Next Week
          </button>
          <button
            onClick={() => setShowTimeOptions(false)}
            className={` ${btnClasses}`}
          >
            <XCircleIcon />
            Cancel
          </button>
        </li>
      </ul>

      <div className="calendar-and-buttons">
        {showCalendar && (
          <div className="border-1 rounded-xl">
            <DatePicker
              selected={isNewTask ? quickDate : trueDate}
              onChange={handleDateChange}
              inline
              minDate={new Date()}
              maxDate={lastDayOfYear}
              calendarClassName="custom-time-wrapper"
            />
          </div>
        )}
        <div className="set-a-time relative">
          <button
            type="button"
            className={`date-options ${btnClasses} w-full`}
            onClick={() => setTimeOption(timeOption ? false : true)}
          >
            <ClockIcon />
            Set a time
          </button>
          {timeOption && (
            <div className="absolute top-0 left-21 p-2 rounded-lg dark:bg-black border-1">
              <input
                className="date-options rounded-lg"
                onChange={(e) => setTime(e.target.value)}
                type="time"
              ></input>
              <div className="flex">
                <button
                  type="button"
                  className=" p-2 w-full"
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
                  Submit
                </button>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setTimeOption(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="manual ">
          <button
            type="button"
            className={` ${btnClasses} w-full`}
            onClick={() => setIsoOption(isoOption ? false : true)}
          >
            <CogIcon />
            Manual
          </button>

          {isoOption && (
            <div className="bg-black p-1 px-2 border-1 rounded-lg absolute">
              <input
                onChange={(event) => setIsoInput(event.target.value)}
                value={
                  isoInput
                    ? isoInput
                    : format(new Date(trueDate), "yyyy-MM-dd'T'HH:mm")
                }
                className=" w-full rounded-lg"
                type="datetime-local"
                min={`${format(new Date(), "yyyy-MM-dd'T'HH:mm")}`}
                max={`${getYear()}-12-31T23:59`}
              ></input>
              <div className="flex">
                <button
                  type="button"
                  className=" w-full"
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
                  Submit
                </button>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setIsoOption(false)}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
