"use client";
import React, { useState } from "react";
import ListOfTasks from "./Lists/ListOfTasks";
import { useEffect } from "react";

export default function SearchTasks() {
  const [search, setSearch] = useState("");
  const [result, setResult] = useState([]);
  const [show, setShow] = useState(false);
  const [selected, setSelected] = useState(false);

  async function getSearchResult() {
    try {
      const request = await fetch("/api/search-task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ search: search }),
      });
      let response = await request.json();
      setResult(response.result);
    } catch (e) {
      console.error(e);
    }
  }

  useEffect(() => {
    const delayRequest = setTimeout(() => {
      setResult([]);
      if (search.length > 0) getSearchResult();
      setShow(true);
    }, 10);

    return () => clearTimeout(delayRequest);
  }, [search]);

  return (
    <div className="relative">
      <input
        onChange={(e) => setSearch(e.target.value)}
        value={search}
        onClick={() => setSelected(true)}
        type="search"
      ></input>

      {show && selected && search.length > 0 && (
        <div className="bg-black absolute top-10 left-0 z-100">
          <ListOfTasks currentTasks={result} />
        </div>
      )}
    </div>
  );
}
