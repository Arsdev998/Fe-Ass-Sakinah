import { axiosInstance } from "@/lib/axios";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";

const Product = () => {
  const [data, setData] = useState([]);

  const fetchProduct = async () => {
    try {
      const response = await axiosInstance.get("/products/get");
      setData(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchProduct();
  }, []);
  return (
    <section className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item) => {
          return <ProductCard title={item.name} price={item.price} />;
        })}
      </div>
    </section>
  );
};

export default Product;
