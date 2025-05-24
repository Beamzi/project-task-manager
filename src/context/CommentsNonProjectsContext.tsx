"use client";

import { GetNonProjectCommentsTypeOf } from "@/lib/queries/getNonProjectComments";
import { createContext } from "react";

export const CommentsNonProjectContext = createContext<
  GetNonProjectCommentsTypeOf[]
>([]);
