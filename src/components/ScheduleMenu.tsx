"use client";

import React from "react";

interface Props {
  scheduleTasks:
    | {
        title: string;
        date: Date;
        content: string | null;
        id: string;
        published: boolean;
        authorId: string | null;
        projectId: string | null;
        priority: boolean;
        createdAt: Date;
      }[]
    | undefined;
}

export default function ScheduleMenu({ scheduleTasks }: Props) {
  return <div></div>;
}
