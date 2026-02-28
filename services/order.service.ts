import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.NEXT_PUBLIC_API_URL;
const BACKEND_URL = env.BACKEND_URL;

export const orderService = {
  createOrder: async (id: string, quantity: number) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/order/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
          // "Authorization":`Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({ quantity }),
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
  getCart: async (id: string) => {
    try {
      const res = await fetch(`${API_URL}/api/order/cart`);
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
  getProviderAllOrder: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/order/getAllOrder`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
  updateOrderStatus: async (orderId: string, status: string) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${BACKEND_URL}/api/order/update-status/${orderId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Cookie: cookieStore.toString(),
          },
          body: JSON.stringify({ status }),
          credentials: "include",
          cache: "no-store",
        },
      );
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      return { data: null, error: err.message };
    }
  },
};
