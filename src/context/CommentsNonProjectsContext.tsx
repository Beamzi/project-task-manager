"use client";

import { GetNonProjectCommentsTypeOf } from "@/lib/queries/getNonProjectComments";
import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
  noteCommentsClient: GetNonProjectCommentsTypeOf[];
  setNoteCommentsClient: Dispatch<
    SetStateAction<GetNonProjectCommentsTypeOf[]>
  >;
}

export const CommentsNonProjectContext = createContext<Props | null>(null);
