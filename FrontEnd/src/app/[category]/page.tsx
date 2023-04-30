"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/generic/Header";
import CreatePost from "../../components/generic/CreatePost";
import ShowProducts from "@/components/home/ShowProducts";
import { useInView } from "react-intersection-observer";
import { useGetProductsByCatQuery } from "@/redux/services/products";
import reverseFunction from "@/utilities/reverseFunction";
import { Product } from "@/interface/Product";
import { baseUrl } from "@/constants/Env";

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
    fetch(`${baseUrl}/api/v1/products/len/global?cat=${category}`)
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

  console.log(data);

  return (
    <>
      <Header />

      <main className="min-h-[70.3vh] mt-8">
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
                      key={`${_id}-category`}
                    />
                  );
                }
              )}

              <div ref={ref} />
            </>
          ) : null}
        </section>

        <CreatePost />
      </main>
    </>
  );
}

export default Category;
