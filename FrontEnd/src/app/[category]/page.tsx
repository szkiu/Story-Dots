"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/generic/Header";
import ShowErrAndLoadIfNecessary from "@/components/generic/ShowErrAndLoadIfNecessary";
import CreatePost from "../../components/generic/CreatePost";
import { useInView } from "react-intersection-observer";
import { useGetProductsByCatQuery } from "@/redux/services/products";
import { Product } from "@/interface/Product";
import { Env } from "@/constants/Env";

function Category({ params: { category } }: { params: { category: string } }) {
  const [page, setPage] = useState(5);
  const [len, setLen] = useState(0);
  const {
    data,
    isFetching,
    error,
  }: { data: Product[]; isFetching: boolean; error: any } =
    useGetProductsByCatQuery({
      cat: category,
      page,
    });
  const [ref, inView] = useInView({
    root: null,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch(`${Env.baseUrlProduct}/len/global?cat=${category}`)
      .then((res) => res.json())
      .then((res) => {
        const newLen = res.lenAuthor / 5;

        setLen(newLen);
      });
  }, [category]);

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
            !data ? "justify-center items-center" : ""
          }`}
        >
          <ShowErrAndLoadIfNecessary
            divRef={ref}
            data={data}
            isFetching={isFetching}
            error={error}
            title={`No products to show, Create One with the ${category} category!`}
          />
        </section>

        <CreatePost />
      </main>
    </>
  );
}

export default Category;
