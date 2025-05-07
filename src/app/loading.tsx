// app/dashboard/loading.tsx
export default function Loading() {
  return (
    <>
      <div className="px-5 py-6 flex justify-start bg-transparent ">
        <h2 className="text-start min-w-45">Welcome Back, James</h2>
        <div className="border-b-1 border-dotted relative bottom-1.5 outline-white w-full"></div>
        <h2 className="min-w-53 text-right">You have 12 active projects</h2>
      </div>
      <div className="flex px-6 relative bg-transparent  justify-center">
        <div className="border-1 border-dotted w-1/2 bg-neutral-900">
          <p className="px-2 py-2">Recently Created </p>
          <div
            id="task-scroll-container"
            className=" border-t-1 border-dotted bg-neutral-800 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[40dvh]"
          >
            {/* <ListOfTasks currentTasks={tasks} /> */}
          </div>
        </div>

        <div className="w-1/2 flex flex-col border-1 border-dotted ml-6 dark:bg-neutral-900">
          <p className="border-b-1 border-dotted px-2 py-2">Reminders </p>
          <div className="dark:bg-neutral-800 h-full w-full">
            {/* <ListOfReminderTasks /> */}
          </div>
        </div>
      </div>

      <div className=" flex px-6 pt-6 relative bg-transparent  justify-center ">
        <div className="border-1 border-dotted w-2/2 bg-neutral-900">
          <p className="px-2 py-2">Priorities </p>
          <div
            id="task-scroll-container"
            className=" border-t-1 border-dotted bg-neutral-800 flex justify-center w-full relative flex-wrap overflow-y-scroll h-[27dvh]"
          >
            {/* <ListOfTasks currentTasks={tasks} /> */}
          </div>
        </div>
      </div>
    </>
  );
}
