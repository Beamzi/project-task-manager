// "use client";
import React from "react";
import SignInBtn from "./buttons/SignInBtn";
import Image from "next/image";
// import { signIn } from "../../auth"
import { signIn } from "next-auth/react"; // for client-side

export default function Landing() {
  return (
    <div className="h-screen !bg-black min-h-0 flex flex-col p-5 overflow-hidden">
      <div
        style={{
          backgroundImage: `url('/hero/pexels-tuesday-temptation-190692-3780104.jpg')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          opacity: 0.4,
        }}
        className="fixed top-0 left-0 noise-overlay h-[calc(100vh-40px)] ml-5 mt-5 w-[calc(100vw-40px)]"
      ></div>

      {/* <div className=" fixed top-0 left-0 landing-background h-screen w-screen"></div> */}

      <div className="flex flex-col border-1 h-full">
        <header className="min-h-0 z-2 border-b-1 invisible relative md:h-12 h-0  w-full md:visible">
          <div
            className={`flex justify-between align-middle content-center z-50`}
          >
            <div className="fixed top-0 left-0 border-x-1 border-neutral-800 h-screen w-[calc(100%-40px)] ml-5 "></div>

            <div className="fixed border-y-1 top-0 left-0 border-neutral-800  h-[calc(100%-40px)] w-full  mt-5 "></div>

            <div className="fixed border-t-1 border-neutral-800 top-0 left-0  h-[calc(100%-80px)] w-full  mt-17 "></div>

            {/* 
<div className="flex justify-center align-middle items-center h-12 text-center">
              <div className="h-full flex items-center  pl-2 pr-3">
                <Image
                  className=""
                  src="/logo/2.svg"
                  style={{ objectFit: "contain" }}
                  alt="logo"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <div>
                <h1 className="text-lg">manaboard</h1>
              </div>
            </div> */}

            <div className="flex justify-center align-middle items-center h-12 text-center">
              <div className="flex h-full pl-5 pr-3 py-2 ">
                <Image
                  className=""
                  src="/logo/2.svg"
                  style={{ objectFit: "contain" }}
                  alt="logo"
                  width={60}
                  height={60}
                  priority
                />
              </div>
              <div>
                <h1 className="h-full text-lg">manaboard</h1>
              </div>
            </div>
            <div className="flex align-middle justify-center content-center px-2"></div>
          </div>
        </header>

        <main className="flex relative flex-1 min-h-0  h-full flex-col justify-center content-center items-center bg-white-20 p-2 ">
          <div className="thisDIVHERE flex border-1 20 h-full rounded-4xl w-full border-neutral-800">
            <div className="h-full w-1/3 border-r-1 border-neutral-800"></div>
            <div className="flex h-ful px-2 w-1/3 ">
              <div className="border-x-1 border-neutral-800 rounded-4xl h-full flex flex-col w-full items-center justify-center ">
                <div className="flex flex-col border-y-1 border-neutral-800 py-2 w-screen justify-center items-center">
                  <div className="pb-2 flex flex-col items-center">
                    <h1 className="text-xl">Into Flow With Manaboard</h1>
                    <p>
                      Stay on top of every project, task, and deadline — an all
                      in one smart, real-time workspace
                    </p>
                  </div>

                  <div className="flex">
                    <div className=" w-30 h-30 relative">
                      <Image
                        className=""
                        src="/screens/first.png"
                        style={{ objectFit: "contain" }}
                        alt="logo"
                        fill={true}
                      />
                    </div>
                    <div className=" w-30 h-30 relative">
                      <Image
                        className=""
                        src="/screens/second.png"
                        style={{ objectFit: "contain" }}
                        alt="logo"
                        fill={true}
                      />
                    </div>
                    <div className=" w-30 h-30 relative">
                      <Image
                        className=""
                        src="/screens/third.png"
                        style={{ objectFit: "contain" }}
                        alt="logo"
                        fill={true}
                      />
                    </div>
                  </div>
                  <p className="pt-2">
                    No setup requried, just sign in and start organizing
                  </p>

                  <div className="w-25 flex flex-col justify-center items-center bg-black p-2 py-2 border-1 rounded-2xl">
                    <Image
                      className="py-1"
                      src="/google_brand.svg"
                      style={{ objectFit: "contain" }}
                      alt="logo"
                      width={60}
                      height={60}
                      priority
                    />
                  </div>
                  {/* <button
                    className="ml-2 bg-black z-100"
                    onClick={() => {
                      console.log("clicked");
                      signIn("google", { callbackUrl: "/" });
                    }}
                  >
                    Sign In With Google
                  </button> */}
                  <SignInBtn></SignInBtn>
                </div>
              </div>
            </div>
            <div className=" h-full w-1/3 border-l-1 border-neutral-800 "></div>
          </div>
        </main>
      </div>
    </div>
  );
}
