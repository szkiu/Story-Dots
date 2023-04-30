import React from "react";
import Link from "next/link";
import { Product } from "@/interface/Product";

function RecoProducts({ catProducts }: { catProducts?: Product[] }) {
  return (
    <aside className="w-[30%] flex flex-col gap-4 sticky top-0 self-start pt-4">
      <h3 className="font-bold text-xl text-zinc-700">
        Other post you may like
      </h3>

      <div id="recomended-products" className="h-[26rem] grid gap-12 overflow-y-scroll">
        {catProducts?.map((prod: Product, i: number) => {
          return (
            <div key={prod.id} className="grid gap-3">
              <div className="relative h-[12rem] w-full">
                <img
                  className="h-[12rem] w-full"
                  src={prod.image_url}
                  alt={prod.name}
                />
              </div>

              <h3 className="font-bold text-lg text-zinc-700">{prod.name}</h3>

              <Link
                href={`/user/${prod.id}`}
                className="w-fit h-fit py-0.5 px-1.5 border-2 font-medium text-[#477cc2] border-[#477cc2]"
              >
                Read More
              </Link>
            </div>
          );
        })}
      </div>
    </aside>
  );
}

export default RecoProducts;
