"use client";

import React, { useEffect, useState, useRef } from "react";

export default function Timer() {
  const [seconds, setSeconds] = useState(59);
  const [minutes, setMinutes] = useState(0);
  const [isOver, setIsOver] = useState(false);
  const [goAgain, setGoAgain] = useState(false);

  useEffect(() => {
    const seconds = setInterval(() => {
      setSeconds((a) => {
        // if (isOver) clearInterval(seconds);
        if (a === 0) return 59;
        else return a - 1;
      });
    }, 1000);
    const minutes = setInterval(() => {
      setMinutes((a) => {
        if (a <= 0) {
          clearInterval(minutes);
          clearInterval(seconds);
          setIsOver(true);
          // setEndSequence(true);
        }
        return a - 1;
      });
    }, 60000);

    return () => {
      clearInterval(seconds);
      clearInterval(minutes);
    };
  }, [goAgain]);

  return (
    <>
      <div>{`${isOver ? "0" : minutes}:${isOver ? "0" : seconds}`}</div>
      {isOver && (
        <button
          onClick={() => {
            // setEndSequence(false);
            setIsOver(false);
            setMinutes(4);
            setSeconds(59);
            setGoAgain((g) => !g);
          }}
        >
          Start Over
        </button>
      )}
    </>
  );
}
