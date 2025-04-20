"use client";

import { useRouter } from "next/navigation";
import { XMarkIcon } from "@heroicons/react/24/solid";

function RemoveTaskBtn({ id }: { id: string }) {
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
    <button
      onClick={deleteTask}
      className="w-10 bg-neutral-800 border-1 relative px-2 flex  justify-center mx-1 hover:border-x-5 transition-all duration-100 hover:[&>*]:scale-150 hover:[&>*]:fill-rose-600"
    >
      <XMarkIcon className="absolute top-2  mt-[0.5px] transition-all duration-100" />
    </button>
  );
}

export default RemoveTaskBtn;
