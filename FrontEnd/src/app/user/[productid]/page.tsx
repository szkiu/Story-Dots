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

function ProductId({ params: { productid } }: { params: { productid: string } }) {
  const {
    data: userData,
    isFetching: UserIsFetching,
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
        <section className="flex gap-8 relative">
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
        </section>

        <CreatePost />
      </main>
    </>
  );
}

export default ProductId;
