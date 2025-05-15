"use client";

import React, { useState } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";

interface Props {
  profileImg: string | undefined | null;
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

export default function PersonalNotes({ comments, profileImg }: Props) {
  const [localComment, setLocalComment] = useState<string[]>([]);

  return (
    <div className="border-1 flex flex-col justify-center w-full">
      <div>
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
      </div>

      {localComment && (
        <div>
          {localComment.map((item, index) => (
            <EditComment
              key={index}
              content={item}
              name={comments[0].author?.name}
              profileImg={profileImg}
              createdAt={new Date()}
            />
          ))}
        </div>
      )}

      <div>
        <CreateComment
          projectId={null}
          profileImg={profileImg}
          localComment={localComment}
          setLocalComment={setLocalComment}
        />
      </div>
    </div>
  );
}
