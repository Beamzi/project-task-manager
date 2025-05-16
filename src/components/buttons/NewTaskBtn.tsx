"use client";

import { useContext, useState } from "react";
import NewTask from "../NewTask";
import { DashBoardContext } from "@/context/DashBoardContext";
import { PlusIcon } from "@heroicons/react/24/outline";

function NewTaskBtn() {
  const [showForm, setShowForm] = useState(false);
  const modalState = useContext(DashBoardContext);
  if (!modalState) {
    throw new Error("must be used within a dashboardprovider");
  }
  const { modal, setModal } = modalState;
  return (
    <>
      <button onClick={() => setShowForm(true)}>
        <PlusIcon />
        Create Task
      </button>
      {showForm && <NewTask setShowForm={setShowForm} />}
    </>
  );
}

export default NewTaskBtn;
