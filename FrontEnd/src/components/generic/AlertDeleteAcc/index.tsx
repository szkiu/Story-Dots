"use client";
import React, { useRef, LegacyRef } from "react";
import { Env } from "@/constants/Env";

export default function AlertDelAcc() {
  const alertDelAcc: LegacyRef<HTMLDivElement> = useRef(null);

  return (
    <div
      id="alert-del-acc"
      ref={alertDelAcc}
      className="fixed z-[2000] top-[50%] left-[50%] -translate-x-[50%] -translate-y-[5000%] bg-[#6760e7] rounded-lg p-4 flex flex-col gap-6 opacity-0 transition-opacity duration-500"
    >
      <h1 className="text-xl font-bold text-white">
        Are you sure to delete yout account and all your products?
      </h1>

      <div className="flex justify-between">
        <button
          className="flex items-center transition-colors duration-300 py-1.5 px-4 rounded-xl bg-gray-800 hover:bg-[#26217d] text-white"
          onClick={() => {
            if (!alertDelAcc.current?.classList) return;

            alertDelAcc.current?.classList?.replace("opacity-1", "opacity-0");

            setTimeout(() => {
              alertDelAcc.current?.classList?.replace(
                "-translate-y-[50%]",
                "-translate-y-[5000%]"
              );
            }, 500);
          }}
        >
          Cancel
        </button>

        <button
          className="flex items-center transition-colors duration-300 py-1.5 px-4 rounded-xl bg-red-600 hover:bg-red-900 text-white"
          onClick={async () => {
            await fetch(`${Env.baseUrlAuth}/user`, {
              credentials: "include",
              method: "DELETE",
              headers: {
                "content-type": "application/json",
              },
            });

            document.getElementById("home-anchor-create_post")?.click();
          }}
        >
          Delete Account
        </button>
      </div>
    </div>
  );
}
