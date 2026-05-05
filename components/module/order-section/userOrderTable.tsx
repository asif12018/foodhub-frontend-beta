"use client";
import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { getUserMyOrders } from "@/server action/order.action";
import { toast } from "sonner";
import { PackageOpen } from "lucide-react";

const statusVariant: Record<string, "default" | "secondary" | "destructive" | "outline"> = {
  PREPARING: "secondary",
  READY: "default",
  CANCELLED: "destructive",
  DELIVERED: "outline",
};

export function UserOrderTable() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data, error } = await getUserMyOrders();
      setLoading(false);
      if (error) {
        toast.error("Failed to fetch orders");
        return;
      }
      setOrders(data?.data || []);
    };
    fetch();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20 text-muted-foreground">
        Loading orders…
      </div>
    );
  }

  if (!orders.length) {
    return (
      <div className="flex flex-col items-center justify-center py-20 gap-4 text-muted-foreground">
        <PackageOpen className="w-16 h-16 opacity-30" />
        <p className="text-lg font-medium">No orders found.</p>
        <p className="text-sm">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <Table>
      <TableCaption>A list of your recent orders.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Order ID</TableHead>
          <TableHead>Meal Name</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Qty</TableHead>
          <TableHead className="text-right">Price</TableHead>
          <TableHead className="text-right">Total</TableHead>
          <TableHead>Delivery Address</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {orders.map((order: any) => (
          <TableRow key={order.id}>
            <TableCell className="font-mono text-xs">{order.id}</TableCell>
            <TableCell className="font-medium">{order.mealName}</TableCell>
            <TableCell>
              <Badge variant={statusVariant[order.status] ?? "secondary"}>
                {order.status}
              </Badge>
            </TableCell>
            <TableCell className="text-center">{order.quantity}</TableCell>
            <TableCell className="text-right">{order.price}tk</TableCell>
            <TableCell className="text-right">{order.totalPrice}tk</TableCell>
            <TableCell className="max-w-[160px] truncate text-muted-foreground">
              {order.deliveryAddress || "—"}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
