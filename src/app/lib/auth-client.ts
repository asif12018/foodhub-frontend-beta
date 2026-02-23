import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL
    ? `${process.env.NEXT_PUBLIC_FRONTEND_URL}/api/auth`
    : "http://localhost:3000/api/auth",
  fetchOptions: {
    credentials: "include",
  },
});
