import { env } from "@/env";
import { cookies } from "next/headers";

const API_URL = env.BACKEND_URL;

export const profileService = {
  getProfileData: async () => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/profile/me`, {
        method: "GET",
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
  updateProfile: async (payload: any) => {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/profile/update`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payload),
        credentials: "include",
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
  getProviderProfileById: async(providerId:string)=>{
        try{
            const res = await fetch(`${API_URL}/api/profile/provider-profile/${providerId}`,{
                method:"GET",
                headers: {
                    "Content-Type":"application/json",
                },
                cache: "no-store"
            });
            const data = await res.json();
            return {data: data , error: null}
        }catch(err:any){
            return {data: null , error: {message: err.message || "Something went wrong"}}
        }
    }
};
