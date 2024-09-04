import { useGetMyOrderQuery } from "@/redux/api/orderApi";
import React from "react";
import OrderList from "./OrderList";

const OrderUser = () => {
  const { data, isLoading } = useGetMyOrderQuery();
  console.log(data);

  return (
    <section className="pt-2">
      <h1 className="font-bold text-xl">Pesanan Kamu</h1>
      <OrderList orderUser={data} />
    </section>
  );
};

export default OrderUser;
