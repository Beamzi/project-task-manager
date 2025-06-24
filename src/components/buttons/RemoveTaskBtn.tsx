"use client";

import { useState } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
import { LuCircle, LuFileCheck } from "react-icons/lu";

interface Props {
  id?: string;
  setHideInClient: (value: boolean) => void;
  setAllTasksClient: React.Dispatch<React.SetStateAction<getAllTasksTypeOf[]>>;
  isReminder?: boolean;
}

function RemoveTaskBtn({
  id,
  setHideInClient,
  setAllTasksClient,
  isReminder,
}: Props) {
  const [showDelete, setShowDelete] = useState(false);
  async function deleteTask() {
    setAllTasksClient((prev) => prev.filter((item) => item.id !== id));
    try {
      await fetch("/api/delete-task", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <>
      <button
        onClick={() => {
          setShowDelete(showDelete ? false : true);
        }}
        className={`ml-1 py-1 min-w-10 items-center content-center border-1 ${
          isReminder && ""
        } rounded-md relative px-2 flex  justify-center z-2 traition-all duration-100 hover:[&>*]:fill-rose-600`}
      >
        {isReminder ? (
          <LuCircle className="min-w-4 h-4 " />
        ) : (
          <LuFileCheck className="min-w-5 h-5" />
        )}
      </button>
      {showDelete && (
        <div className="break-words absolute z-50 top-10 py-1  -right-0 border-1 bg-black border-neutral-700 text-neutral-300 rounded-xl p-1 w-70">
          <div className="flex px-1 justify-between items-center  content-center w-full align-middle">
            <p className=" text-center">Mark task as complete?</p>
            <div className="flex">
              <button
                className="nested-buttons rounded-lg mr-1 border-1 p-1 px-2 w-full"
                onClick={() => {
                  deleteTask();
                  setHideInClient(true);
                }}
              >
                Yes
              </button>
              <button
                className="nested-buttons rounded-lg  border-1 px-2  w-full"
                onClick={() => {
                  setShowDelete(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default RemoveTaskBtn;
