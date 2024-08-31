import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => "/api/products/get",
    }),
    getProduct: builder.query({
        query:(name) => `/api/product/get/${name}` 
    })
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productApi;
