"use client";

import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import { CheckBadgeIcon, DocumentCheckIcon } from "@heroicons/react/24/outline";

function RemoveTaskBtn({ id }: { id: string }) {
  const [showDelete, setShowDelete] = useState(false);
  const router = useRouter();
  async function deleteTask() {
    try {
      await fetch("/api/delete-task", {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({ id: id }),
      });
      router.refresh();
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
        className="w-10 border-1 relative px-2 flex justify-center mx-1 hover:border-x-5 transition-all duration-100 hover:[&>*]:scale-120 hover:[&>*]:fill-rose-600"
      >
        <DocumentCheckIcon className="py-1" />
        {/* <XMarkIcon className="absolute  -mt-[1px] transition-all duration-100" /> */}
      </button>
      {showDelete && (
        <div className="break-words absolute top-7 right-0 border-1 bg-black rounded-xl p-2 w-30 ">
          <p className="pb-2 text-center">Mark task as complete?</p>
          <div className="flex justify-centera  items-center w-full content-center">
            <button
              className="nested-buttons border-1 p-1 mr-1 w-full"
              onClick={() => {
                deleteTask();
              }}
            >
              Yes
            </button>
            <button
              className="nested-buttons border-1 p-1 w-full"
              onClick={() => {
                setShowDelete(false);
              }}
            >
              No
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default RemoveTaskBtn;
