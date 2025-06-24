"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import CreateComment from "./CreateComment";
import { AllCommentsContext } from "@/context/AllCommentsContext";
import { format } from "date-fns";
import { LuTrash2 } from "react-icons/lu";
import { LuNotebook } from "react-icons/lu";
import { LuChevronLeft } from "react-icons/lu";

export default function PersonalNotes() {
  const allCommentsContext = useContext(AllCommentsContext);
  if (!allCommentsContext) throw new Error("comments not loaded");

  const { setAllCommentsClient, allCommentsClient } = allCommentsContext;
  const allCommentsClientCopy = [...allCommentsClient];
  const personalNotes = allCommentsClientCopy
    .filter((item) => !item.projectId)
    .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime());

  const [openNote, setOpenNote] = useState(personalNotes[0].id);
  const [newContent, setNewContent] = useState(personalNotes[0].content);

  const initCreatedAt = format(
    new Date(personalNotes[0].createdAt),
    "eee MMM d"
  );

  const [createdAt, setCreatedAt] = useState(initCreatedAt);

  async function updateNote() {
    try {
      await fetch("/api/edit-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: openNote, content: newContent }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  const prevContent = useRef(newContent);

  useEffect(() => {
    if (prevContent.current !== newContent) {
      setAllCommentsClient((prev) =>
        prev.map((item) =>
          item.id === openNote ? { ...item, content: newContent } : item
        )
      );

      prevContent.current = newContent;

      const updateTimer = setTimeout(() => {
        updateNote();
      }, 500);
      return () => clearTimeout(updateTimer);
    }
  }, [newContent, setAllCommentsClient]);

  async function removeNote() {
    setAllCommentsClient((prev) => prev.filter((item) => item.id !== openNote));

    try {
      await fetch("/api/delete-comment", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: openNote }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <div className="flex flex-col w-full h-full p-4 items-center ">
      <div className="flex justify-between pb-1 w-full mb-2 bg-neutral-900 rounded-lg pt-1 px-1 align-middle items-center  content-center ">
        <div className=" flex items-center px-2 py-2">
          <LuNotebook className="h-4 w-4 " />
          <LuChevronLeft className="h-4 w-4 " />
          <p className=" text-end px-1">{createdAt}</p>
        </div>
        <button
          className=" flex px-2 hover:text-rose-600 duration-200 transition-all rounded-lg ml-1"
          onClick={removeNote}
        >
          <LuTrash2 className="w-4 h-4" />
        </button>
      </div>

      {personalNotes && (
        <div className="flex rounded-xl  w-full h-full bg-neutral-900">
          <div
            className="flex flex-col px-2 border-r-1 border-dotted border-neutral-700/70 
           items-start bg-transparent w-1/4 my-2 "
          >
            {personalNotes.map((item) => (
              <button
                className={`max-w-20 w-full text-start overflow-hidden whitespace-nowrap text-ellipsis p-1 rounded-lg  ${
                  item.id === openNote && "bg-neutral-800 text-rose-600"
                }`}
                onClick={() => {
                  setOpenNote(item.id);
                  setNewContent(item.content);
                  setCreatedAt(format(new Date(item.createdAt), "eee MMM d"));
                }}
                key={item.id}
              >
                {item.content}
              </button>
            ))}
          </div>
          <div className="w-full rounded-2xl bg-neutral-900">
            {personalNotes
              .filter((item) => item.id === openNote)
              .map((item) => (
                <div key={item.id} className="w-full  h-full  overflow-hidden">
                  <textarea
                    className="w-full rounded-xl py-2.5 focus:bg-transparent break-all break-words focus:outline-transparent h-full  "
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  ></textarea>
                </div>
              ))}
          </div>
        </div>
      )}

      <div>
        <CreateComment isNote={true} setCommentsClient={setAllCommentsClient} />
      </div>
    </div>
  );
}
