import { useGetProductQuery } from "@/redux/api/productApi";
import React from "react";
import { useParams } from "react-router-dom";
import Order from "./Order";

const DetailProduct = () => {
  const params = useParams();

  const { data, error, isLoading } = useGetProductQuery(params.name);
  console.log(data);

  return (
    <>
      {isLoading ? (
        <p>loadinggg</p>
      ) : (
        <section className="flex p-4 justify-center gap-2">
          <div className="max-w-[800px] gap-4 flex">
            <img
              src={data?.images[0].link}
              alt={data?.name}
              className="w-[350px] h-[400px] object-cover rounded-md"
            />
            <div className="">
              <p className="font-bold text-lg">{data?.name}</p>
              <p>
                Berat: <span className="font-semibold">{data?.weight}</span>{" "}
              </p>
              <p className="font-bold">
                Rp {data?.price.toLocaleString("id-ID")}
              </p>
              <p>{data?.desc}</p>
            </div>
          </div>
          <Order product={data} />
        </section>
      )}
    </>
  );
};

export default DetailProduct;
