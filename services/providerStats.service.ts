import { env } from "@/env";
import { cookies } from "next/headers";






const API_URL = env.BACKEND_URL;

export const providerStatsService = {
    getProviderStats : async () =>{
        try{
            const cookieStore = await cookies();
            const res =  await fetch(`${API_URL}/api/provider-stats`,{
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                    Cookie: cookieStore.toString(),
                },
                credentials: "include",
                cache: "no-store"
            });
            const data = await res.json();
            return {data: data , error: null}

        }catch(err:any){
            return {data: null , error: {message: err.message || "Something went wrong"}}
        }
    },
    
}