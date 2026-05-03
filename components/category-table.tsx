"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import foodSingleData from "@/src/constants/food.types";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  deleteCategoryAction,
  restoreDeletedCategory,
} from "@/server action/admin.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { CategorySingleData } from "@/src/constants/category.types";
import { GooeyToaster, gooeyToast } from "goey-toast";
import "goey-toast/styles.css";

const products = [
  {
    id: 101,
    name: "Wireless Headphones",
    category: "Electronics",
    price: 59.99,
    rating: 4.5,
  },
  {
    id: 102,
    name: "Yoga Mat",
    category: "Sports & Fitness",
    price: 25.0,
    rating: 4.8,
  },
  {
    id: 103,
    name: "Coffee Maker",
    category: "Home Appliances",
    price: 80.0,
    rating: 4.2,
  },
  {
    id: 104,
    name: "Running Shoes",
    category: "Sportswear",
    price: 70.0,
    rating: 4.6,
  },
  {
    id: 105,
    name: "Smartwatch",
    category: "Electronics",
    price: 120.0,
    rating: 4.7,
  },
];

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
  ColumnDef,
} from "@tanstack/react-table";
import { Input } from "@/components/ui/input";
import * as React from "react";

export default function CategoryTable({
  value,
}: {
  value: CategorySingleData[];
}) {
  const router = useRouter();

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategoryAction(id);
      if (res?.error) {
        gooeyToast.error('Failed to delete category !!!', { preset: 'smooth' });
      } else {
        gooeyToast.success('Category deleted successfully!!!', { preset: 'smooth' });
        router.refresh();
      }
    } catch (err: any) {
      gooeyToast.error('Something went wrong !!!', { preset: 'smooth' });
    }
  };

  const handleRestoreCategory = async (id: string) => {
    try {
      const res = await restoreDeletedCategory(id);
      if (res?.error) {
        gooeyToast.error('Failed to restore category !!!', { preset: 'smooth' });
      } else {
        gooeyToast.success("Category restored successfully !!!", { preset: "smooth" });
        router.refresh();
      }
    } catch (err: any) {
      gooeyToast.error('Something went wrong !!!', { preset: 'smooth' });
    }
  };

  const columns: ColumnDef<CategorySingleData>[] = [
    {
      accessorKey: "id",
      header: "ID",
      cell: ({ row }) => <div className="pl-4">{row.getValue("id")}</div>,
    },
    {
      accessorKey: "name",
      header: "Name",
      cell: ({ row }) => <div className="pl-4">{row.getValue("name")}</div>,
    },
    {
      accessorKey: "isDeleted",
      header: "isDeleted",
      cell: ({ row }) => (row.getValue("isDeleted") ? "true" : "false"),
    },
    {
      id: "edit",
      header: "Edit",
      cell: ({ row }) => {
        const category = row.original;
        return (
          <Button asChild>
            <Link href={`/dashboard/manageCategories/${category.id}`}>
              Edit
            </Link>
          </Button>
        );
      },
    },
    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => {
        const category = row.original;
        return category.isDeleted ? (
          <Button
            onClick={() => handleRestoreCategory(category.id)}
            className="bg-green-500"
          >
            Restore
          </Button>
        ) : (
          <Button
            onClick={() => handleDelete(category.id)}
            className="bg-red-500"
          >
            Delete
          </Button>
        );
      },
    },
  ];

  const [globalFilter, setGlobalFilter] = React.useState("");

  const table = useReactTable({
    data: value || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      globalFilter,
    },
    onGlobalFilterChange: setGlobalFilter,
  });

  return (
    <div className="w-full">
      <GooeyToaster position="top-center" />
      
      <div className="flex items-center py-4">
        <Input
          placeholder="Search categories..."
          value={globalFilter ?? ""}
          onChange={(event) => setGlobalFilter(String(event.target.value))}
          className="max-w-sm"
        />
      </div>

      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className={header.index === 0 ? "pl-4" : ""}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className={row.original.isDeleted ? "bg-red-500/10 hover:bg-red-500/20" : "odd:bg-muted/50"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
