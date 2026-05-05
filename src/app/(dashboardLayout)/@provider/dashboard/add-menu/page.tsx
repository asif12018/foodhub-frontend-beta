import { AddMenuForm } from "@/components/module/add-menu/addMenuForm";

export default function ProviderAddMenuPage() {
  return (
    <div className="flex flex-1 flex-col gap-4 p-4">
      <div className="mb-2">
        <h2 className="text-2xl font-bold">Add New Menu Item</h2>
        <p className="text-sm text-muted-foreground">Add a new meal to your restaurant menu</p>
      </div>
      <div className="container mx-auto">
        <AddMenuForm />
      </div>
    </div>
  );
}
