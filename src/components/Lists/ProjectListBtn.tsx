"use cient";

import { redirect } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
interface Props {
  id: string;
  title: string;
  active: (value: string) => void;
}
const overflowEllipsis =
  "block overflow-hidden whitespace-nowrap text-ellipsis w-30";

export default function ProjectListBtn({ id, title, active }: Props) {
  // const [active, setActive] = useState(false);
  return (
    <div className="flex overflow-hidden w-[95%]">
      <div className={`border-l-2 pl-3 ml-4 border-neutral-600`}></div>
      <Link
        className={`${overflowEllipsis} ${active(
          `/projects/${id}`
        )} text-start py-1 text-sm text-neutral-400
        }`}
        href={`/projects/${id}`}
      >
        {title}
      </Link>
    </div>
  );
}
