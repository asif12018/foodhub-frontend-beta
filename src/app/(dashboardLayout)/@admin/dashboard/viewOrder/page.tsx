import { getAllOrderAction } from "@/server action/admin.action";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default async function ViewOrderPage() {
  const { data, error } = await getAllOrderAction();


  // Defaulting to empty array. We use data.data based on typical response shape, or fallback to data.
  const orders = data?.data || (Array.isArray(data) ? data : []);

  return (
    <div className="p-4 md:p-8 w-full">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold tracking-tight">Manage Orders</h1>
      </div>

      <div className="rounded-md border bg-card">
        <Table>
          <TableCaption>
            A comprehensive list of all customer orders.
          </TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[120px]">Order ID</TableHead>
              <TableHead>MealName</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Total Amount</TableHead>
              
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders && orders.length > 0 ? (
              orders.map((order: any, index: number) => (
                <TableRow key={order.id || index}>
                  <TableCell className="font-medium">
                    {order.id || order.orderId || `#ORD-${index + 1}`}
                  </TableCell>
                  <TableCell>
                    {order?.mealName}
                  </TableCell>
                  <TableCell>
                    <span className="px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300">
                      {order.status || "Pending"}
                    </span>
                  </TableCell>
                  <TableCell>
                    {order.totalPrice || order.totalAmount || order.price
                      ? `${order.totalPrice || order.totalAmount || order.price} tk`
                      : "N/A"}
                  </TableCell>
                
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="h-24 text-center text-muted-foreground"
                >
                  No orders found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
