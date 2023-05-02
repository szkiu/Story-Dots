"use client";
import React, { useState, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useGetProductsQuery } from "../../../redux/services/products";
import { Product } from "../../../interface/Product";
import { Env } from "@/constants/Env";
import ShowErrAndLoadIfNecessary from "@/components/generic/ShowErrAndLoadIfNecessary";

function MainContent() {
  const [page, setPage] = useState(0);
  const [len, setLen] = useState(0);
  const {
    data,
    isFetching,
    error,
  }: { data: Product[]; isFetching: boolean; error: any } =
    useGetProductsQuery(page);
  const [ref, inView] = useInView({
    root: null,
    threshold: 0.1,
  });

  useEffect(() => {
    fetch(`${Env.baseUrlProduct}/len/global`)
      .then((res) => res.json())
      .then((res) => {
        const newLen = res.len / 5;

        setLen(newLen);
      });
  }, []);

  useEffect(() => {
    const realPage = page + 1;

    if (inView) {
      if (len > realPage) setPage(realPage);
    }
  }, [inView]); //eslint-disable-line

  return (
    <section
      className={`flex flex-col gap-[4rem] ${
        !data ? "justify-center items-center" : ""
      }`}
    >
      <ShowErrAndLoadIfNecessary
        divRef={ref}
        data={data}
        isFetching={isFetching}
        error={error}
      />
    </section>
  );
}

export default MainContent;
