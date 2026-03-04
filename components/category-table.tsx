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

export default function CategoryTable({
  value,
}: {
  value: CategorySingleData[];
}) {
  const router = useRouter();
  //deletation function start from here
  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCategoryAction(id);
      // console.log("this is res from deleteCategory", res);
      if (res?.error) {
        gooeyToast.error('Failed to delete category !!!', {
  preset: 'smooth',
})
      } else {
        gooeyToast.success('category deleted successfully!!!', {
  preset: 'smooth',
})
        router.refresh();
      }
    } catch (err: any) {
     gooeyToast.error('Something went wrong !!!', {
  preset: 'smooth',
})
    }
  };

  //restore deleted category
  const handleRestoreCategory = async (id: string) => {
    try {
      const res = await restoreDeletedCategory(id);
      // console.log("this is res from restoreDeletedCategory", res);
      if (res?.error) {
       gooeyToast.error('Failed to restore category !!!', {
  preset: 'smooth',
})
      } else {
        gooeyToast.success("Category restore successfully !!!", {
          preset: "smooth",
        });
        router.refresh();
      }
    } catch (err: any) {
      gooeyToast.error('Something went wrong !!!', {
  preset: 'smooth',
})
    }
  };

  return (
    <div className="w-full">
      <GooeyToaster position="top-center" />
      <div className="w-full overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="pl-4">ID</TableHead>
              <TableHead>Name</TableHead>

              <TableHead>isDeleted</TableHead>
              <TableHead>Edit</TableHead>
              <TableHead>Delete</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {value?.map((product) => (
              <TableRow
                className={
                  product?.isDeleted
                    ? "bg-red-500/10 hover:bg-red-500/20"
                    : "odd:bg-muted/50"
                }
                key={product?.id}
              >
                <TableCell className="pl-4">{product?.id}</TableCell>
                <TableCell className="pl-4">{product?.name}</TableCell>

                <TableCell>{product?.isDeleted ? "true" : "false"}</TableCell>
                <TableCell>
                  <Button>
                    <Link href={`/dashboard/manageCategories/${product?.id}`}>
                      Edit
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>
                  {/* <Button
                    disabled={product?.isDeleted === true}
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500"
                  >
                    {product?.isDeleted ? "you already deleted it" : "Delete"}
                  </Button> */}
                  {product?.isDeleted ? (
                    <Button
                      onClick={() => handleRestoreCategory(product.id)}
                      className="bg-green-500"
                    >
                      Restore
                    </Button>
                  ) : (
                    <Button
                      onClick={() => handleDelete(product.id)}
                      className="bg-red-500"
                    >
                      Delete
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
