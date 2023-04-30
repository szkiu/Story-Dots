"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useDeleteProductMutation } from "@/redux/services/products";
import { useGetMeQuery, useGetUserByIdQuery } from "@/redux/services/account";
import { BiTrash, BiPencil } from "react-icons/bi";
import getTime from "@/utilities/getTime";

function Product({
  name,
  author,
  author_id,
  category,
  time,
  description,
  image_url,
  id,
  price,
}: {
  name: string;
  author_id: string;
  author: string;
  category: string;
  time: number;
  description: string;
  image_url?: string;
  id: string;
  price: number;
}) {
  const [deleteProduct, deleteResult] = useDeleteProductMutation();
  const {
    data: account,
    isFetching: accountIsFetching,
    error: accountError,
  } = useGetMeQuery();
  const { data, isFetching, error } = useGetUserByIdQuery(author_id);

  const handlerInner = () => ({
    __html: description,
  });

  return (
    <div className="w-[70%] grid gap-4 mt-4">
      <div className="w-full">
        <img className="w-full h-[15rem]" src={image_url} alt={name} />
      </div>

      <div className={data?.image ? "flex gap-3" : ""}>
        {data?.image ? (
          <div>
            <img
              className="w-[3rem] h-[3rem] rounded-full"
              src={data.image}
              alt={data.username}
            />
          </div>
        ) : null}

        <div className="flex gap-3">
          <div className="flex flex-col gap-1">
            <h4 className="font-semibold text-lg text-zinc-800">{author}</h4>

            <p className="text-sm">
              {/* @ts-ignore */}
              {getTime(time)}
            </p>
          </div>

          {author_id === account?._id ? (
            <div className="flex items-center gap-2">
              <Link
                href={`/update_product/${id}`}
                className="w-7 h-7 border-2 font-medium text-white bg-yellow-400 border-yellow-400 rounded-full text-xl flex items-center justify-center"
              >
                <BiPencil />
              </Link>

              <button
                onClick={() => deleteProduct(id)}
                className="bg-red-500 border-2 w-7 h-7 border-red-500 rounded-full text-white text-xl font-bold flex items-center justify-center"
              >
                <BiTrash />
              </button>
            </div>
          ) : null}
        </div>
      </div>

      <h1 className="text-4xl font-bold text-zinc-800">{name}</h1>

      <p style={{ wordWrap: "break-word", width: "auto" }} className="text-zinc-800" dangerouslySetInnerHTML={handlerInner()} />
    </div>
  );
}

export default Product;
