"use client";

import React, { useContext } from "react";
import CreateComment from "./CreateComment";
import EditComment from "./EditComment";
import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";
import { AllCommentsContext } from "@/context/AllCommentsContext";

interface Props {
  profileImg: string | undefined | null;
  name: string | undefined | null;
}

export default function PersonalNotes({ profileImg, name }: Props) {
  const commentsContext = useContext(CommentsNonProjectContext);
  if (!commentsContext) throw new Error("comments not loaded ");
  const { setNoteCommentsClient, noteCommentsClient } = commentsContext;

  const allCommentsContext = useContext(AllCommentsContext);
  if (!allCommentsContext) throw new Error("comments not loaded");

  const { setAllCommentsClient, allCommentsClient } = allCommentsContext;
  const allCommentsClientCopy = [...allCommentsClient];
  const personalNotes = allCommentsClientCopy.filter((item) => !item.projectId);

  return (
    <div className="p-4 flex pb-31 flex-col justify-center w-full">
      {personalNotes && (
        <div>
          {personalNotes.map((item) => {
            return (
              <EditComment
                key={item.id}
                id={item.id}
                content={item.content}
                name={name}
                profileImg={profileImg}
                createdAt={item.createdAt}
                localDelete={true}
                commentsClient={personalNotes}
                setCommentsClient={setAllCommentsClient}
              />
            );
          })}
        </div>
      )}

      <div>
        <CreateComment
          projectId={null}
          profileImg={profileImg}
          setCommentsClient={setAllCommentsClient}
        />
      </div>
    </div>
  );
}
