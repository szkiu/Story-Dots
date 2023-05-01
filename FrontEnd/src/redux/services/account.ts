import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { User } from "../../interface/User";
import { Env } from "@/constants/Env";

export const accountApi: any = createApi({
  reducerPath: "accountApi",

  baseQuery: fetchBaseQuery({
    baseUrl: Env.baseUrlAuth,
  }),

  endpoints: (builder) => ({
    getMe: builder.query({
      query: () => ({
        url: `/me/cookie`,
        credentials: "include",
        mode: "cors",
      }),
    }),

    getUserById: builder.query({
      query: (id) => ({
        url: `/id/${id}`,
        credentials: "include",
        mode: "cors",
      }),
    }),

    signIn: builder.mutation({
      query: (user: User) => ({
        url: "/register",
        body: user,
        method: "POST",
        credentials: "include",
        mode: "cors",
      }),
    }),

    logIn: builder.mutation({
      query: (user: User) => ({
        url: "/login",
        body: user,
        method: "POST",
        credentials: "include",
        mode: "cors",
      }),
    }),

    deleteUser: builder.mutation({
      query: (id: string) => ({
        url: `/user`,
        method: "DELETE",
        credentials: "include",
        mode: "cors",
      }),
    }),
  }),
});

export const {
  useGetMeQuery,
  useGetUserByIdQuery,
  useLogInMutation,
  useSignInMutation,
  useDeleteUserMutation,
} = accountApi;
