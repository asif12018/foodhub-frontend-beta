import { env } from "@/env";

const API_URL = env.BACKEND_URL;

export const cartService = {
  getMyCart: async () => {
    try {
      const url = new URL(`${API_URL}/api/order/cart`);
      const res = await fetch(url.toString());
      const data = await res.json();
      return { data: data, error: null };
    } catch (err: any) {
        return {data:null, error:{message: err.message || "Something went wrong"}};
    }
  },
};
