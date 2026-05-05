"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import * as z from "zod";
import "goey-toast/styles.css";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field as UIField,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { GooeyToaster, gooeyToast } from "goey-toast";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { authClient } from "@/src/app/lib/auth-client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getUserProfileStatusAction } from "@/server action/userProfileStatusAction";

//from schema
const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(8, "minimum length is 8"),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();

  const handleGoogleLogin = async () =>{
    await authClient.signIn.social({
      provider:"google",
      // Must be the exact frontend URL
    callbackURL: "https://foodhub-frontend-omega.vercel.app/"
    })
  };

  const handleDemoLogin = async (email: string, password: string) => {
    const { data: statusData } = await getUserProfileStatusAction(email);
    if (statusData?.data?.status === "suspend") {
      gooeyToast.error("Your account has been banned", {
        description: "For violating our terms and conditions your account has been suspended.",
      });
      return;
    }

    const toastId = toast("Signing in....");
    try {
      const { error } = await authClient.signIn.email({ email, password });
      if (error) {
        toast.error(error.message, { id: toastId });
        return;
      }
      toast.success("User Signin successfully", { id: toastId });
      window.location.href = "/";
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    }
  };

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: loginSchema,
    },
    onSubmit: async ({ value }) => {
      //if the user is suspended or not
      const { data: statusData, error: statusError } =
        await getUserProfileStatusAction(value.email);
      // console.log("Profile status on", statusData);
      if (statusData?.data?.status === "suspend") {
        gooeyToast.error("Your account has been banned", {
          description:
            "For violating our terms and conditions your account has been suspended. If you think that this happened accidently, please contact use",
        });
        return;
      }

      const toastId = toast("Signing in....");
      try {
        const { data, error } = await authClient.signIn.email(value);
        console.log(error);

        if (error) {
          toast.error(error.message, { id: toastId });
          return;
        }
        toast.success("User Signin successfully", { id: toastId });
        window.location.href = "/";
      } catch (err) {
        toast.error("Something went wrong", { id: toastId });
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <GooeyToaster position="top-center" />
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form
            id="login-form"
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <form.Field
                name="email"
                children={(field) => {
                  const isValid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
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

              <form.Field
                name="password"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <UIField>
                      <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                      <Input
                        type="password"
                        id={field.name}
                        name={field.name}
                        value={field.state.value}
                        onChange={(e) => field.handleChange(e.target.value)}
                      ></Input>
                      {isInvalid && (
                        <FieldError errors={field.state.meta.errors} />
                      )}
                    </UIField>
                  );
                }}
              />
              <UIField>
                <Button form="login-form" type="submit">
                  Login
                </Button>

                <FieldDescription className="text-center">
                  Don&apos;t have an account?{" "}
                  <Link href="/register">Sign up</Link>
                </FieldDescription>
              </UIField>
            </FieldGroup>
          </form>
          <div className="flex flex-col gap-2 mt-4">
            <Button className="w-full" onClick={()=>handleGoogleLogin()}>Login with Google</Button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-2 mt-2">
              <Button
                variant="outline"
                type="button"
                onClick={() => handleDemoLogin("demo@customer.com", "123456789")}
              >
                Demo User
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleDemoLogin("demo@provider.com", "123456789")}
              >
                Demo Provider
              </Button>
              <Button
                variant="outline"
                type="button"
                onClick={() => handleDemoLogin("test@gmail.com", "123456789")}
              >
                Demo Admin
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
