"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  FieldGroup,
  FieldLabel,
  Field as UIField,
  FieldError,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { checkOutAction } from "@/server action/cart.action";
import { useParams } from "next/navigation";

export default function CheckOutDetailsPage() {
  const params = useParams();
  const id = params?.id as string;
  //from schema

  const checkOutSchema = z.object({
    address: z.string().min(4, "minimun length is 4"),
  });

  const form = useForm({
    defaultValues: {
      address: "",
    },
    validators: {
      onSubmit: checkOutSchema,
    },
    onSubmit: async ({ value }) => {
      const toastId = toast("Checking out...");
      try {
        const { data, error } = await checkOutAction(value.address, id);



        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("Checkout successful", { id: toastId });
        window.location.href = "/";
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });
  return (
    <div>
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Checkout</CardTitle>
          <CardDescription className="text-center">
            Please Enter You address to checkout this order
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="checkout-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="address"
                children={(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Adress</FieldLabel>
                      <Input
                        type="text"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isValid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </UIField>
                  );
                }}
              />
            </FieldGroup>
            <div className="flex justify-center mt-1">
              <Button className="w-full" form="checkout-form" type="submit">
                Submit
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
