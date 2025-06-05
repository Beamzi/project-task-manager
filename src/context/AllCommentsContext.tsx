"use client";

import { GetAllCommentsTypeof } from "@/lib/queries/getAllComments";
import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
  allCommentsClient: GetAllCommentsTypeof[];
  setAllCommentsClient: Dispatch<SetStateAction<GetAllCommentsTypeof[]>>;
}

export const AllCommentsContext = createContext<Props | null>(null);
