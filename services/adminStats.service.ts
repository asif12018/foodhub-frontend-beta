import { env } from "@/env";
import { cookies } from "next/headers"




const API_URL = env.BACKEND_URL;

export const adminStatsService = {
    getAdminStats: async()=>{
        try{
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/access/adminStats`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    cookie:cookieStore.toString()
                },
                cache:"no-store"
            });

            const data = await res.json();
            return {data:data, error:null}
            

        }catch(err:any){
            return {data:null, error:{message:err.message || "Something went wrong"}}
        }
    },
    getAllOrder: async()=>{
        try{
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/access/order`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    cookie:cookieStore.toString()
                },
                cache:"no-store"
            });

            const data = await res.json();
            return {data:data, error:null}
            

        }catch(err:any){
            return {data:null, error:{message:err.message || "Something went wrong"}}
        }
    },
    getAllUser : async()=>{
        try{
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/access/users`,{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    cookie:cookieStore.toString()
                },
                cache:"no-store"
            });

            const data = await res.json();
            return {data:data, error:null}
            

        }catch(err:any){
            return {data:null, error:{message:err.message || "Something went wrong"}}
        }
    },
    suspendAUser: async(userId: string)=>{
         try{

            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/access/suspend/${userId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    cookie:cookieStore.toString()
                },
                cache:"no-store"
            })

            const data = await res.json();
            return {data:data, error:null}

         }catch(err:any){
            return {data:null, error:{message:err.message || "Something went wrong"}}
         }
    },
    activateAUser: async(userId: string)=>{
        try{
            const cookieStore = await cookies();
            const res = await fetch(`${API_URL}/api/access/activate/${userId}`,{
                method:"PATCH",
                headers:{
                    "Content-Type":"application/json",
                    cookie:cookieStore.toString()
                },
                cache:"no-store"
            })

            const data = await res.json();
            return {data:data, error:null}
         }catch(err:any){
            return {data:null, error:{message:err.message || "Something went wrong"}}
         }
    },

    //admin feature category management
  createCategory: async(payload:string)=>{
     try{
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/categories`,{
        method:"POST",
        headers:{
          "Content-Type":"application/json",
          Cookie:cookieStore.toString(),
        },
        body:JSON.stringify(payload),
        credentials:"include",
      })
      const data = await res.json();
      return {data:data,error:null}
     }catch(err:any){
      return {
        data:null,
        error:{message:err.message || "Something went wrong"}
      }
     }
  },
  deleteCategory: async(categoryId:string)=>{
    try{
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/categories/${categoryId}`,{
        method:"DELETE",
        headers:{
          "Content-Type":"application/json",
          cookie:cookieStore.toString(),
        },
        credentials:"include",
      })
      const data = await res.json();
      return {data:data,error:null}
    }catch(err:any){
      return {
        data:null,
        error:{message:err.message || "Something went wrong"}
      }
    }
  },
  updateCategory: async(categoryId:string,payload:string)=>{
    try{
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/categories/${categoryId}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          Cookie:cookieStore.toString(),
        },
        body:JSON.stringify(payload),
        credentials:"include",
      })
      const data = await res.json();
      return {data:data,error:null}
    }catch(err:any){
      return {
        data:null,
        error:{message:err.message || "Something went wrong"}
      }
    }
  },
  restoreDeletedCategory : async(categoryId: string)=>{
    try{
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/categories/restore/${categoryId}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          Cookie:cookieStore.toString(),
        },
        credentials:"include",
      })
      const data = await res.json();
      return {data:data,error:null}
    }catch(err:any){
      return {
        data:null,
        error:{message:err.message || "Something went wrong"}
      }
    }
  },
  editCategories: async(categoryId:string,payload: string)=>{
    try{
      const cookieStore = await cookies();
      const res = await fetch(`${API_URL}/api/admin/categories/${categoryId}`,{
        method:"PATCH",
        headers:{
          "Content-Type":"application/json",
          Cookie:cookieStore.toString(),
        },
        body:JSON.stringify(payload),
        credentials:"include",
      })
      const data = await res.json();
      return {data:data,error:null}
    }catch(err:any){
      return {
        data:null,
        error:{message:err.message || "Something went wrong"}
      }
    }
  }
}