"use client";
import { useState, useEffect } from "react";
import ShowProducts from "@/components/home/ShowProducts";
import { Product } from "@/interface/Product";
import React from "react";
import { useInView } from "react-intersection-observer";
import { ClipLoader } from "react-spinners";

export default function ShowErrAndLoadIfNecessary({
  data,
  isFetching,
  error,
  divRef,
  title
}: {
  isFetching: boolean;
  data: undefined | Product[];
  error: undefined | { status: string; data: { error: string } };
  divRef: any
  title?: string
}) {

  return (
    <>
      {!error ? (
        !isFetching && data ? (
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

            <div ref={divRef} />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <ClipLoader size={40} />
          </div>
        )
      ) : (
        <p>{title || 'No products to show, Create One!'}</p>
      )}
    </>
  );
}
