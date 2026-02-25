import { env } from "@/env";
import { cookies } from "next/headers";




const API_URL = env.BACKEND_URL;

export const reviewService = {
    createReview: async (rating: number, comment: string, mealId: string)=>{
         try{
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/api/review/${mealId}`);
            const res = await fetch(url.toString(), {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString(),
                },
                body: JSON.stringify({ rating, comment}),
                cache: "no-store",
            });
            const data = await res.json();
            return { data: data, error: null };
         }catch(err:any){
            return {
                data: null,
                error: { message: err.message || "Something went wrong" },
            };
         }
    },
    getReviewByMealId: async (mealId: string)=>{
        try{
            const cookieStore = await cookies();
            const url = new URL(`${API_URL}/api/review/${mealId}`);
            const res = await fetch(url.toString(), {
                headers: {
                    "Content-Type": "application/json",
                    cookie: cookieStore.toString(),
                },
                cache: "no-store",
            });
            const data = await res.json();
            return { data: data, error: null };
        }catch(err:any){
            return {
                data: null,
                error: { message: err.message || "Something went wrong" },
            };
        }
    }
}