import React from "react";
import ScheduleTask from "../ScheduleTask";

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

export default function ListOfScheduleTasks({ scheduleTasks }: Props) {
  return (
    <>
      {scheduleTasks?.map((item) => (
        <ScheduleTask
          key={item.id}
          taskId={item.id}
          title={item.title}
          date={item.date}
          content={item.content}
        />
      ))}
    </>
  );
}
