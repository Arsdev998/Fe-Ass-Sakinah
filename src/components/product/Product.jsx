import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import { useGetProductsQuery } from "@/redux/api/productApi";

const Product = () => {
  const { data, error, isLoading } = useGetProductsQuery();

  console.log(data);

  return (
    <section className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        {error ? (
          <h1>error</h1>
        ) : isLoading ? (
          <h2>Loading...</h2>
        ) : (
          data.map((item) => {
            return (
              <ProductCard
                key={item._id}
                title={item.name}
                price={item.price}
                category={item.category}
                stock={item.stock}
                images={item.images[0].link}
              />
            );
          })
        )}
      </div>
    </section>
  );
};

export default Product;
