import React, { useState } from "react";
import { Button } from "../ui/button";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import {
  useGetCitiesQuery,
  useGetProvincesQuery,
  useGetServicesQuery,
} from "@/redux/api/shippmentApi";
import SelectOptions from "./SelectOptions";

const Order = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [courier, setCourier] = useState("");
  const [subtotal, setSubtotal] = useState(product?.price);
  const origin = "395";
  const { data: provinces, error } = useGetProvincesQuery();
  const { data: cities } = useGetCitiesQuery(province, { skip: !province });
  const { data: services } = useGetServicesQuery(
    {
      origin: origin,
      destination: city,
      weight: product?.weight,
      courier,
    },
    { skip: !courier }
  );

  const increase = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
      setSubtotal(product?.price * (qty + 1));
    }
  };

  const decrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
      setSubtotal(product?.price - (qty - 1));
    }
  };

  console.log(services);
  

  return (
    <div className="w-[400px] h-[400px] p-4 border rounded-md shadow-lg">
      <h2 className="font-bold text-lg">Atur Jumlah</h2>
      <div className="flex flex-col justify-center w-full">
        <div className="flex gap-2 justify-start items-center">
          <Button onClick={decrease} size="icon" variant="ghost">
            <CiCircleMinus className="h-6 w-6 text-red-500" />
          </Button>
          <p className="w-[10px]">{qty}</p>
          <Button onClick={increase} size="icon" variant="ghost">
            <CiCirclePlus className="h-6 w-6 text-green-500" />
          </Button>
          <p>Total Stock: {product.stock}</p>
        </div>
      </div>
      <div className="flex justify-between">
        <p className="font-semibold">Subtotal:</p>
        <p className="font-semibold">Rp {subtotal.toLocaleString("id-ID")}</p>
      </div>
      <SelectOptions
        provinces={provinces}
        cities={cities}
        provinsi={(p) => setProvince(p)}
        kota={(c) => setCity(c)}
        kurir={(k) => setCourier(k)}
      />
    </div>
  );
};

export default Order;
