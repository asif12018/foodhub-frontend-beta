"use client";

import * as React from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import * as z from "zod";
import { useParams, useRouter } from "next/navigation";

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
import { createMenu, updateMenuAction } from "@/server action/food.action";

const formSchema = z.object({
  category_id: z
    .union([z.string(), z.undefined()])
    .transform((v) => (v === "" ? undefined : v)),
  name: z
    .union([
      z.string().min(3, "Name must be at least 3 characters long"),
      z.literal(""),
      z.undefined(),
    ])
    .transform((v) => (v === "" ? undefined : v)),
  description: z
    .union([
      z.string().min(5, "Description must be at least 5 characters long"),
      z.literal(""),
      z.undefined(),
    ])
    .transform((v) => (v === "" ? undefined : v)),
  price: z.union([
    z
      .number({ message: "Price must be a number" })
      .min(1, "Price must be at least 1"),
    z.undefined(),
  ]),
  discountPrice: z.union([
    z
      .number({ message: "Discount price must be a number" })
      .min(0, "Discount price must be at least 0"),
    z.undefined(),
  ]),
  prepTimeMinutes: z.union([
    z
      .number({ message: "Preparation minutes must be a number" })
      .min(1, "Preparation minutes must be at least 1"),
    z.undefined(),
  ]),
  dietary_tags: z.union([z.array(z.string()), z.undefined()]),
});

const DIETARY_TAGS = ["HALAL", "VEG", "KETO", "GLUTEN_FREE", "DAIRY_FREE"];

export function EditMenuForm() {
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

  const router = useRouter();

  const params = useParams();
  const menuId = params.id;
  console.log(menuId, "this is menuid");

  const form = useForm({
    defaultValues: {
      category_id: undefined as string | undefined,
      name: undefined as string | undefined,
      description: undefined as string | undefined,
      price: undefined as number | undefined,
      discountPrice: undefined as number | undefined,
      prepTimeMinutes: undefined as number | undefined,
      dietary_tags: [] as string[] | undefined,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        // Filter out any undefined or empty array properties for the PATCH request
        const patchData = Object.fromEntries(
          Object.entries(value).filter(
            ([_, v]) =>
              v !== undefined && !(Array.isArray(v) && v.length === 0),
          ),
        );

        // await updateMenu(menuId, patchData); // Replace with actual PATCH action

        const res = await updateMenuAction(menuId as string, patchData);
        if (res.error) {
          toast.error(res.error.message);
        } else {
          toast.success("Menu updated successfully");
          router.push("/");
        }

      } catch (err: any) {
        toast.error("Failed to update menu: " + err.message);
      }
    },
  });

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Edit Menu
          </CardTitle>
          <CardDescription className="text-center">
            Edit a menu item by filling out the details below.
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
                        value={field.state.value || ""}
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
                          value={field.state.value || ""}
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
                            field.state.value === undefined
                              ? ""
                              : field.state.value === 0 &&
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
                            field.state.value === undefined
                              ? ""
                              : field.state.value === 0 &&
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
                            field.state.value === undefined
                              ? ""
                              : field.state.value === 0 &&
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
                        value={field.state.value || ""}
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
