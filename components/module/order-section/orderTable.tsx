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

import { Button } from "@/components/ui/button";
import {
  getProviderAllOrder,
  updateOrderStatusAction,
} from "@/server action/order.action";
import { toast } from "sonner";



export function OrderTableComponent() {
  const [cartData, setCartData] = useState<any>(null);
  const [cartError, setCartError] = useState<any>(null);
  const [status, setStatus] = useState("PREPARING");
  const [productId, setProductId] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const { data, error } = await getProviderAllOrder();
      setCartData(data);
      setCartError(error);
      console.log("this is cart data", data);
    };
    fetchCart();
  }, []);

  const handleStatusChange = async (productId: string, status: string) => {
    console.log("Selected Product ID:", productId);
    console.log("Selected Status:", status);
    const { data, error } = await updateOrderStatusAction(productId, status);
    console.log("this is data", data);
    console.log("this is error", error);
    if (data) {
      toast.success("Status updated successfully");

      // Update the local state so the table immediately shows the new status
      setCartData((prevData: any) => {
        if (!prevData || !prevData.data) return prevData;

        return {
          ...prevData,
          data: prevData.data.map((invoice: any) =>
            invoice.id === productId ? { ...invoice, status: status } : invoice,
          ),
        };
      });
    }
    if (error) {
      toast.error("Failed to update status");
    }
  };

  // console.log("this is cart data", cartData?.data);
  return (
    <Table>
      <TableCaption>A list of your recent invoices.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Invoice</TableHead>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center justify-center">Action</TableHead>
          <TableHead className="text-center">Quantity</TableHead>
          <TableHead className="text-right">Amount</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {cartData?.data?.map((invoice: any) => (
          <TableRow key={invoice?.id}>
            <TableCell className="font-medium">{invoice?.id}</TableCell>
            <TableCell className="font-medium">{invoice?.mealName}</TableCell>
            <TableCell>{invoice?.status}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <select
                  className="flex h-9 w-[130px] items-center justify-between rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
                  defaultValue={invoice.status}
                  onChange={(e) => {
                    setStatus(e.target.value);
                    setProductId(invoice.id);
                  }}
                >
                  <option value="PREPARING">PREPARING</option>
                  <option value="READY">READY</option>
                  <option value="CANCELLED">CANCELLED</option>
                  <option value="DELIVERED">DELIVERED</option>
                </select>
                <Button
                  size="sm"
                  onClick={() =>
                    handleStatusChange(
                      invoice.id,
                      invoice.id === productId ? status : invoice.status,
                    )
                  }
                >
                  Submit
                </Button>
              </div>
            </TableCell>
            <TableCell className="text-center">{invoice?.quantity}</TableCell>
            <TableCell className="text-right">
              {invoice?.totalPrice}tk
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
