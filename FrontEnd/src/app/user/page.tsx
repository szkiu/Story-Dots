"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/generic/Header";
import ShowProducts from "@/components/home/ShowProducts";
import CreatePost from "../../components/generic/CreatePost";
import { useInView } from "react-intersection-observer";
import { useGetProductsByAuthorMutation } from "@/redux/services/products";
import reverseFunction from "@/utilities/reverseFunction";
import { Product } from "@/interface/Product";
import { useSelector } from "react-redux";
import { baseUrl, Env } from "@/constants/Env";
import ShowErrAndLoadIfNecessary from "@/components/generic/ShowErrAndLoadIfNecessary";

function User() {
  const user = useSelector((state: any) => state.user);
  const [page, setPage] = useState(0);
  const [len, setLen] = useState(0);
  const [toFetch, result] = useGetProductsByAuthorMutation();
  const [ref, inView] = useInView({
    root: null,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch(`${Env.baseUrlProduct}/len/global?author=${user.username}`)
      .then((res) => res.json())
      .then((res) => {
        const newLen = res.lenAuthor / 5;

        setLen(newLen);
      });
  }, [user]);

  useEffect(() => {
    if (!user.username) return;

    toFetch({
      author: user?.username,
      page: page,
    });
  }, [user, page]); //eslint-disable-line

  useEffect(() => {
    const realPage = page + 1;

    if (inView) {
      if (len > realPage) setPage(realPage);
    }
  }, [inView]); //eslint-disable-line

  return (
    <>
      <Header />

      <main className="min-h-[70.3vh] mt-8">
        <section
          className={`flex flex-col gap-[4rem] h-[80%] ${
            !result?.data ? "justify-center items-center" : ""
          }`}
        >
          <ShowErrAndLoadIfNecessary
            divRef={ref}
            data={result?.data}
            isFetching={result?.isFetching}
            error={result?.isError}
            title={`No products to show, Create One!`}
          />
        </section>

        <CreatePost />
      </main>
    </>
  );
}

export default User;
