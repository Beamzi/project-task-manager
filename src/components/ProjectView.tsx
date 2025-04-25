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
    <div className="lg:max-h-200 lg:w-[calc(60%)] x-4 py-2 border-1 align-middle">
      <h3 className="text-sm text-start py-2">
        {project?.tasks?.[0]?.author?.name}
      </h3>
      <h1 className="text-lg pb-2">{project?.title}</h1>
      <textarea
        className="w-full lg:min-h-80 h-45 my-2"
        defaultValue={project?.description ?? ""}
      ></textarea>
    </div>
  );
}
