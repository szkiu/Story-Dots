import { configureStore } from "@reduxjs/toolkit";
import { productsApi } from "./services/products";
import { accountApi } from "./services/account";
import userSlice from "./slices/user.slice";

export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
    user: userSlice,
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware().concat(accountApi.middleware, productsApi.middleware)
  ),
});
