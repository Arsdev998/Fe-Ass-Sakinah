import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./slice/authSlice.js";
import { productApi } from "./api/productApi.js";
import { shipmentApi } from "./api/shippmentApi.js";
import { paymentApi } from "./api/paymentApi.js";
import { orderApi } from "./api/orderApi.js";

const store = configureStore({
  reducer: {
    auth: authSlice,
    [productApi.reducerPath]: productApi.reducer,
    [shipmentApi.reducerPath]: shipmentApi.reducer,
    [paymentApi.reducerPath]:paymentApi.reducer,
    [orderApi.reducerPath]:orderApi.reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat([
      productApi.middleware,
      shipmentApi.middleware,
      paymentApi.middleware,
      orderApi.middleware
    ]),
});

export default store;
