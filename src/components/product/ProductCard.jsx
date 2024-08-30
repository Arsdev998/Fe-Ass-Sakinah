import React from "react";
import { Link } from "react-router-dom";

const ProductCard = ({ price, title, category, stock, images }) => {
  return (
    <div className="w-[300px]  rounded-sm bg-slate-200">
      <Link to={`/product/${title}`}>
        <img
          src={
            images ||
            "https://img-cdn.pixlr.com/image-generator/history/65bb506dcb310754719cf81f/ede935de-1138-4f66-8ed7-44bd16efc709/medium.webp"
          }
          alt={title}
          className="w-full h-[290px] object-cover"
        />
        <div className="p-2">
          <div className="">
            <p className="font-bold">{title}</p>
            <p className="fonr-semibold text-slate-800">
              Rp {price.toLocaleString("id-ID")}
            </p>
          </div>
          <div className="flex justify-between">
            <p>{category}</p>
            <p>Stok : {stock}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
