import { TableComponent } from "@/components/ui/tableComponent";

export default function UserCartPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-2xl font-bold">My Cart</h2>
      </div>
      <div className="rounded-xl border bg-card p-4">
        <TableComponent />
      </div>
    </div>
  );
}
