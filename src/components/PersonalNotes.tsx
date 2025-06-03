"use client";

import React, { useContext, useState, useEffect } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import { DashBoardContext } from "@/context/DashBoardContext";

interface Props {
  profileImg: string | undefined | null;
  name: string | undefined | null;
  comments: ({
    author: {
      name: string | null;
    } | null;
  } & {
    id: string;
    content: string;
    projectId: string | null;
    authorId: string | null;
    createdAt: Date;
  })[];
}

export default function PersonalNotes({ comments, profileImg, name }: Props) {
  const dashboardProps = useContext(DashBoardContext);
  if (!dashboardProps) throw new Error("no props loaded");
  const { localComment, setLocalComment } = dashboardProps;

  useEffect(() => {
    // Only set localComment if empty, so you don’t overwrite user edits
    if (localComment.length === 0 && comments.length > 0) {
      setLocalComment(comments);
    }
  }, [comments, localComment, setLocalComment]);

  return (
    <div className="p-4 flex pb-31 flex-col justify-center w-full">
      {/* <div>
        {comments?.map((comments) => (
          <EditComment
            key={comments.id}
            id={comments.id}
            content={comments.content}
            name={comments.author?.name}
            createdAt={comments.createdAt}
            profileImg={profileImg}
            localComment={localComment}
            setLocalComment={setLocalComment}
          ></EditComment>
        ))}
      </div> */}

      {/* {localComment.length > 0 && localComment.every(item => item.id) && ( */}

      {localComment && (
        <div>
          {localComment.map((item, index) => {
            return (
              <EditComment
                key={item.id}
                id={item.id}
                content={item.content}
                name={name}
                profileImg={profileImg}
                createdAt={item.createdAt}
                localDelete={true}
                localComment={localComment}
                setLocalComment={setLocalComment}
              />
            );
          })}
        </div>
      )}

      <div>
        <CreateComment
          projectId={null}
          profileImg={profileImg}
          setLocalComment={setLocalComment}
        />
      </div>
    </div>
  );
}
