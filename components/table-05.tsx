"use client";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
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
import { deleteMenuAction } from "@/server action/food.action";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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

export default function TableWithPaginationDemo({
  value,
}: {
  value: foodSingleData[];
}) {
  const router = useRouter();
  //deletation function start from here
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteMenuAction(id);
      console.log("this is res from deletemenu", res);
      if (res.error) {
        toast.error(res.error.message);
      } else {
        toast.success("Menu deleted successfully");
        router.refresh();
      }
    } catch (err: any) {
      toast.error(err.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full">
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Product Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Price (BDT)</TableHead>
              <TableHead>Discount Price (BDT)</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value?.map((product) => (
              <TableRow className="odd:bg-muted/50" key={product?.id}>
                <TableCell className="pl-4">{product?.id}</TableCell>
                <TableCell className="font-medium">{product.name}</TableCell>
                <TableCell>{product?.category?.name}</TableCell>
                <TableCell>{product?.price}tk</TableCell>
                <TableCell>
                  {product?.discountPrice ? product?.discountPrice : "N/A"} tk
                </TableCell>
                <TableCell>
                  <Button>
                    <Link href={`/my-menu/${product?.id}`}>Edit</Link>
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500"
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
