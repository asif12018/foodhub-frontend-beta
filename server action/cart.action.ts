"use server";

import { cartService } from "@/services/cart.service";

export const getMyCart = async () => {
  const res = await cartService.getMyCart();
  return res;
};

export const checkOutAction = async (address: string, id: string) => {
  const res = await cartService.checkOut(address, id);
  return res;
};
