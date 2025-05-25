import React from "react";
import SignInBtn from "./buttons/SignInBtn";
import Image from "next/image";
export default function Landing() {
  return (
    <div className="h-screen !bg-black relative z-1000 min-h-0 flex flex-col p-5 overflow-hidden ">
      <Image
        className="h-full w-full opacity-50 "
        src="/hero/pexels-tuesday-temptation-190692-3780104.jpg"
        style={{ objectFit: "cover" }}
        alt="logo"
        fill={true}
        priority
      />
      <div className=" fixed  top-0 left-0 noise-overlay h-screen w-screen"></div>
      {/* <div className=" fixed top-0 left-0 landing-background h-screen w-screen"></div> */}

      <div className="flex flex-col border-1 h-full">
        <header className="min-h-0 z-2 border-b-1 invisible relative md:h-12 h-0  w-full md:visible">
          <div
            className={`flex justify-between align-middle content-center z-50`}
          >
            <div className="fixed top-0 left-0 border-x-1 h-screen  w-[calc(100%-40px)] ml-5 "></div>

            <div className="fixed border-y-1 top-0 left-0  h-[calc(100%-40px)] w-full  mt-5 "></div>

            <div className="fixed border-y-1  top-0 left-0  h-[calc(100%-80px)] w-full  mt-17 "></div>

            {/* <div className="fixed top-0 left-0 border-1 h-screen -mt-5 -ml-5 w-full "></div> */}

            {/* <div className="pointer-events-none md:h-full md:w-full md:scale-y-145  md:p-2 md:border-x-1 md:bg-transparent md:z-1 md:absolute md:bottom-0 md:top-0 md:left-0 md:right-0"></div>
            <div className="pointer-events-none md:h-full md:w-full md:scale-x-103 md:border-y-1  md:bg-transparent md:z-1 md:absolute md:bottom-0 md:top-0 md:left-0 md:right-0"></div> */}

            <div className="flex justify-center align-middle items-center h-12 text-center">
              <div className="w-full h-full pl-5 pr-3 py-3 ">
                <Image
                  className="h-full w-full"
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

        <main className="flex  relative flex-1 min-h-0 rounded-4xl  h-full flex-col border-1 m-2 justify-center content-center items-center ">
          <div className="flex h-full  w-full">
            <div className=" h-full w-1/3 border-r-1  "></div>
            <div className="flex  mx-2 h-full w-1/3 py-2">
              <div className="border-1 rounded-4xl h-full flex flex-col w-full items-center justify-center ">
                <div className="flex flex-col border-y-1 py-2 w-screen justify-center items-center">
                  <h1>Into Flow With Manaboard</h1>
                  <button>signin</button>
                </div>
              </div>
            </div>
            <div className=" h-full  w-1/3 border-l-1 "></div>
          </div>
        </main>
      </div>
      {/* <SignInBtn></SignInBtn> */}
    </div>
  );
}
