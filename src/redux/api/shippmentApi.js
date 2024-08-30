import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shipmentApi = createApi({
  reducerPath: "shipmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    credentials: "include",
  }),
  endpoints : (builder)=>{
    getProvinces: builder.query({
        query:() => "/provinces"
    })
  }
});
