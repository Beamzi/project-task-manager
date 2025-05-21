"use client";

import React from "react";
import { useState } from "react";
import Image from "next/image";

interface Props {
  projectId: string | undefined | null;
  profileImg: string | undefined | null;
  setLocalComment: React.Dispatch<React.SetStateAction<string[]>>;
  setCommentId: React.Dispatch<React.SetStateAction<string[]>>;
}

export default function CreateComment({
  projectId,
  profileImg,
  setLocalComment,
  setCommentId,
}: Props) {
  const [content, setContent] = useState("Leave a comment?");
  const [comment, setComment] = useState(false);
  // const [commentId, setCommentId] = useState("");
  // const [localArr, setLocalArr] = useState<string[]>([]);
  async function createComment(event) {
    event?.preventDefault();
    try {
      const request = await fetch("/api/create-comment", {
        method: "POST",
        headers: {
          "Content-Type": "applications/json",
        },
        body: JSON.stringify({
          content: content,
          projectId: projectId ? projectId : null,
        }),
      });
      const response = await request.json();
      setCommentId((prev) => [...prev, response.result.id]);
    } catch (e) {
      console.error(e);
    }
  }

  return (
    <form
      onSubmit={(e) => {
        createComment(e);
        setLocalComment((prev) => [...prev, content]);
      }}
      className="flex flex-col "
    >
      {/* <button>leave a comment?</button> */}
      <div className="flex justify-center align-middle content-center items-center">
        <Image
          className="w-8 rounded-full  h-8"
          src={profileImg ?? ""}
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
          alt="user profile picture"
          loading="lazy"
        ></Image>
        <textarea
          minLength={5}
          maxLength={200}
          required
          onChange={(e) => {
            setContent(e.target.value);
          }}
          placeholder="Leave a comment?"
          // value={content}
          onClick={() => setComment(true)}
          className="border-1 rounded-sm mx-2 my-2 w-full h-10 pt-2 pl-2  relative"
        ></textarea>
      </div>
      {comment ? (
        <div className="w-full flex border-1">
          <button
            type="button"
            className="w-full"
            onClick={() => setComment(false)}
          >
            cancel
          </button>
          <button
            type="submit"
            // onClick={() => {
            //   createComment();
            //   setLocalComment((prev) => [...prev, content]);
            // }}
            className="w-full bg-black py-1"
          >
            submit
          </button>
        </div>
      ) : null}
    </form>
  );
}
