"use client";
import React, { Dispatch, SetStateAction } from "react";
import { format } from "date-fns";
import { useState } from "react";
import Image from "next/image";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import { GetNonProjectCommentsTypeOf } from "@/lib/queries/getNonProjectComments";

interface Props {
  name: string | null | undefined;
  id?: string;
  content: string;
  createdAt: Date;
  profileImg: string | null | undefined;
  localDelete?: boolean;
  commentsClient?: GetNonProjectCommentsTypeOf[];
  setCommentsClient: Dispatch<SetStateAction<GetNonProjectCommentsTypeOf[]>>;
}

export default function EditComment({
  id,
  content,
  name,
  createdAt,
  profileImg,
  setCommentsClient,
}: Props) {
  const [edit, setEdit] = useState(false);

  // const localIndex = commentsClient.findIndex((p) => p.id === id);

  const [newContent, setNewContent] = useState(content);
  const [initOptions, setInitOptions] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

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

      setCommentsClient((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, content: newContent } : item
        )
      );
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

      setCommentsClient((prev) => prev.filter((item) => item.id !== id));
    } catch (e) {
      console.error(e);
    }
  }
  const firstLastName = name?.split(" ");

  const lastInitial = firstLastName?.[1]?.slice(0, 1);
  // ${isDeleted && "hidden"}
  return (
    <>
      <div
        className={`flex pt-3 ${isDeleted && "hidden"}
`}
      >
        {/* // TOPBAR BELOW */}
        <Image
          className="rounded-full mr-3 relative top-1 h-full"
          src={profileImg ?? ""}
          width={30}
          height={30}
          style={{ objectFit: "contain" }}
          alt="user profile picture"
          loading="lazy"
        ></Image>
        {/* {`${localComment}`} */}
        <div key={id} className="w-full ">
          <div className="flex w-full h-7  ">
            <div className="w-full flex align-middle content-center items-center">
              <span className="block overflow-hidden whitespace-nowrap text-ellipsis font-bold">{`${firstLastName?.[0]} ${lastInitial}`}</span>
              <span className="block text-neutral-400 md:pl-2 pl-2 overflow-hidden whitespace-nowrap text-ellipsis min-[900px]:w-16 lg:w-30 sm:w-25.5">
                <span className="block text-xs visible max-[385px]:invisible max-[385px]:absolute">
                  {format(new Date(createdAt), "MMM d h:mm a")}
                </span>
                <span className="block text-xs invisible max-[385px]:visible min-[385px]:absolute ">
                  {format(new Date(createdAt), "MMM d")}
                </span>
              </span>
            </div>
            {!edit && (
              <div className="flex align-middle h-full content-center items-center">
                <button
                  className=""
                  onClick={() => {
                    setEdit(edit ? false : true);
                  }}
                >
                  <PencilSquareIcon className="w-5 h-5 stroke-neutral-400 hover:stroke-rose-600 transition-all duration-100" />
                </button>
                <div className=" flex relative flex-col w-full align-middle justify-center">
                  <button
                    className="w-full justify-center"
                    onClick={() => setInitOptions(initOptions ? false : true)}
                  >
                    <TrashIcon className="w-5 h-5 hover:stroke-rose-600 stroke-neutral-400 transition-all duration-100" />
                  </button>
                  {initOptions ? (
                    <>
                      <button
                        onClick={() => {
                          deleteComment();
                          setIsDeleted(true);
                        }}
                        className=" bg-black p-2 rounded-xl absolute top-6 -left-11 border-1 hover:text-rose-600"
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
          <div className="flex">
            <div className="flex w-full ">
              {!edit ? (
                <>
                  <p className="break-all w-full min-h-10  text-neutral-400 py-2 px-2">
                    {newContent}
                  </p>
                  <div className="min-h-23.5"></div>
                </>
              ) : (
                <div className="flex w-full  flex-col">
                  <textarea
                    maxLength={200}
                    className="break-all outline-1 rounded-lg outline-white py-2 px-2"
                    onChange={(e) => setNewContent(e.target.value)}
                    value={newContent}
                  ></textarea>
                  <div className="flex justify-end  pt-2">
                    <button
                      onClick={() => {
                        setNewContent(content);
                        setEdit(false);
                      }}
                      className="nested-buttons px-2 rounded-md border-1 py-1"
                    >
                      cancel
                    </button>
                    <button
                      onClick={() => {
                        updateComment();
                        setEdit(false);
                      }}
                      className="nested-buttons px-2 rounded-md mx-1 ml-1 border-1"
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
    </>
  );
}
