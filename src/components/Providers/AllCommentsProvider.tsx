"use client";

import { AllCommentsContext } from "@/context/AllCommentsContext";
import { GetAllCommentsTypeof } from "@/lib/queries/getAllComments";
import React, { useState } from "react";

interface Props {
  allComments: GetAllCommentsTypeof[];
  children: React.ReactNode;
}

export default function AllCommentsProvider({ allComments, children }: Props) {
  const [allCommentsClient, setAllCommentsClient] =
    useState<GetAllCommentsTypeof[]>(allComments);
  return (
    <AllCommentsContext.Provider
      value={{ allCommentsClient, setAllCommentsClient }}
    >
      {children}
    </AllCommentsContext.Provider>
  );
}
