"use client";

import React, { useContext, useEffect, useRef, useState } from "react";
import CreateComment from "./CreateComment";
import { AllCommentsContext } from "@/context/AllCommentsContext";
import { format } from "date-fns";

interface Props {
  profileImg: string | undefined | null;
  name: string | undefined | null;
}

export default function PersonalNotes({ profileImg, name }: Props) {
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
      }, 200);

      return () => clearTimeout(updateTimer);
    }
  }, [newContent, setAllCommentsClient]);

  return (
    <div className=" flex flex-col w-full h-full  items-center  ml-0.5 p-2 ">
      <p className="w-full text-end pb-2 px-2 rounded-t-xl">{createdAt}</p>
      {personalNotes && (
        <div className="flex w-full h-full pb-20">
          <div className="flex flex-col items-start w-1/4 pr-2 ">
            {personalNotes.map((item) => (
              <button
                className={`w-full text-start overflow-hidden whitespace-nowrap text-ellipsis p-1 px-1 rounded-lg  ${
                  item.id === openNote && "bg-neutral-600 text-rose-600"
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
          <div className="w-full rounded-2xl">
            {personalNotes
              .filter((item) => item.id === openNote)
              .map((item) => (
                <div key={item.id} className="w-full h-full  ">
                  <textarea
                    className="w-full h-full rounded-xl p-4"
                    value={newContent}
                    onChange={(e) => setNewContent(e.target.value)}
                  ></textarea>
                </div>
              ))}
          </div>
        </div>
      )}

      <div>
        <CreateComment
          isNote={true}
          projectId={null}
          profileImg={profileImg}
          setCommentsClient={setAllCommentsClient}
        />
      </div>
    </div>
  );
}
