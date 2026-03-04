
import { env } from "@/env"
import { cookies } from "next/headers";






// get user profile status



export const userProfileStatusService = {
    getUserProfileStatus: async function (indentifier: string) {
        try{
            const res = await fetch(`${env.BACKEND_URL}/api/userStatus/${indentifier}`,{
                method:"GET"
            });

            

            const data = await res.json();
            return {data:data, error:null};
        }catch(err:any){
            return {data:null, error:err};
        }
    },
    getUserProfileStatusAuto: async function () {
        try{
            const cookeStore = await cookies();
            const res = await fetch(`${env.BACKEND_URL}/api/userStatus`,{
                method:"GET",
                headers:{
                    "content-type":"application/json",
                    Cookie:cookeStore.toString()
                },
                cache:"no-store",
                credentials: "include"
            });

            const data = await res.json();
            return {data:data, error:null};
        }catch(err:any){
            return {data:null, error:err};
        }
    }
}