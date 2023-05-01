"use client";
import React, { useState, useEffect } from "react";
import ShowProducts from "../ShowProducts";
import { useInView } from "react-intersection-observer";
import { useGetProductsQuery } from "../../../redux/services/products";
import reverseFunction from "@/utilities/reverseFunction";
import { Product } from "../../../interface/Product";
import { Env } from "@/constants/Env";

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
    <section className="flex flex-col gap-[4rem]">
      {data ? (
        <>
          {data.map(
            (
              {
                description,
                author,
                category,
                _id,
                image_url,
                time,
                name,
                authorId,
                price,
              }: Product,
              i: number
            ) => {
              return (
                <ShowProducts
                  author_id={authorId}
                  description={description}
                  name={name}
                  image_url={image_url}
                  time={time}
                  author={author}
                  category={category}
                  price={price}
                  isPair={i % 2 === 0}
                  id={_id ? _id : ""}
                  key={`${_id}-MainContent`}
                />
              );
            }
          )}

          <div ref={ref} />
        </>
      ) : null}
    </section>
  );
}

export default MainContent;
