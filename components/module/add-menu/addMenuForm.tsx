"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { getAllCategory } from "@/server action/category.action";

const formSchema = z.object({
  category_id: z.string().min(1, "Category is required"),
  name: z.string().min(3, "Name must be at least 3 characters long"),
  description: z
    .string()
    .min(5, "Description must be at least 3 characters long"),
  price: z.number().min(1, "Price must be at least 1"),
  discountPrice: z.number().min(0, "Discount price must be at least 0"),
  prepTimeMinutes: z.number().min(1, "Preparation minutes must be at least 1"),
  dietary_tags: z.array(z.string()).min(1, "Dietary tags must be at least 1"),
});

const DIETARY_TAGS = ["HALAL", "VEG", "KETO", "GLUTEN_FREE", "DAIRY_FREE"];

export function AddMenuForm() {
  const [categories, setCategories] = React.useState<any[]>([]);

  React.useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await getAllCategory();
        // Assuming res has a data property or is the array itself
        const categoryData = Array.isArray(res) ? res : res?.data?.data || [];
        setCategories(categoryData);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const form = useForm({
    defaultValues: {
      category_id: "",
      name: "",
      description: "",
      price: "" as unknown as number,
      discountPrice: "" as unknown as number,
      prepTimeMinutes: "" as unknown as number,
      dietary_tags: [] as string[],
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("this is value", value);
      toast("Menu added successfully");
      // API call post method will be added here later
    },
  });

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Add Menu
          </CardTitle>
          <CardDescription className="text-center">
            Create a new menu item by filling out the details below.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="add-menu-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Menu Item Name
                      </FieldLabel>
                      <Input
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        aria-invalid={isInvalid}
                        placeholder="e.g., Grilled Prawns"
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field
                  name="category_id"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                        <select
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          aria-invalid={isInvalid}
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <option value="" disabled>
                            Select a category
                          </option>
                          {categories.map((cat: any) => (
                            <option
                              key={cat.id || cat._id}
                              value={cat.id || cat._id}
                            >
                              {cat.name || cat.title || "Unknown Category"}
                            </option>
                          ))}
                        </select>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="prepTimeMinutes"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Prep Time (minutes)
                        </FieldLabel>
                        <Input
                          id={field.name}
                          type="number"
                          name={field.name}
                          value={
                            field.state.value === 0 &&
                            (field.state.value as any) !== "" &&
                            typeof field.state.value !== "string"
                              ? ""
                              : field.state.value
                          }
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value === ""
                                ? ("" as unknown as number)
                                : Number(e.target.value),
                            )
                          }
                          aria-invalid={isInvalid}
                          placeholder="20"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Price</FieldLabel>
                        <Input
                          id={field.name}
                          type="number"
                          name={field.name}
                          value={
                            field.state.value === 0 &&
                            (field.state.value as any) !== "" &&
                            typeof field.state.value !== "string"
                              ? ""
                              : field.state.value
                          }
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value === ""
                                ? ("" as unknown as number)
                                : Number(e.target.value),
                            )
                          }
                          aria-invalid={isInvalid}
                          placeholder="950"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="discountPrice"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Discount Price
                        </FieldLabel>
                        <Input
                          id={field.name}
                          type="number"
                          name={field.name}
                          value={
                            field.state.value === 0 &&
                            (field.state.value as any) !== "" &&
                            typeof field.state.value !== "string"
                              ? ""
                              : field.state.value
                          }
                          onBlur={field.handleBlur}
                          onChange={(e) =>
                            field.handleChange(
                              e.target.value === ""
                                ? ("" as unknown as number)
                                : Number(e.target.value),
                            )
                          }
                          aria-invalid={isInvalid}
                          placeholder="900"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="description"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                      <textarea
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onBlur={field.handleBlur}
                        onChange={(e) => field.handleChange(e.target.value)}
                        placeholder="Fresh prawns grilled with garlic and spices."
                        rows={3}
                        className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                        aria-invalid={isInvalid}
                      />
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />

              <form.Field
                name="dietary_tags"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel className="mb-2">Dietary Tags</FieldLabel>
                      <div className="flex flex-wrap gap-4 mt-1">
                        {DIETARY_TAGS.map((tag) => (
                          <div
                            key={tag}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`tag-${tag}`}
                              checked={(field.state.value as string[]).includes(
                                tag,
                              )}
                              onCheckedChange={(checked) => {
                                const val = field.state.value as string[];
                                const newValue = checked
                                  ? [...val, tag]
                                  : val.filter((t) => t !== tag);
                                field.handleChange(newValue);
                              }}
                              onBlur={field.handleBlur}
                            />
                            <Label
                              htmlFor={`tag-${tag}`}
                              className="text-sm font-medium leading-none cursor-pointer"
                            >
                              {tag.replace("_", " ")}
                            </Label>
                          </div>
                        ))}
                      </div>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </Field>
                  );
                }}
              />
            </FieldGroup>
          </form>
        </CardContent>
        <CardFooter className="flex justify-end gap-2">
          <Button type="button" variant="outline" onClick={() => form.reset()}>
            Reset
          </Button>
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <Button type="submit" form="add-menu-form" disabled={!canSubmit}>
                {isSubmitting ? "Submitting..." : "Submit"}
              </Button>
            )}
          />
        </CardFooter>
      </Card>
    </div>
  );
}
