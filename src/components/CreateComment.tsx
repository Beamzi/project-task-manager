"use client";

import React, { Dispatch, SetStateAction, useContext } from "react";
import { useState } from "react";
import Image from "next/image";
import { GetNonProjectCommentsTypeOf } from "@/lib/queries/getNonProjectComments";
import { GetAllCommentsTypeof } from "@/lib/queries/getAllComments";
import { GetAllProjecttypeOf } from "@/lib/queries/getAllProjects";
import { Jersey_10_Charted } from "next/font/google";
import { SessionContext } from "@/context/SessionContext";

interface Props {
  isNote?: boolean;
  projectId: string | undefined | null;
  profileImg: string | undefined | null;
  setCommentsClient: Dispatch<SetStateAction<GetAllCommentsTypeof[]>>;
}

export default function CreateComment({
  isNote,
  projectId,
  profileImg,
  setCommentsClient,
}: Props) {
  const [content, setContent] = useState("");
  const [comment, setComment] = useState(false);

  async function createComment(
    event: React.FormEvent<HTMLFormElement>,
    tempId: string
  ) {
    event?.preventDefault();
    try {
      const request = await fetch("/api/create-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          projectId: projectId ? projectId : null,
        }),
      });

      const response = await request.json();
      setCommentsClient((prev) =>
        prev.map((item) =>
          item.id === tempId ? { ...item, id: response.result.id } : item
        )
      );

      //   console.log(session.user?.name);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        const tempId = crypto.randomUUID();

        setTimeout(() => {
          const container = document.getElementById("task-scroll-container");
          if (container) {
            container.scrollTop = container.scrollHeight;
          }
        });

        setCommentsClient(
          (prev) =>
            [
              ...prev,
              {
                content: content,
                createdAt: new Date(),
                id: tempId,
                projectId: projectId,
              },
            ] as GetAllCommentsTypeof[]
        );

        createComment(e, tempId);
        setComment(false);
        setContent("");
      }}
      className="absolute z-20 bottom-3 rounded-xl scale-92 shadow-[0px_14px_5px_1px_rgba(15,15,15,0.9)] -left-[1px] w-full"
    >
      <div className="flex flex-col py-5 px-5 pb-10.5 border-1 rounded-xl backdrop-blur-2xl shadow-[0px_-50px_100px_1px_rgba(0,0,0,0.5)]">
        <div className="flex justify-center align-middle content-center items-center">
          {!isNote && (
            <Image
              className="w-8 rounded-full h-8"
              src={profileImg ?? ""}
              width={30}
              height={30}
              style={{ objectFit: "contain" }}
              alt="user profile picture"
              loading="lazy"
            ></Image>
          )}

          <textarea
            minLength={5}
            maxLength={200}
            required
            value={content}
            onChange={(e) => {
              setContent(e.target.value);
            }}
            placeholder={`${isNote ? "Add a note?" : "Leave a comment?"}`}
            onClick={() => setComment(true)}
            className="border-1 rounded-sm mx-2 my-2 w-full h-10 pt-2 pl-2 text-neutral-200 relative"
          ></textarea>
        </div>
        {comment ? (
          <div className="w-full flex absolute bottom-0.5 left-0 scale-80 ">
            <button
              type="submit"
              className="w-full text-base bg-black py-2.5 rounded-md nested-buttons border-1 mr-2"
            >
              Submit
            </button>
            <button
              type="button"
              className="w-full text-base rounded-md border-1 py-2 nested-buttons duration-100 backdrop-blur-2xl"
              onClick={() => {
                setContent("");
                setComment(false);
              }}
            >
              Cancel
            </button>
          </div>
        ) : null}
      </div>
    </form>
  );
}
