import React from "react";
import ScheduleMenuItems from "./ScheduleMenuItems";

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
  return (
    <div>
      <div className="flex justify-center py-1 ">
        {scheduleTasks?.map((item) => (
          <ScheduleMenuItems
            key={item.id}
            date={item.date}
            title={item.title}
            taskId={item.id}
            content={item.content}
          ></ScheduleMenuItems>
        ))}
      </div>
      <hr></hr>
    </div>
  );
}
