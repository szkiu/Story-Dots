import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Product } from "../../interface/Product";
import Env from "@/constants/Env";

export const productsApi: any = createApi({
  reducerPath: "productsApi",

  baseQuery: fetchBaseQuery({
    baseUrl: Env.baseUrlProduct,
  }),

  endpoints: (builder: any) => ({
    getProducts: builder.query({
      query: (page: number) => `/?page=${page}`,
    }),

    getProductById: builder.query({
      query: (id: string) => `/${id}`,
    }),

    getProductsByCat: builder.query({
      query: ({ cat, page }: { cat: string; page: number }) =>
        `/cat/${cat}?page=${page}`,
    }),

    getProductsByAuthor: builder.mutation({
      query: ({ author, page }: { author: string; page: number }) =>
        `/author/${author}?page=${page}`,
    }),

    createProduct: builder.mutation({
      query: (prod: Product) => ({
        url: "/",
        body: prod,
        method: "POST",
        credentials: 'include',
        mode: 'cors'
      }),
    }),

    updateProduct: builder.mutation({
      query: ({ id, prod }: { id: string; prod: Product }) => ({
        url: `/${id}`,
        body: prod,
        method: "PUT",
        credentials: 'include',
        mode: 'cors'
      }),
    }),

    deleteProduct: builder.mutation({
      query: ({id, authorId}: {id: string, authorId: string}) => ({
        url: `/?id=${id}&authorId=${authorId}`,
        method: "DELETE",
        credentials: 'include',
        mode: 'cors'
      }),
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductByIdQuery,
  useGetProductsByCatQuery,
  useGetProductsByAuthorMutation,
  useCreateProductMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
} = productsApi;
