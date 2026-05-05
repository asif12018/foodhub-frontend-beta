import { OrderTableComponent } from "@/components/module/order-section/orderTable";

export default function ProviderOrdersPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">Received Orders</h2>
        <p className="text-sm text-muted-foreground">Manage and update your incoming orders</p>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <OrderTableComponent />
      </div>
    </div>
  );
}
