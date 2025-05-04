"use cient";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
interface Props {
  id: string;
  title: string;
}

export default function ProjectListBtn({ id, title }: Props) {
  const [active, setActive] = useState(false);
  return (
    <div className="flex overflow-hidden w-[95%]">
      <div
        className={`border-l-2 pl-3 ml-4 ${
          active ? "border-white" : "border-neutral-600"
        }`}
      ></div>
      <Link
        onClick={() => setActive(true)}
        className={`py-1 text-sm ${active ? `text-white` : "text-neutral-400"}`}
        href={`/projects/${id}`}
      >
        {title}
      </Link>
    </div>
  );
}
