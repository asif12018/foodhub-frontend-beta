import { env } from "@/env";

const API_URL = env.NEXT_PUBLIC_API_URL;

export const orderService = {
  createOrder: async (id: string, quantity: number) => {
    try {
      const res = await fetch(`${API_URL}/api/order/${id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
};
