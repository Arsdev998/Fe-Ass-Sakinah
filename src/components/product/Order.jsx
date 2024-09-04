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
import { useCreateOrderMutation } from "@/redux/api/orderApi";

const Order = ({ product }) => {
  const [qty, setQty] = useState(1);
  const [province, setProvince] = useState("");
  const [city, setCity] = useState("");
  const [courier, setCourier] = useState("");
  const [subtotal, setSubtotal] = useState("");
  const [ongkir, setOngkir] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { isAuth, user } = useSelector((state) => state.auth);
  const origin = "395";
  const [getToken, { isLoading, data, status }] = useGetTokenMutation();
  const [createOrder,{isSuccess,reset}] = useCreateOrderMutation();
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

  const service = servicesData && servicesData?.results[0].costs;

  const total = subtotal + ongkir;
  const orderId = Date.now();
  const token = data?.token

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

  const cartHandler = () => {
    if (!isAuth) {
      return toast.warning("Harap Login terlebih Dahulu");
    }
    if (!address || !phone) {
      return toast.warning("Alamat Harus Diisi");
    }
    const data = {
      orderId: Date.now(),
      amount: total,
      name: user?.name,
      email: user?.email,
    };
    getToken(data);
  };
  const buyHandler = () => {
    if (!isAuth) {
      return toast.warning("Harap Login terlebih Dahulu");
    }
    if (!address || !phone) {
      return toast.warning("Alamat Harus Diisi");
    }
    const data = {
      orderId: orderId,
      amount: total,
      name: user?.name,
      email: user?.email,
    };
    getToken(data)
  };

  const createOrderData = (transactionStatus) => {
  return {
    orderId: orderId,
    user: { ...user, _id: user?._id }, // Make a shallow copy to avoid circular reference
    address: address,
    phone: phone,
    subtotal: subtotal,
    payment: total,
    paymentStatus: transactionStatus,
    shippingCost: ongkir,
    products: [
      {
        productId: product?._id,
        qty: qty,
        totalPrice: subtotal,
        profit: product?.price * qty,
      },
    ],
  };
};

  useEffect(() => {
    if (token) {
      window.snap.pay(token, {
        onSuccess: (result) => {
          const data = {
            orderId: orderId,
            user: user?._id,
            address: address,
            phone: phone,
            subtotal: subtotal,
            payment: total,
            paymentStatus: result.transaction_status,
            shippingCost: ongkir,
            products: [
              {
                productId: product?._id,
                qty: qty,
                totalPrice: subtotal,
                profit: product?.profit * qty,
              },
            ],
          };
          createOrder(data);
        },
        onPending: (result) => {
          const data = {
            orderId: orderId,
            user: user?._id,
            address: address,
            phone: phone,
            subtotal: subtotal,
            payment: total,
            paymentStatus: result.transaction_status,
            shippingCost: ongkir,
            products: [
              {
                productId: product?._id,
                qty: qty,
                totalPrice: subtotal,
                profit: product?.profit * qty,
              },
            ],
          };
          createOrderData(data)
        },
        onError: (error) => {
          toast.error(`Terjadi error ${error}`);
        },
        onClose: () => {
          toast.info("Pembayaran belum dilakukan, segera lakukan Pembayaran");
        },
      });
    }
  }, [token]);

  useEffect(() => {
    const midtransScriptUrl = import.meta.env.VITE_MIDTRANS_SCRIPT_URL;
    let scriptTag = document.createElement("script");
    scriptTag.src = midtransScriptUrl;

    const myMidtransClientKey = import.meta.env.VITE_MIDTRANS_CLIENT_KEY;
    scriptTag.setAttribute("data-client-key", myMidtransClientKey);

    document.body.appendChild(scriptTag);

    return () => {
      document.body.removeChild(scriptTag);
    };
  }, []);

  useEffect(()=>{
   if(isSuccess){
    reset()
   }
  },[isSuccess,reset])


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
        alamat={setAddress}
        hp={setPhone}
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
        <Button variant="destructive" onClick={buyHandler} disabled={isLoading}>
          {isLoading ? "Loading.." : "Beli"}
        </Button>
      </div>
    </div>
  );
};

export default Order;
