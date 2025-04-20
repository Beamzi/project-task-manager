import React from "react";

import { MinusIcon } from "@heroicons/react/24/solid";

interface Props {
  id: string;
}

export default function MinimiseTaskBtn({ id }: Props) {
  return (
    <button className="w-10 bg-neutral-800 border-1 relative px-2 flex  justify-center hover:border-x-5 transition-all duration-100 hover:[&>*]:scale-150 hover:[&>*]:fill-rose-600">
      <MinusIcon className="absolute top-2 mt-[0.5px]  transition-all duration-100"></MinusIcon>
    </button>
  );
}
