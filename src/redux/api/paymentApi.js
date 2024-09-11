import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const paymentApi = createApi({
  reducerPath: "paymentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/payment`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getToken: builder.mutation({
      query: (body) => ({
        url: "/process-transaction",
        method: "POST",
        body,
      }),
    }),
    updateStatus: builder.mutation({
      query: (id) => `/status/${id}` ,
      method:'GET'
    })
  }),
});

export const { useGetTokenMutation ,useUpdateStatusMutation} = paymentApi;
