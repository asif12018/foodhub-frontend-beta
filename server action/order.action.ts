"use server"
import { orderService } from "@/services/order.service"



export const createOrder = async (id: string, quantity: number) => {
    const res = await orderService.createOrder(id, quantity);
    return res;
}


export const getProviderAllOrder = async()=>{
    const res = await orderService.getProviderAllOrder();
    return res;
}

export const updateOrderStatusAction = async(orderId: string, status: string)=>{
    const res = await orderService.updateOrderStatus(orderId, status);
    return res;
}