"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getMyCart } from "@/server action/cart.action";
import { cartService } from "@/services/cart.service";
import Link from "next/link";
import { Button } from "./button";

const invoices = [
  {
    invoice: "INV001",
    paymentStatus: "Paid",
    totalAmount: "$250.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV002",
    paymentStatus: "Pending",
    totalAmount: "$150.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV003",
    paymentStatus: "Unpaid",
    totalAmount: "$350.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV004",
    paymentStatus: "Paid",
    totalAmount: "$450.00",
    paymentMethod: "Credit Card",
  },
  {
    invoice: "INV005",
    paymentStatus: "Paid",
    totalAmount: "$550.00",
    paymentMethod: "PayPal",
  },
  {
    invoice: "INV006",
    paymentStatus: "Pending",
    totalAmount: "$200.00",
    paymentMethod: "Bank Transfer",
  },
  {
    invoice: "INV007",
    paymentStatus: "Unpaid",
    totalAmount: "$300.00",
    paymentMethod: "Credit Card",
  },
];

export function TableComponent() {
  const [cartData, setCartData] = useState<any>(null);
  const [cartError, setCartError] = useState<any>(null);

  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } = await getMyCart();
      setCartData(data);
      setCartError(error);
    };
    fetchCart();
  }, []);

  // console.log("this is cart data", cartData?.data);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Action</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartData?.data?.map((invoice: any) => (
          <TableRow key={invoice.id}>
            <TableCell className="font-medium">{invoice.id}</TableCell>
            <TableCell className="font-medium">{invoice.mealName}</TableCell>
            <TableCell>{invoice.status}</TableCell>
            <TableCell>
                {/* <Button><Link href={`/cart/checkout/${invoice.id}`}>CheckOut</Link></Button> */}
                {
                  invoice.deliveryAddress ? (
                    <Button disabled>CheckOut Completed</Button>
                  ) : (
                    <Button><Link href={`/cart/checkout/${invoice.id}`}>CheckOut</Link></Button>
                  )
                }
            </TableCell>
            <TableCell className="text-center">{invoice.quantity}</TableCell>
            <TableCell className="text-right">{invoice.price}tk</TableCell>
          </TableRow>
        ))}
      </TableBody>
     
    </Table>
  );
}
