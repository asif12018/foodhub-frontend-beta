// import { NextRequest, NextResponse } from "next/server";
// import { env } from "@/env";

// enum UserRoles {
//   Admin = "Admin",
//   Provider = "Provider",
//   Customer = "Customer",
// }

// // Route-based access control map

// const routeAccessMap: Record<string, UserRoles[]> = {
//   "/dashboard": [UserRoles.Admin],
//   "/profile": [UserRoles.Customer],
//   "/editProfile": [UserRoles.Customer],
//   "/cart": [UserRoles.Customer],
//   "/cart/checkout": [UserRoles.Customer],
//   "/my-menu": [UserRoles.Provider],
//   "/add-menu": [UserRoles.Provider],
//   "/my-order": [UserRoles.Provider],
//   "/providerStats": [UserRoles.Provider],
//   "/allFood/:id": [UserRoles.Customer, UserRoles.Provider, UserRoles.Admin],
// };

// export async function proxy(request: NextRequest) {
//   const { pathname } = request.nextUrl;

//   let data = null;
//   try {
//     const AUTH_API = env.AUTH_URL;
//     const res = await fetch(`${AUTH_API}/get-session`, {
//       headers: {
//         cookie: request.headers.get("cookie") || "",
//       },
//       cache: "no-store",
//     });
//     data = await res.json();
//   } catch (err) {
//     console.error("Middleware fetch error:", err);
//   }

//   //if not login then redirect to login page
//   if (!data?.user) {
//     return NextResponse.redirect(new URL("/signin", request.url));
//   }

//   const userRole = (data?.user as any)?.roles as UserRoles;
//   //check route permissions
//   for (const route in routeAccessMap) {
//     if (pathname.startsWith(route)) {
//       const allowedRoles = routeAccessMap[route];
//       if (!allowedRoles.includes(userRole)) {
//         return NextResponse.redirect(new URL("/", request.url));
//       }
//     }
//   }
//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     "/dashboard/:path*",
//     "/profile/:path*",
//     "/editProfile/:path*",
//     "/cart/:path*",
//     "/cart/checkout/:path*",
//     "/my-menu/:path*",
//     "/add-menu/:path*",
//     "/providerStats/:path*",
//     "/my-order/:path*",
//     "/allFood/:path*",
//   ],
// };



import { NextRequest, NextResponse } from "next/server";
import { env } from "@/env";

enum UserRoles {
  Admin = "Admin",
  Provider = "Provider",
  Customer = "Customer",
}

// 1. Define routes that are in the matcher but should be fully public
const publicRoutes = ["/allFood"];

// 2. Route-based access control map
// Notice the trailing slash on "/allFood/". 
// This allows startsWith() to match "/allFood/123" but safely ignore "/allFood"
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
  "/allFood/": [UserRoles.Customer, UserRoles.Provider, UserRoles.Admin], 
};

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // --- NEW: Bypass auth entirely for public routes ---
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

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

  // If not logged in, redirect to login page
  if (!data?.user) {
    return NextResponse.redirect(new URL("/signin", request.url));
  }

  const userRole = (data?.user as any)?.roles as UserRoles;
  
  // Check route permissions
  for (const route in routeAccessMap) {
    // pathname.startsWith("/allFood/") correctly matches "/allFood/123"
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
    // This catches both "/allFood" (handled by publicRoutes) 
    // and "/allFood/123" (handled by routeAccessMap)
    "/allFood/:path*", 
  ],
};
