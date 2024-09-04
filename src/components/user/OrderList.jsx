import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { FaCommentDots } from "react-icons/fa";
import { MdCloudSync } from "react-icons/md";
import { Button } from "../ui/button";

const header = [
  {
    name: "Order Id",
  },
  {
    name: "Detail",
  },
  {
    name: "Date",
  },
  {
    name: "Order Status",
  },
  {
    name: "Status Pembayaran",
  },
  {
    name: "Resi",
  },
  {
    name: "Ongkos Kirim",
  },
  {
    name: "Total",
  },
  {
    name: "Action",
  },
];

const OrderList = ({ orderUser }) => {
  return (
    <>
      <Table className="border border-black">
        <TableHeader>
          <TableRow className="border border-black text-center">
           {header.map((header, index) => (
             <TableHead key={index}>{header.name}</TableHead>
           ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {orderUser?.map((order, index) => {
            const date = new Date(order.createdAt);
            const formatedDate = date.toLocaleString("id-ID");
            return (
              <TableRow key={index} className="border border-black">
                <TableCell>{order.orderId}</TableCell>
                <TableCell>Lihat detail</TableCell>
                <TableCell>{formatedDate}</TableCell>
                <TableCell>{order.orderStatus}</TableCell>
                <TableCell>{order.paymentStatus}</TableCell>
                <TableCell>{order.resi ? order.resi : "-"}</TableCell>
                <TableCell>
                  Rp {order.shippingCost.toLocaleString("id-ID")}
                </TableCell>
                <TableCell>
                  Rp {order.payment.toLocaleString("id-ID")}
                </TableCell>
                <TableCell className="space-x-1">
                  <Button variant="ghost" size="icon">
                    <MdCloudSync />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <FaCommentDots />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </>
  );
};

export default OrderList;
