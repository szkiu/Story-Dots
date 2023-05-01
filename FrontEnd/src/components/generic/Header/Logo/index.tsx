"use client";
import React, { useRef } from "react";
import Link from "next/link";

function Logo() {
  const logoBg = useRef<HTMLDivElement>(null);

  return (
    <Link
      href="/"
      className="relative"
      onMouseEnter={() => {
        if (!logoBg.current) return;

        logoBg.current.classList.add(
          "bg-deep-purple-500",
          "transition-colors",
          "duration-300"
        );
      }}
      onMouseLeave={() => {
        if (!logoBg.current) return;

        setTimeout(() => {
          if (!logoBg.current) return;

          logoBg.current.classList.remove("transition-colors", "duration-300");
        }, 350);

        logoBg.current.classList.remove("bg-deep-purple-500");
      }}
    >
      <p className="text-white text-[0.9rem]">StoryDots</p>

      <div
        ref={logoBg}
        className="bg-[#28a0c2]/70 absolute -z-10 top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-[4rem] h-[4rem] rounded-full"
      />
    </Link>
  );
}

export default Logo;
