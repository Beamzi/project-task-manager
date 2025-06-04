"use client";

import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext, useState } from "react";
import { CheckBadgeIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";
import { DashBoardContext } from "@/context/DashBoardContext";
import { SetStateAction, Dispatch } from "react";
import { getAllTasksTypeOf } from "@/lib/queries/getAllTasks";
interface Props {
  id?: string;
  setHideInClient: (value: boolean) => void;
  setAllTasksClient: React.Dispatch<React.SetStateAction<getAllTasksTypeOf[]>>;
}

function RemoveTaskBtn({ id, setHideInClient, setAllTasksClient }: Props) {
  const [showDelete, setShowDelete] = useState(false);

  async function deleteTask() {
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
    setAllTasksClient((prev) => prev.filter((item) => item.id !== id));
  }

  return (
    <>
      <button
        onClick={() => {
          setShowDelete(showDelete ? false : true);
        }}
        className="ml-1 py-1 min-w-10 items-center content-center border-1  relative px-2 flex  justify-center z-2 traition-all duration-100 hover:[&>*]:fill-rose-600"
      >
        <DocumentCheckIcon className="min-w-5 " />
        {/* <XMarkIcon className="absolute  -mt-[1px] transition-all duration-100" /> */}
      </button>
      {showDelete && (
        <div className="break-words absolute top-8.5 py-3  -right-0 border-1 bg-black rounded-xl p-2 w-70">
          <div className="flex px-1 justify-between  items-center  content-center w-full align-middle">
            <p className=" text-center">Mark task as complete?</p>
            <div className="flex">
              <button
                className="nested-buttons mr-1 border-1 p-1 px-2 w-full"
                onClick={() => {
                  deleteTask();
                  setHideInClient(true);
                }}
              >
                Yes
              </button>
              <button
                className="nested-buttons border-1 px-2 p-1 w-full"
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
