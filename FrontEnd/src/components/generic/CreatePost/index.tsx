import React from "react";
import Link from "next/link";

function CreatePost() {
  return (
    <Link href="create_product" className="flex justify-center items-center text-white font-medium text-xs fixed bottom-16 right-[14rem] bg-[#28a0c2] w-[5.5rem] h-[5.5rem] rounded-full transition-all duration-300 hover:bg-[#e0dd27] hover:text-black hover:-translate-y-2 z-[100]">
      <p>Create Product</p>
    </Link>
  );
}

export default CreatePost;
