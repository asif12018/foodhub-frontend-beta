import { createAuthClient } from "better-auth/react";

const getBaseURL = () => {
  if (typeof window !== "undefined") {
    // Let Better Auth automatically append /api/auth
    return window.location.origin; 
  }
  return process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
};

export const authClient = createAuthClient({
  baseURL: getBaseURL(),
  fetchOptions: {
    credentials: "include",
  },
});