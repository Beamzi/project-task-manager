import React from "react";

interface Props {
  project: {
    id: string;
    title: string;
    description: string | null;
    published: boolean;
    tasks: Array<{
      author: { name: string | null } | null;
    }> | null;
  } | null;
}

export default function ProjectView({ project }: Props) {
  return (
    <div>
      <h3>{project?.tasks?.[0]?.author?.name}</h3>
      <h1>{project?.title}</h1>
      <textarea defaultValue={project?.description ?? ""}></textarea>
    </div>
  );
}
