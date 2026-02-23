"use client";

import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { getSession } from "@/server action/auth.action";
import { env } from "process";
import { authClient } from "@/src/app/lib/auth-client";

interface Navbar5Props {
  className?: string;
}

const Navbar = ({ className }: Navbar5Props) => {
  const router = useRouter();

  const [response, setResponse] = useState<any>(null);
  const [isPending, setIsPending] = useState(false);

  // Use better-auth's reactive hook! It automatically updates across tabs and after login.
  const { data: sessionData, isPending: loading, refetch } = authClient.useSession();
  const session = sessionData?.session;

  // console.log("this is session", session)

  const handleLogout = async () => {
    setIsPending(true);
    const toastId = toast("Signing out....");
    try {
      await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          toast.success("Signed out successfully", { id: toastId });
          router.push("/");
        },
        onError: (ctx) => {
          toast.error(ctx.error.message || "Something went wrong", { id: toastId });
        }
      }
    });
    } catch (err) {
      toast.error("Something went wrong", { id: toastId });
    } finally {
      setIsPending(false);
    }
  };

  return (
    <section className={cn("py-4", className)}>
      <div className="container">
        <nav className="flex items-center justify-between">
          <a
            href="https://www.shadcnblocks.com"
            className="flex items-center gap-2"
          >
            <img
              src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
              className="max-h-8"
              alt="Shadcn UI Navbar"
            />
            <span className="text-lg font-semibold tracking-tighter">
              Shadcnblocks.com
            </span>
          </a>
          <NavigationMenu className="hidden lg:block">
            <NavigationMenuList>
              <NavigationMenuItem>
                {/* <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Products
                </NavigationMenuLink> */}
                <Link href="/" className={navigationMenuTriggerStyle()}>
                  home
                </Link>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                >
                  Resources
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="#"
                  className={navigationMenuTriggerStyle()}
                  asChild
                >
                  <Link href="/allFood"> Menu</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
          <div className="hidden items-center gap-4 lg:flex">
            {/* <Button asChild variant="outline"><Link href={"/signin"} >Sign in</Link></Button>
            <Button onClick={()=>handleLogout()} disabled={isPending} variant="outline">{isPending ? "Signing out..." : "Sign out"}</Button> */}

            {loading ? null : session ? (
              // USER LOGGED IN
              <Button
                onClick={handleLogout}
                disabled={isPending}
                variant="outline"
              >
                {isPending ? "Signing out..." : "Sign out"}
              </Button>
            ) : (
              // USER NOT LOGGED IN
              <Button asChild variant="outline">
                <Link href="/signin">Sign in</Link>
              </Button>
            )}

            {!session && (
              <Button asChild>
                <Link href="/register">Start for free</Link>
              </Button>
            )}
          </div>
          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="outline" size="icon">
                <MenuIcon className="h-4 w-4" />
              </Button>
            </SheetTrigger>
            <SheetContent side="top" className="max-h-screen overflow-auto">
              <SheetHeader>
                <SheetTitle>
                  <a
                    href="https://www.shadcnblocks.com"
                    className="flex items-center gap-2"
                  >
                    <img
                      src="https://deifkwefumgah.cloudfront.net/shadcnblocks/block/logos/shadcnblockscom-icon.svg"
                      className="max-h-8"
                      alt="Shadcn UI Navbar"
                    />
                    <span className="text-lg font-semibold tracking-tighter">
                      Shadcnblocks.com
                    </span>
                  </a>
                </SheetTitle>
              </SheetHeader>
              <div className="flex flex-col p-4">
                <div className="flex flex-col gap-6">
                  <Link href="/" className="font-medium">
                    Home
                  </Link>
                  <Link href="/allFood" className="font-medium">
                    Menu
                  </Link>
                  <a href="#" className="font-medium">
                    Pricing
                  </a>
                </div>
                <div className="mt-6 flex flex-col gap-4">
                  {loading ? null : session ? (
                    <Button
                      onClick={handleLogout}
                      disabled={isPending}
                      variant="outline"
                    >
                      {isPending ? "Signing out..." : "Sign out"}
                    </Button>
                  ) : (
                    <Link
                      href="/signin"
                      className="bg-[#171717] text-white p-2 rounded-md text-center font-semibold"
                    >
                      Sign in
                    </Link>
                  )}
                  {!session && (
                    <Button asChild>
                      <Link href="/register">Start for free</Link>
                    </Button>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </nav>
      </div>
    </section>
  );
};

export { Navbar };
