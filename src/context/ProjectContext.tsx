"use client";

import { createContext } from "react";

export interface project {
  title: string;
  id: string;
}

export const projectContext = createContext<project[] | null>(null);

// interface Props {
//   project: {
//     id: string;
//     title: string;
//     description: string;
//     published: boolean;
//     tasks: Array<{
//       author: { name: string | null } | null;
//     }> | null;
//   } | null;
//   comments:
//     | ({
//         author: {
//           name: string | null;
//         } | null;
//       } & {
//         id: string;
//         content: string;
//         projectId: string | null;
//         authorId: string | null;
//         createdAt: Date;
//       })[]
//     | undefined;
// }
