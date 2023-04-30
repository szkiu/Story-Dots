import React from "react";
import ButtonsProduct from "./ButtonsProduct";
import getTime from "@/utilities/getTime";

function ShowProducts({
  name,
  author,
  category,
  time,
  description,
  image_url,
  isPair,
  id,
  author_id,
  price,
}: {
  name: string;
  author: string;
  category: string;
  time: number;
  description: string;
  image_url?: string;
  isPair: boolean;
  author_id: string;
  id: string;
  price: number;
}) {
  function createMarkup() {
    return {
      __html:
        description.length < 200
          ? description
          : `${description.slice(0, 200)}...`,
    };
  }

  return (
    <>
      {isPair ? (
        <div className="flex gap-16">
          <div className="w-[60%] grid gap-4">
            <h2 className="font-bold text-4xl">{name}</h2>
            <div
              className="font-medium text-zinc-900 w-full line-break-anywhere"
              dangerouslySetInnerHTML={createMarkup()}
            />

            <div className="flex flex-col gap-0.5 text-sm">
              <p className="font-medium">
                <span className="text-[#28a0c2]">Category:</span>{" "}
                {category.slice(0, 1).toUpperCase() + category.slice(1)}
              </p>

              <p className="font-medium">
                <span className="text-[#28a0c2]">Author:</span> {author}
              </p>

              <p className="font-medium">
                {/* @ts-ignore */}
                {getTime(time)}
              </p>
            </div>

            <ButtonsProduct id={id} author_id={author_id} />
          </div>

          <div className="relative h-[18rem] w-[18rem]">
            <img className="h-[18rem] w-full" src={image_url} alt={name} />
            {image_url ? (
              <div className="bg-[#4bb6dd]/40 -z-10 absolute top-3 -left-3 w-full h-full" />
            ) : null}
          </div>
        </div>
      ) : (
        <div className="flex gap-16 justify-between">
          <div className="relative h-[18rem] w-[18rem]">
            <img className="h-[18rem] w-full" src={image_url} alt={name} />
            {image_url ? (
              <div className="bg-[#4bb6dd]/40 -z-10 absolute top-3 -right-3 w-full h-full" />
            ) : null}
          </div>

          <div className="w-[50%] grid gap-2 text-right justify-items-end">
            <h2 className="font-bold text-4xl">{name}</h2>
            <div
              className="font-medium text-zinc-900 line-break-anywhere"
              dangerouslySetInnerHTML={createMarkup()}
            />

            <div className="flex flex-col gap-0.5 text-sm">
              <p className="font-medium">
                <span className="text-[#28a0c2]">Category:</span>{" "}
                {category.slice(0, 1).toUpperCase() + category.slice(1)}
              </p>

              <p className="font-medium">
                <span className="text-[#28a0c2]">Author:</span> {author}
              </p>

              <p className="font-medium">
                {/* @ts-ignore */}
                {getTime(time)}
              </p>
            </div>

            <ButtonsProduct id={id} author_id={author_id} />
          </div>
        </div>
      )}
    </>
  );
}

export default ShowProducts;
