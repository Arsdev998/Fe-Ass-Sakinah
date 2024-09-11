import React, { useEffect } from "react";
import OrderList from "./OrderList";
import { useGetMyOrderMutation } from "@/redux/api/orderApi";

const OrderUser = () => {
  const [getMyOrder,{ data, isLoading }] = useGetMyOrderMutation();

  useEffect(()=>{
   getMyOrder()
  },[])
  return (
    <section className="pt-2">
      <h1 className="font-bold text-xl">Pesanan Kamu</h1>
      <OrderList orderUser={data} />
    </section>
  );
};

export default OrderUser;
