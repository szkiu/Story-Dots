import React from "react";
import Link from "next/link";

function Logo() {
  return (
    <Link href="/" className="relative">
      <p className="text-lg">StoryDots</p>

      <div className="bg-[#28a0c2]/70 absolute -z-10 top-[50%] -translate-y-[50%] left-[50%] -translate-x-[50%] w-[3.8rem] h-[3.8rem] rounded-full" />
    </Link>
  );
}

export default Logo;
