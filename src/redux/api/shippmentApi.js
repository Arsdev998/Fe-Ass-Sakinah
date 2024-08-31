import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const shipmentApi = createApi({
  reducerPath: "shipmentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}`,
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getProvinces: builder.query({
      query: () => "/api/ongkir/provinces",
    }),
    getCities: builder.query({
      query: (province_id) => `/api/ongkir/city/${province_id}`,
    }),
    getServices: builder.query({
      query: (origin, destination, weight, courier) =>
        `/api/ongkir/cost/${origin}/${destination}/${weight}/${courier}`,
    }),
  }),
});

export const { useGetProvincesQuery, useGetCitiesQuery, useGetServicesQuery } = shipmentApi;


