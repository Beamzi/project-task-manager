"use client";

import React from "react";
import { motion } from "motion/react";
import { useState, useRef } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import TopBarContainer from "./Skeleton/TopBarContainer";
import { LuSearch } from "react-icons/lu";

interface Props {
  searching: string;
  setSearching: (value: string) => void;
  xlWidth?: string;
  inputWidth?: string;
  autoFocus: boolean;
}

export default function SearchClient({
  searching,
  setSearching,
  xlWidth,
  inputWidth,
  autoFocus,
}: Props) {
  const searchRef = useRef<HTMLInputElement>(null);
  const [searchClick, setSearchClick] = useState(false);

  return (
    <>
      <TopBarContainer
        title={"Inbox"}
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
              className={`border-1 w-[30dvw] h-8 max-w-110 py-4 px-3 ${
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

      {/* <div
        className={`px-[clamp(16px,2vw,24px)]  ${
          xlWidth ? "aa" : "xl:px-7"
        } w-full flex  justify-center items-center content-center `}
      >
        <div
          className={`gradient-for-inner-containers border-1 outline-5 -outline-offset-6 outline-neutral-900 rounded-2xl w-full flex px-[clamp(16px,2vw,24px)] py-[clamp(8px,2vh,16px)] mt-[clamp(16px,2vh,24px)] ${
            xlWidth ? xlWidth : "2xl:w-[70%] xl:w-[80%]"
          }`}
        ></div>
      </div> */}
    </>
  );
}
