"use client";
import React from "react";
import { format } from "date-fns";
import { useState } from "react";
import Image from "next/image";

interface Props {
  name: string | null | undefined;
  id: string;
  content: string;
  createdAt: Date;
  profileImg: string | null | undefined;
}

export default function EditComment({
  id,
  content,
  name,
  createdAt,
  profileImg,
}: Props) {
  const [edit, setEdit] = useState(false);
  const [newContent, setNewContent] = useState(content);
  const [initOptions, setInitOptions] = useState(false);

  async function updateComment() {
    try {
      await fetch("/api/edit-comment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: newContent,
          id: id,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }
  async function deleteComment() {
    try {
      await fetch("/api/delete-comment", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: id,
        }),
      });
    } catch (e) {
      console.error(e);
    }
  }

  return (
    // TOPBAR BELOW
    <div className="flex pt-3">
      <Image
        className="rounded-full mr-3 relative top-1 h-full"
        src={profileImg ?? ""}
        width={30}
        height={30}
        style={{ objectFit: "contain" }}
        alt="user profile picture"
        priority
      ></Image>

      <div key={id} className="w-full">
        <div className="flex w-full h-7  ">
          <div className="w-full ">
            <span className="font-bold">{`${name} `}</span>
            <span className="text-xs text-neutral-400 pl-2">
              {format(new Date(createdAt), "MMM d h:mm a")};
            </span>
          </div>
          {!edit && (
            <div className="flex align-middle h-full content-center  items-center">
              <button
                className=" px-2"
                onClick={() => {
                  setEdit(edit ? false : true);
                }}
              >
                edit
              </button>
              <div className="flex relative flex-col w-full align-middle  justify-center ">
                <button
                  className="w-full  justify-center"
                  onClick={() => setInitOptions(initOptions ? false : true)}
                >
                  x
                </button>
                {initOptions ? (
                  <>
                    <button
                      onClick={deleteComment}
                      className="absolute top-5 left-0 border-1"
                    >
                      delete?
                    </button>
                  </>
                ) : null}
              </div>
            </div>
          )}
        </div>
        {/* TOPBAR ABOVE */}

        <div className="flex ">
          <div className="flex w-full ">
            {!edit ? (
              <>
                <p className="w-full min-h-10 text-neutral-400 py-2 px-2">
                  {content}
                </p>
                <div className="min-h-23.5"></div>
              </>
            ) : (
              <div className="flex w-full flex-col">
                <textarea
                  className=" outline-1 outline-white py-2 px-2"
                  onChange={(e) => setNewContent(e.target.value)}
                  value={newContent}
                ></textarea>
                <div className="flex justify-end  py-1">
                  <button
                    onClick={() => setEdit(false)}
                    className="px-2 border-1 py-1 "
                  >
                    cancel
                  </button>
                  <button
                    onClick={updateComment}
                    className="px-2  mx-1 border-1"
                  >
                    save
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
