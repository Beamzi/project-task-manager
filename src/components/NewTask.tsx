"use client";

import { format } from "date-fns";

import { useRouter } from "next/navigation";
import { useState } from "react";
import TimeOptions from "./TimeOptions";
interface Props {
  setShowForm: (type: boolean) => void;
}

export default function NewTask({ setShowForm }: Props) {
  const router = useRouter();
  const [date, setDate] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isNewTask, setIsNewTask] = useState(false);

  const trueDate = new Date();

  const [quickDate, setQuickDate] = useState<Date>(trueDate);
  const [showTimeOptions, setShowTimeOptions] = useState(false);

  async function createTask(event) {
    event.preventDefault();
    try {
      await fetch("/api/create-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: title,
          content: content,
          date: quickDate,
        }),
      });
      // router.refresh();
    } catch (e) {
      console.error(e);
    }
  }

  const getYear = () => new Date().getFullYear();

  const currentDate = format(new Date(), "yyyy-MM-dd'T'HH:mm");

  console.log(currentDate, "current date");

  console.log(getYear, "current year bla");

  return (
    <>
      <div
        onClick={() => setShowForm(false)}
        className={`text-center backdrop-blur-xs bg-neutral-950/50 fixed top-[50%] z-50 left-[50%] w-full h-full translate-[-50%]`}
      ></div>
      <div className="fixed md:w-120 min-w-80 top-[50%] left-[50%] z-100 translate-[-50%]  flex flex-col p-5 [&>*]:my-2 gradient-for-inner-containers border-1 rounded-xl outline-4 -outline-offset-5 outline-neutral-900">
        <label>
          title
          <input
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            className="border-2 w-full"
            type="text"
          ></input>
        </label>
        <label>
          <button
            onClick={() => {
              setShowTimeOptions(showTimeOptions ? false : true);
              setIsNewTask(true);
            }}
          >
            {isNewTask && !showTimeOptions
              ? `${format(new Date(quickDate), "eee MMM d")}`
              : "Pick A Date"}
          </button>
          <div>
            {showTimeOptions && (
              <TimeOptions
                quickDate={quickDate}
                setQuickDate={setQuickDate}
                trueDate={trueDate}
                setShowTimeOptions={setShowTimeOptions}
                isNewTask={isNewTask}
              ></TimeOptions>
            )}
          </div>
        </label>
        <label>
          description
          <textarea
            value={content}
            onChange={(event) => setContent(event.target.value)}
            className="border-2 w-full"
          ></textarea>
        </label>
        <button
          onClick={createTask}
          className="border-2 w-full py-3"
          type="submit"
        >
          submit
        </button>
      </div>
    </>
  );
}

//9999-12-31T23:59
