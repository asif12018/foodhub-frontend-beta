import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

enum UserRoles {
  Admin = "Admin",
  Provider = "Provider",
  Customer = "Customer",
}

// Route-based access control map

const routeAccessMap: Record<string, UserRoles[]> = {
  "/dashboard": [UserRoles.Admin],
  "/profile": [UserRoles.Customer],
  "/editProfile": [UserRoles.Customer],
  "/cart": [UserRoles.Customer],
  "/cart/checkout": [UserRoles.Customer],
  "/my-menu": [UserRoles.Provider],
  "/add-menu": [UserRoles.Provider],
  "/my-order": [UserRoles.Provider],
  "/providerStats": [UserRoles.Provider],
  "/allFood": [UserRoles.Customer, UserRoles.Provider, UserRoles.Admin],
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  let data = null;
  try {
    const AUTH_API = env.AUTH_URL;
    const res = await fetch(`${AUTH_API}/get-session`, {
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
      cache: "no-store",
    });
    data = await res.json();
  } catch (err) {
    console.error("Middleware fetch error:", err);
  }

  //if not login then redirect to login page
  if (!data?.user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const userRole = (data?.user as any)?.roles as UserRoles;
  //check route permissions
  for (const route in routeAccessMap) {
    if (pathname.startsWith(route)) {
      const allowedRoles = routeAccessMap[route];
      if (!allowedRoles.includes(userRole)) {
        return NextResponse.redirect(new URL("/", request.url));
      }
    }
  }
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/profile/:path*",
    "/editProfile/:path*",
    "/cart/:path*",
    "/cart/checkout/:path*",
    "/my-menu/:path*",
    "/add-menu/:path*",
    "/providerStats/:path*",
    "/my-order/:path*",
    "/allFood/:path*",
  ],
};
