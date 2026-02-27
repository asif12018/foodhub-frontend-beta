"use server"
import { orderService } from "@/services/order.service"



export const createOrder = async (id: string, quantity: number) => {
    const res = await orderService.createOrder(id, quantity);
    return res;
}