import React from "react";
import { format } from "date-fns";
import { CheckCircleIcon, PlusIcon } from "@heroicons/react/24/solid";
export interface Props {
  taskId: string;
  title: string;
  date: Date;
  content: string | null;
}

export default function ScheduleTask({ taskId, title, date, content }: Props) {
  const dueDate = format(new Date(date), "yyyy-MM-dd");
  const currentDate = format(new Date(), "yyyy-MM-dd");
  const dateForDisplay = date.toString().slice(0, 10);

  const getDate = () => {
    const date =
      dueDate === currentDate ? `today ${dateForDisplay}` : `${dateForDisplay}`;
    return date;
  };

  console.log(dateForDisplay, "datefordispaly");

  return (
    <div id={taskId} className="w-[60dvw] overflow-hidden">
      <h1 className="font-bold py-2 px-5">{getDate()}</h1>
      <hr></hr>
      <div className="flex align-center h-full">
        <div className="py-5  px-5 h-full   wrap-normal text-neutral-500">
          <h3 className="flex wrap-normal [&>*]:mr-2 ">
            <CheckCircleIcon className="fill-neutral-100 min-w-5 " />
            {title}
          </h3>
          <p className="wrap-normal pl-7 pb-2">{content}</p>
          <hr className="pt-2"></hr>
          <button className="flex  w-200 [&>*]:mr-2">
            <PlusIcon className="fill-neutral-100 w-5" />
            new task
          </button>
        </div>
      </div>
    </div>
  );
}
