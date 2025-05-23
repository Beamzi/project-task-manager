"use client";

import { useContext, useEffect, useState } from "react";
import ProjectListBtn from "./ProjectListBtn";
import { projectContext } from "@/context/ProjectContext";
import { DashBoardContext } from "@/context/DashBoardContext";
import Link from "next/link";
import { motion } from "motion/react";
import { generateKey } from "crypto";
import { withRouter } from "next/router";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      delayChildren: 0.0,
      staggerChildren: 0.08,
    },
  },
};

const itemMotion = {
  hidden: {
    opacity: 0,
    y: 10,
    filter: "sepia(4) hue-rotate(190deg) saturate(300%) brightness(90%)",
  },
  show: {
    opacity: 1,
    y: 0,
    filter: "sepia(0) hue-rotate(0deg) saturate(0%) brightness(1)",
    transition: {
      filter: {
        duration: 0.9,
      },
      type: "tween",
      ease: "easeOut",
      duration: 0.3,
    },
  },
};

const lineMotion = {
  hidden: { filter: "brightness(100)", scaleY: 0 },
  show: {
    filter: "brightness(1)",
    scaleY: 1,
    transition: {
      scaleY: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.2,
      },
      filter: {
        type: "tween",
        ease: "easeInOut",
        duration: 0.3,
      },
    },
  },
};

export default function ProjectList({
  active,
  projectListClient,
  projectListIds,
}: {
  active: (value: string) => void;
  projectListClient: string[];
  projectListIds: string[];
}) {
  const [hasAnimated, setHasAnimated] = useState(false);

  const projects = useContext(projectContext);

  if (!projects) {
    throw new Error("no project");
  }

  const context = useContext(DashBoardContext);
  if (!context) {
    throw new Error("dashboard props not loaded");
  }

  const { removeProjectFromDashboard } = context;

  return (
    <>
      <motion.div
        className="flex flex-col"
        variants={container}
        initial="hidden"
        animate="show"
        // onAnimationComplete={() => setHasAnimated(true)}
      >
        {projects.map((item) => (
          <ProjectListBtn
            key={item.id}
            title={item.title}
            id={item.id}
            active={active}
            variantItems={itemMotion}
            variantLines={lineMotion}
          />
        ))}

        {projectListClient.map((item, index) => {
          const isHidden = removeProjectFromDashboard.includes(
            projectListIds[index]
          );
          return (
            <div key={`${item}${index}`}>
              <div className="flex">
                <motion.div
                  variants={lineMotion}
                  className="origin-top border-l-2 pl-3 border-rose-600 text-start ml-4 "
                ></motion.div>
                <motion.div
                  variants={itemMotion}
                  className={`${
                    isHidden ? "hidden" : ""
                  } flex overflow-hidden w-[95%]`}
                >
                  <Link
                    className="text-start w-full hover:text-rose-600 py-1 text-sm px-2 text-neutral-400"
                    href={`/projects/${projectListIds[index]}`}
                  >
                    {item}
                  </Link>
                </motion.div>
              </div>
            </div>
          );
        })}
      </motion.div>
    </>
  );
}
