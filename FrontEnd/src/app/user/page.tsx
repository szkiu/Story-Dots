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
import { baseUrl } from "@/constants/Env";

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
    fetch(`${baseUrl}/api/v1/products/len/global?author=${user.username}`)
      .then((res) => res.json())
      .then((res) => {
        const newLen = res.lenAuthor / 5;

        setLen(newLen);
      });
  }, [user]);

  useEffect(() => {
    if (!user.username) return

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

  console.log(page, len)

  return (
    <>
      <Header />

      <main className="min-h-[70.3vh] mt-8">
        <section className="flex flex-col gap-[4rem]">
          {result.isSuccess ? (
            <>
              {result.data.map(
                (
                  {
                    description,
                    author,
                    category,
                    id,
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
                      isPair={i % 2 === 0}
                      id={id}
                      key={id}
                      price={price}
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

export default User;
