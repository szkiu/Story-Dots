"use client";
import React, { useState, useEffect } from "react";
import Header from "@/components/generic/Header";
import dynamic from "next/dynamic";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";
import { Formik, ErrorMessage, Field, Form } from "formik";
import { useRouter } from "next/navigation";
import {
  useUpdateProductMutation,
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from "../../../redux/services/products";
import { categories } from "@/assets/categories";
import { ErrorPostProduct } from "@/interface/ErrorPostProduct";
import { useSelector } from "react-redux";

function UpdateProduct({ params: { id } }: { params: { id: string } }) {
  const router = useRouter();
  const [updatePost, updateresult] = useUpdateProductMutation();
  const [deletePost, deleteresult] = useDeleteProductMutation();
  const { data, isFetching, idError } = useGetProductByIdQuery(id);
  const [valueQuill, setValueQuill] = useState("");
  const [img, setImg] = useState<string | null>(null);
  const [error, setError] = useState<ErrorPostProduct | undefined>();
  const [showMessa, setShowMessa] = useState(false);
  const [showAlertQuill, setShowAlertQuill] = useState(false);
  const [allow, setAllow] = useState(false);
  const author = useSelector((state: any) => state.user);

  const validateName = (values: string) => {
    let name = "";

    if (!values) {
      name = "Required";
    } else if (values.length > 32) {
      name = "The name is too large";
    } else if (values.length < 4) {
      name = "The name is too short";
    }

    return name;
  };

  const validatePrice = (values: number) => {
    let price = "";
    let numValue = Number(values);

    if (!values) {
      price = "Required";
    } else if (numValue > 999999) {
      price = "The name is too large";
    } else if (numValue < 50) {
      price = "The name is too short";
    }

    return price;
  };

  useEffect(() => {
    if (!window) return;
    if (!data?.authorId && !isFetching) {
      router.replace("/");
      return;
    }

    if (data?.authorId !== author.id && !isFetching) router.replace("/");
  }, [data?.authorId]); //eslint-disable-line

  useEffect(() => {
    const anchor = document.getElementById("home-anchor-create_post");
    if (updateresult.status === "uninitialized") return;

    if (updateresult.isSuccess) {
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
      }, 3000);

      //@ts-ignore
      author ? anchor.click() : null;
    } else if (updateresult.isError) {
      setError(updateresult.error);
      setShowMessa(true);

      setTimeout(() => {
        setShowMessa(false);
        setError(undefined);
      }, 3000);
    }
  }, [updateresult]); //eslint-disable-line

  useEffect(() => {
    setTimeout(() => {
      setAllow(true);
    }, 2000);

    setValueQuill(data?.description);

    setImg(data?.image);
  }, [data]); //eslint-disable-line

  return (
    <>
      <Header />

      <main className="flex items-center">
        {data ? (
          <Formik
            initialValues={{
              name: data?.name,
              category: data?.category,
              price: data?.price,
            }}
            onSubmit={(values) => {
              if (valueQuill) {
                updatePost({
                  id: id,
                  prod: {
                    ...values,
                    author: author.username,
                    authorId: author.id,
                    description: valueQuill,
                    image_url: img,
                    time: new Date().getTime(),
                  },
                });
              } else {
                setShowAlertQuill(true);

                setTimeout(() => {
                  setShowAlertQuill(false);
                }, 2000);
              }
            }}
          >
            {() => {
              return (
                <Form className="flex justify-between gap-6 w-full h-[22rem]">
                  <div className="w-[65%] flex flex-col justify-between">
                    <div className="flex gap-4">
                      <div className="w-[70%]">
                        <Field
                          name="name"
                          placeholder="Add a name..."
                          className="w-full border border-[#cacbce] py-[5.5px] pl-2 outline-none text-zinc-900"
                          validate={validateName}
                        />

                        <ErrorMessage
                          className="text-sm font-medium text-red-600"
                          name="name"
                          component="p"
                        />
                      </div>

                      <div className="w-[30%]">
                        <Field
                          name="price"
                          placeholder="Write a price..."
                          className="w-full border border-[#cacbce] py-[5.5px] pl-2 outline-none text-zinc-900"
                          validate={validateName}
                          type="number"
                          min="51"
                          max="999999"
                        />

                        <ErrorMessage
                          className="text-sm font-medium text-red-600"
                          name="price"
                          component="p"
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <ReactQuill
                        className="h-[18rem] w-full max-w-2xl"
                        theme="snow"
                        value={valueQuill}
                        onChange={setValueQuill}
                      />

                      {showAlertQuill ? (
                        <p className="absolute -bottom-5 text-sm font-medium text-red-600">
                          The content is too Short
                        </p>
                      ) : null}
                    </div>
                  </div>

                  <div className="w-[35%] flex flex-col gap-2">
                    <div className="h-[60%] border flex flex-col gap-2 border-[#cacbce] p-2">
                      <h2 className="font-bold text-xl">Publish</h2>
                      <p>
                        <span className="font-medium">Status:</span> Draft
                      </p>
                      <p>
                        <span className="font-medium">Visibility:</span> Public
                      </p>
                      <button
                        type="button"
                        className="w-fit relative underline-offset-1 underline transition-colors hover:text-gray-500 duration-300"
                        onClick={(
                          e: React.MouseEvent<HTMLButtonElement, MouseEvent>
                        ) => {
                          //@ts-ignore
                          e.currentTarget.children[0]?.click();
                        }}
                      >
                        Upload Image
                        <input
                          className="hidden"
                          accept="image/png, image/jpeg"
                          type="file"
                          onChange={(e) => {
                            if (e.currentTarget.files) {
                              const fileReader = new FileReader();
                              if (e.currentTarget.files[0]) {
                                fileReader.readAsDataURL(
                                  e.currentTarget.files[0]
                                );

                                fileReader.addEventListener("load", (e) => {
                                  if (e.target) {
                                    if (typeof e.target.result === "string")
                                      setImg(e.target.result);
                                  }
                                });
                              }
                            }
                          }}
                        />
                      </button>

                      <div className="flex justify-between">
                        {allow ? (
                          <button
                            type="submit"
                            className="bg-[#288d66] text-white py-0.5 px-2 font-medium"
                          >
                            Update
                          </button>
                        ) : (
                          <div className="bg-[#288d66] text-white py-0.5 px-2 font-medium">
                            Update
                          </div>
                        )}

                        <button
                          type="button"
                          onClick={() => {
                            if (allow) {
                              deletePost({
                                id,
                                authorId: data.authorId
                              });
                              document
                                .getElementById("home-anchor-create_post")
                                ?.click();
                            }
                          }}
                          className="border border-[#bb2121] text-[#bb2121] py-0.5 px-2 font-medium"
                        >
                          Delete and Leave
                        </button>
                      </div>
                    </div>

                    <div className="h-[50%] border flex flex-col gap-2 border-[#cacbce] p-2">
                      <h2 className="font-bold text-xl">Category</h2>

                      <div className="grid grid-cols-2">
                        <label className="font-medium">
                          <Field type="radio" name="category" value="art" /> Art
                        </label>

                        <label className="font-medium">
                          <Field type="radio" name="category" value="science" />{" "}
                          Science
                        </label>

                        <label className="font-medium">
                          <Field
                            type="radio"
                            name="category"
                            value="technology"
                          />{" "}
                          Technology
                        </label>

                        <label className="font-medium">
                          <Field type="radio" name="category" value="cinema" />{" "}
                          Cinema
                        </label>

                        <label className="font-medium">
                          <Field type="radio" name="category" value="design" />{" "}
                          Design
                        </label>

                        <label className="font-medium">
                          <Field type="radio" name="category" value="food" />{" "}
                          Food
                        </label>
                      </div>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        ) : null}
      </main>

      {showMessa ? (
        <div
          className={`fixed top-[10%] left-[50%] z-[2000] -translate-x-[50%] rounded-xl py-2 px-4 ${
            error
              ? "border-2 border-red-600 text-red-600"
              : "bg-green-600 text-white"
          }`}
        >
          <p className="font-medium">
            {error
              ? `Status code: ${error.status}, Error: ${
                  error?.data?.error ? error?.data.error : error.data.detail
                }`
              : "The product was succesfully updated"}
          </p>
        </div>
      ) : null}

      <a href="/" id="home-anchor-create_post" className="hidden" />
    </>
  );
}

export default UpdateProduct;
