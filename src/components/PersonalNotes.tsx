"use client";

import React, { useState } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";

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
  const [localComment, setLocalComment] = useState<string[]>([]);
  const [commentId, setCommentId] = useState<string[]>([]);

  // const [commentsIndex, setLocalComment];
  // const [isDeleted, setIsDeleted] = useState(false);

  return (
    <div className="p-4 flex pb-31 flex-col justify-center w-full">
      <div>
        {comments?.map((comments) => (
          <EditComment
            key={comments.id}
            id={comments.id}
            content={comments.content}
            name={comments.author?.name}
            createdAt={comments.createdAt}
            profileImg={profileImg}
          ></EditComment>
        ))}
      </div>

      {localComment && (
        <div>
          {localComment.map((item, index) => {
            return (
              <EditComment
                key={index}
                id={commentId[index]}
                content={item}
                name={name}
                profileImg={profileImg}
                createdAt={new Date()}
                localDelete={true}
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
          setCommentId={setCommentId}
        />
      </div>
    </div>
  );
}
