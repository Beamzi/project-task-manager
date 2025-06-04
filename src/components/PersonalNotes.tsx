"use client";

import React, { useContext } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";

interface Props {
  profileImg: string | undefined | null;
  name: string | undefined | null;
}

export default function PersonalNotes({ profileImg, name }: Props) {
  const commentsContext = useContext(CommentsNonProjectContext);
  if (!commentsContext) throw new Error("comments not loaded ");
  const { setNoteCommentsClient, noteCommentsClient } = commentsContext;

  return (
    <div className="p-4 flex pb-31 flex-col justify-center w-full">
      {noteCommentsClient && (
        <div>
          {noteCommentsClient.map((item) => {
            return (
              <EditComment
                key={item.id}
                id={item.id}
                content={item.content}
                name={name}
                profileImg={profileImg}
                createdAt={item.createdAt}
                localDelete={true}
                noteCommentsClient={noteCommentsClient}
                setNoteCommentsClient={setNoteCommentsClient}
              />
            );
          })}
        </div>
      )}

      <div>
        <CreateComment
          projectId={null}
          profileImg={profileImg}
          setNoteCommentsClient={setNoteCommentsClient}
        />
      </div>
    </div>
  );
}
