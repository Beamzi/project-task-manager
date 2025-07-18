"use client";

import React from "react";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import TopBarContainer from "./Skeleton/TopBarContainer";
import { LuSearch } from "react-icons/lu";

interface Props {
  searching: string;
  setSearching: (value: string) => void;
  xlWidth?: string;
  inputWidth?: string;
  autoFocus: boolean;
  isDashboard?: boolean;
  title?: string;
}

export default function SearchClient({
  searching,
  setSearching,
  xlWidth,
  inputWidth,
  autoFocus,
  isDashboard,
  title,
}: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchClick, setSearchClick] = useState(false);

  return (
    <>
      <TopBarContainer
        isDashboard={isDashboard}
        title={title}
        data={
          <>
            <motion.input
              whileFocus={{ scale: 0.95 }}
              autoFocus={autoFocus}
              onBlur={() => setSearchClick(false)}
              ref={searchRef}
              placeholder="Search..."
              value={searching}
              onChange={(e) => setSearching(e.target.value)}
              type="search"
              className={`border-1 ${
                isDashboard ? "!w-full " : "w-[30dvw] "
              } h-8 py-4 px-3 ${
                inputWidth ? inputWidth : "w-1/2"
              } text-neutral-300 rounded-lg`}
            ></motion.input>
            <motion.div
              whileTap={{ scale: 0.9 }}
              whileHover={{ scale: 1.1 }}
              onClick={() => {
                searchRef.current?.focus();
                setSearchClick(true);
              }}
              className={`${
                searchClick && "text-rose-600"
              } border-1 ml-1 flex flex-col justify-center items-center content-center text-center rounded-lg py-1`}
            >
              <LuSearch className="mx-1 w-7 h-6 text-center " />
            </motion.div>
          </>
        }
      />
    </>
  );
}
