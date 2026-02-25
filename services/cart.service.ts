import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const cartService = {
  getMyCart: async () => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/order/cart`);
      const res = await fetch(url.toString(), {
        headers: {
          cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
  checkOut: async (address: string, id: string) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/order/checkout/${id}`);
      const res = await fetch(url.toString(), {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          cookie: cookieStore.toString(),
        },
        body: JSON.stringify({ deliveryAddress: address }),
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
};
