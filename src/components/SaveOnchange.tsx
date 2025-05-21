"use client";

import React from "react";
import { motion } from "motion/react";

import { PencilIcon, CheckCircleIcon } from "@heroicons/react/24/outline";

interface Props {
  editing: boolean;
}

export default function SaveOnchange({ editing }: Props) {
  return (
    <div className="w-2/4">
      <div className="flex py-1 px-2  w-22 h-8 justify-center align-middle items-center">
        {editing ? (
          <div className="flex w-20  ">
            <div className="w-10 origin-left ">
              <motion.div
                transition={{ duration: 0.9 }}
                initial={{ width: 5 }}
                animate={{ width: 30 }}
                className=" w-10 h-5 overflow-hidden origin-right"
              >
                . . .
              </motion.div>
            </div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="mr-2 flex"
            >
              <PencilIcon className=" w-4 stroke-rose-400 " />
            </motion.div>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex origin-right"
          >
            Saved
            <motion.div
              initial={{ scale: 2 }}
              animate={{ scale: 1 }}
              className="ml-2 flex"
            >
              <CheckCircleIcon className=" stroke-green-400" />
            </motion.div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
