import React from "react";

export default function Tooltip({ className }: { className: string }) {
  return (
    <div
      className={`${className} absolute -top-18  -right-1 rounded-sm p-2 px-4 w-50`}
    >
      Click the star to make this task a priority
    </div>
  );
}
