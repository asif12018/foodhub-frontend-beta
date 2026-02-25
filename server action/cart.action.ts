
"use server"

import { cartService } from "@/services/cart.service";


export const getMyCart = async ()=>{
    const res = await cartService.getMyCart();
    return res;
}