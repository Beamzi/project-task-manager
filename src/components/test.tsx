import React from "react";
import SignInBtn from "./buttons/SignInBtn";
import Image from "next/image";

export default function Test() {
  return (
    <div
      className="h-screen relative"
      style={{
        backgroundImage: `url('/hero/pexels-tuesday-temptation-190692-3780104.jpg')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        opacity: 0.4,
      }}
    >
      {/* Your content goes here */}
    </div>
  );
}
