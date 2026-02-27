import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const reviewService = {
  // createReview: async (rating: number, comment: string, mealId: string) => {
  //   try {
  //     const url = new URL(`${API_URL}/api/review/${mealId}`);
  //     const res = await fetch(url.toString(), {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       credentials: "include",
  //       body: JSON.stringify({ rating, comment }),
  //       cache: "no-store",
  //     });
  //     const data = await res.json();
  //     return { data: data, error: null };
  //   } catch (err: any) {
  //     return {
  //       data: null,
  //       error: { message: err.message || "Something went wrong" },
  //     };
  //   }
  // },
  getReviewByMealId: async (mealId: string) => {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${API_URL}/api/review/${mealId}`);
      const res = await fetch(url.toString(), {
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
      return {
        data: null,
        error: { message: err.message || "Something went wrong" },
      };
    }
  },
  getOrderByMealIdAndUserId: async(mealId: string)=>{
    try{
       const cookieStore = await cookies();
       const res = await fetch(`${API_URL}/api/order/mealData/${mealId}`, {
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        credentials: "include",
        cache: "no-store",
      });
      const data = await res.json();
      return { data: data, error: null };
    }catch(err:any){
      return {data:null, error:err.message}
    }
  },
  createReviewByMealId: async (
    mealId: string,
    rating: number,
    comment: string,
  ) => {
    try {
      const cookiesStore = await cookies();
      const res = await fetch(`${API_URL}/api/review/${mealId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookiesStore.toString(),
        },
        credentials: "include",
        body: JSON.stringify({ rating, comment }),
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
