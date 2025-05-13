"use client";

import React from "react";

export default function SortByButtons({ setAction }) {
  return (
    <div className="flex flex-col">
      <button onClick={() => setAction("dateDesc")}>descending</button>
      <button onClick={() => setAction("dateAsc")}>ascending</button>
    </div>
  );
}
