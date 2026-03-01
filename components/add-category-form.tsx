"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { createCategoryAction } from "@/server action/admin.action";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Layers, Loader2 } from "lucide-react";

const categorySchema = z.object({
  name: z.string().min(2, {
    message: "Category name must be at least 2 characters.",
  }),
});

type CategoryFormValues = z.infer<typeof categorySchema>;

export function AddCategoryForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CategoryFormValues>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (data: CategoryFormValues) => {
    setIsLoading(true);
    try {
      const res = await createCategoryAction(data as any);

      console.log("this is res from add category", res.data);

      if(res?.data?.success === false && res?.data?.details.code === "P2002"){
        toast.error("Category already exists");
        return;
      }

      if (res?.error) {
        toast.error(res.error.message || "Failed to create category");
      } else {
        toast.success("Category created successfully!");
        reset();
        router.push("/dashboard/manageCategories");
        router.refresh();
      }
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-[80vh] w-full items-center justify-center p-4">
      <Card className="mx-auto w-full max-w-md shadow-lg border-muted/60">
        <CardHeader className="space-y-2 text-center">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
            <Layers className="h-6 w-6 text-primary" />
          </div>
          <CardTitle className="text-2xl font-bold tracking-tight">
            Add New Category
          </CardTitle>
          <CardDescription className="text-muted-foreground">
            Create a new category for your products.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name" className="text-sm font-medium">
                Category Name
              </Label>
              <Input
                id="name"
                placeholder="e.g. Banglali, Chinese, Indian..."
                className="h-11 shadow-sm transition-colors focus-visible:ring-primary"
                {...register("name")}
                disabled={isLoading}
              />
              {errors.name && (
                <p className="text-sm font-medium text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>
            <Button
              type="submit"
              className="w-full h-11 font-medium transition-all"
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Category"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
