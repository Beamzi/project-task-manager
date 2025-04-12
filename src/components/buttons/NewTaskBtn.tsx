"use client";

import { useContext } from "react";
import NewTask from "../NewTask";
import { DashBoardContext } from "@/context/DashBoardContext";

function NewTaskBtn() {
  const modalState = useContext(DashBoardContext);
  if (!modalState) {
    throw new Error("must be used within a dashboardprovider");
  }
  const { modal, setModal } = modalState;
  return <button onClick={() => setModal(true)}>Create New Task</button>;
}

export default NewTaskBtn;
