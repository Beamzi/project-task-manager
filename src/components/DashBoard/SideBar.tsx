import React from "react";
import NewTask from "../NewTask";
import NewTaskBtn from "../buttons/NewTaskBtn";

export default function SideBar() {
  return (
    <aside className="flex flex-col p-5 border-2">
      <NewTaskBtn></NewTaskBtn>
      <button>All Tasks</button>
      <button>Prioties</button>
      <button>Projects</button>
    </aside>
  );
}
