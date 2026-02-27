"use server";

import { foodService, GetFoodParams } from "@/services/food.service";

export const getMyMenu = async (params?: GetFoodParams) => {
  const res = await foodService.getMyMenu(params);
  return res;
};
