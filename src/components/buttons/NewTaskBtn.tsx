"use client";

import { useState } from "react";
import NewTask from "../NewTask";
import { LuPlus } from "react-icons/lu";

function NewTaskBtn() {
  const [showForm, setShowForm] = useState(false);
  return (
    <>
      <button onClick={() => setShowForm(true)}>
        <LuPlus className="w-5 h-5" />
        Create Task
      </button>
      {showForm && <NewTask setShowForm={setShowForm} />}
    </>
  );
}

export default NewTaskBtn;
