import React, { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";
import {
  useGetCitiesQuery,
  useGetProvincesQuery,
  useGetServicesQuery,
} from "@/redux/api/shippmentApi";
import SelectOptions from "./SelectOptions";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { useGetTokenMutation } from "@/redux/api/paymentApi";

const Order = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [courier, setCourier] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [ongkir, setOngkir] = useState("");
  const [address, setAddress] = useState("")
  const origin = "395";
  const [getToken,{isLoading}] = useGetTokenMutation()
  const { data: provinces, error } = useGetProvincesQuery();
  const { data: cities } = useGetCitiesQuery(province, { skip: !province });
  const { data: servicesData } = useGetServicesQuery(
    {
      origin: origin,
      destination: city,
      weight: product?.weight,
      courier,
    },
    { skip: !courier }
  );

  const {isAuth} = useSelector((state) => state.auth)

  const service = servicesData && servicesData?.results[0].costs;

  const total = subtotal + ongkir;

  const increase = () => {
    if (qty < product.stock) {
      setQty(qty + 1);
      setSubtotal(product?.price * (qty + 1));
    }
  };
  const decrease = () => {
    if (qty > 1) {
      setQty(qty - 1);
      setSubtotal(product?.price * (qty - 1));
    }
  };
  useEffect(() => {
    if (product) {
      setSubtotal(product.price);
    }
  }, [product]);

  const cartHandler = () =>{
     if(!isAuth){
      toast.warning("Harap Login terlebih Dahulu")
     }
     if(!address){
      toast.warning("Alamat Harus Diisi")
     }
  }
  const buyHandler = () =>{
     if(!isAuth){
      toast.warning("Harap Login terlebih Dahulu")
     }
      if (!address) {
        toast.warning("Alamat Harus Diisi");
      }
  }

  return (
    <div className="w-[400px] p-4 border rounded-md shadow-lg">
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
        layanan={(e) => setOngkir(e)}
        services={service}
        alamat={(a)=> setAddress(a)}
      />
      <div className="flex flex-col gap-1 p-2">
        <div className="flex justify-between font-semibold">
          <p>Ongkir</p>
          <p>Rp {parseFloat(ongkir ? ongkir : 0).toLocaleString("id-ID")}</p>
        </div>
        <div className="flex justify-between font-semibold">
          <p>Subtotal</p>
          <p className="text-red-400">
            Rp {parseFloat(total).toLocaleString("id-ID")}
          </p>
        </div>
        <Button onClick={cartHandler}>Masukan Keranjang</Button>
        <Button variant="destructive">Beli</Button>
      </div>
    </div>
  );
};

export default Order;
