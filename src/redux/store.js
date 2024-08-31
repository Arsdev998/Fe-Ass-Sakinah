import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice.js";
import { productApi } from "./api/productApi.js";
import { shipmentApi } from "./api/shippmentApi.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [productApi.reducerPath]: productApi.reducer,
    [shipmentApi.reducerPath]: shipmentApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      shipmentApi.middleware,
    ]),
});

export default store;
