"use client";

import { DashBoardContext } from "@/context/DashBoardContext";
import { useContext } from "react";
import NewTask from "../NewTask";

export default function DashBoardOverlay() {
  const modalState = useContext(DashBoardContext);
  if (!modalState) {
    throw new Error("needs to be used in dashboard provider");
  }
  const { modal, setModal } = modalState;
  return <div>{modal && <NewTask />}</div>;
}
