"use client";

import { CommentsNonProjectContext } from "@/context/CommentsNonProjectsContext";
import React from "react";

import { GetNonProjectCommentsTypeOf } from "@/lib/queries/getNonProjectComments";

interface Props {
  value: GetNonProjectCommentsTypeOf[];
  children: React.ReactNode;
}

export default function CommentsNonProjectProvider({ value, children }: Props) {
  return (
    <CommentsNonProjectContext.Provider value={value}>
      {children}
    </CommentsNonProjectContext.Provider>
  );
}
