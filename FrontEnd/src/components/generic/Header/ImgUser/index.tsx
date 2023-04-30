"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  useGetMeQuery,
  useDeleteUserMutation,
} from "../../../../redux/services/account";
import { BiLogOut, BiTrash, BiHeart } from "react-icons/bi";
import { useDispatch } from "react-redux";
import { setUser } from "@/redux/slices/user.slice";
import Unknown from "../../../../assets/unknown-user.png";

function ImgUser() {
  const dispatch = useDispatch();
  const [deleteAccount, result] = useDeleteUserMutation();
  const { data: user, isFetching, error } = useGetMeQuery();
  const [showOptions, setShowOptions] = useState(false);
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (window) setShow(true);
  }, []);

  useEffect(() => {
    if (!user) return;

    dispatch(setUser({
      id: user._id,
      ...user
    }));
  }, [user]); //eslint-disable-line

  return (
    <>
      {error || !user ? (
        <>
          {show ? (
            <>
              <Link
                href="/login"
                className="py-1 px-2 border-2 border-cyan-400 bg-cyan-400 text-white rounded-full transition hover:bg-white hover:text-cyan-400 duration-200"
              >
                Login
              </Link>

              <Link
                href="/register"
                className="py-1 px-2 border-2 border-cyan-400 text-cyan-400 rounded-full
      transition hover:bg-cyan-400 hover:text-white duration-200"
              >
                Register
              </Link>
            </>
          ) : (
            <>
              <div className="py-1 px-2 border-2 border-cyan-400 bg-cyan-400 text-white rounded-full transition hover:bg-white hover:text-cyan-400 duration-200 cursor-default">
                Login
              </div>

              <div
                className="py-1 px-2 border-2 border-cyan-400 text-cyan-400 rounded-full
      transition hover:bg-cyan-400 hover:text-white duration-200 cursor-default"
              >
                Register
              </div>
            </>
          )}
        </>
      ) : (
        <div className="relative">
          <button className="" onClick={() => setShowOptions(!showOptions)}>
            <img
              className="rounded-full w-[2.5rem] h-[2.5rem]"
              src={user?.image ? user.image : Unknown.src}
              alt="User Image"
            />
          </button>

          {showOptions ? (
            <div className="absolute left-[50%] -translate-x-[50%] bg-[#4fa7b6] rounded-xl shadow-lg shadow-black/20 py-2 w-max px-4">
              <div className="flex flex-col items-center gap-2">
                <h3 className="font-semibold text-xl text-amber-300">
                  <span className="text-white">Hello</span> {user.username}
                </h3>
              </div>

              <div className="flex flex-col mt-2 gap-2">
                <Link
                  className="font-semibold text-white text-[15px] flex items-center justify-center gap-2 py-0.5 transition-colors hover:bg-[#4e767c]"
                  href="/user"
                >
                  My Products
                  <BiHeart className="text-white text-lg" />
                </Link>

                <button
                  className="font-semibold text-white text-[15px] flex items-center justify-center gap-2 py-0.5 transition-colors hover:bg-[#4e767c]"
                  onClick={async () => {
                    await fetch(
                      "https://challenge_sd-1-e5045299.deta.app/api/v1/auth/logout",
                      {
                        credentials: "include",
                        mode: "cors",
                      }
                    );
                    location.reload();
                  }}
                >
                  Log Out
                  <BiLogOut className="text-white text-lg" />
                </button>

                <button
                  className="font-semibold text-white text-[15px] flex items-center justify-center gap-2 transition-colors hover:bg-[#4e767c] py-0.5 rounded-b-lg"
                  onClick={async () => {
                    await fetch(
                      "https://challenge_sd-1-e5045299.deta.app/api/v1/auth/user",
                      {
                        credentials: "include",
                        mode: "cors",
                        method: "DELETE",
                      }
                    );
                    location.reload();
                  }}
                >
                  Delete Account
                  <BiTrash className="text-white text-lg" />
                </button>
              </div>
            </div>
          ) : null}
        </div>
      )}
    </>
  );
}

export default ImgUser;
