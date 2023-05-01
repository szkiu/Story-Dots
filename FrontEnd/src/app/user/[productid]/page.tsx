"use client";
import React from "react";
import Product from "@/components/individualProduct/Product";
import Header from "../../../components/generic/Header";
import CreatePost from "@/components/generic/CreatePost";
import RecoProducts from "@/components/individualProduct/RecoProducts";
import {
  useGetProductByIdQuery,
  useGetProductsByCatQuery,
} from "../../../redux/services/products";
import filterProductCat from "@/utilities/filterProductsCat";
import { ClipLoader } from "react-spinners";

function ProductId({
  params: { productid },
}: {
  params: { productid: string };
}) {
  const {
    data: userData,
    isFetching: userIsFetching,
    error: userError,
  } = useGetProductByIdQuery(productid);
  const {
    data: catData,
    isFetching: catIsFetching,
    error: catError,
  } = useGetProductsByCatQuery({
    page: 2,
    cat: userData?.category,
  });

  let filteredProducts;
  if (catData) filteredProducts = filterProductCat(catData, productid);

  return (
    <>
      <Header noSticky={true} />

      <main className="mb-6">
        <section className={`flex gap-8 relative ${ userError ? "justify-center" : "" }`}>
          {!userError ? (
            userIsFetching ? (
              <div className="w-full h-full flex items-center justify-center">
                <ClipLoader size={40} />
              </div>
            ) : (
              <>
                <Product
                  author={userData?.author}
                  author_id={userData?.authorId}
                  category={userData?.category}
                  description={userData?.description}
                  id={userData?._id}
                  time={userData?.time}
                  name={userData?.name}
                  image_url={userData?.image_url}
                  price={userData?.price}
                />

                {filterProductCat.length !== 0 ? (
                  <RecoProducts catProducts={filteredProducts} />
                ) : null}
              </>
            )
          ) : (
            <div className="flex flex-col items-center gap-4 bg-red-600 rounded-lg py-2 px-4 text-white">
              <p><span className="font-medium">Status:</span> {userError?.status}</p>

              <p><span className="font-medium">Error msj:</span> {userError?.data?.error}</p>
            </div>
          )}
        </section>

        <CreatePost />
      </main>
    </>
  );
}

export default ProductId;
