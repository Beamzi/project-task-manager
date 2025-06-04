"use client";

import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";
import React, { useState } from "react";

import { GetNonProjectCommentsTypeOf } from "@/lib/queries/getNonProjectComments";

interface Props {
  comments: GetNonProjectCommentsTypeOf[];
  children: React.ReactNode;
}

export default function CommentsNonProjectProvider({
  comments,
  children,
}: Props) {
  const [noteCommentsClient, setNoteCommentsClient] =
    useState<GetNonProjectCommentsTypeOf[]>(comments);
  return (
    <CommentsNonProjectContext.Provider
      value={{ noteCommentsClient, setNoteCommentsClient }}
    >
      {children}
    </CommentsNonProjectContext.Provider>
  );
}
