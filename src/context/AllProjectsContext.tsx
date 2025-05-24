"use client";
import React, { createContext } from "react";

interface Props {
  project: {
    id: string;
    title: string;
    description: string;
    published: boolean;
    tasks: Array<{
      author: { name: string | null } | null;
    }> | null;
  } | null;
  comments:
    | ({
        author: {
          name: string | null;
        } | null;
      } & {
        id: string;
        content: string;
        projectId: string | null;
        authorId: string | null;
        createdAt: Date;
      })[]
    | undefined;
}
export const AllProjectsContext = createContext(null);
