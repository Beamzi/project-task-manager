"use client";
import React from "react";
import InboxClient from "@/components/InboxClient";
import { useContext } from "react";
import { AllTasksDueDateContext } from "@/context/AllTasksDueDateContext";

export default function Inbox() {
  const tasks = useContext(AllTasksDueDateContext);
  if (!tasks) {
    throw new Error("tasks not loaded");
  }

  return (
    <>
      <InboxClient tasks={tasks} />
    </>
  );
}
