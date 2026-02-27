"use server";

import { foodService, GetFoodParams } from "@/services/food.service";
import { MenuData, UpdateMenuData } from "@/src/constants/menu.types";

export const getMyMenu = async (params?: GetFoodParams) => {
  const res = await foodService.getMyMenu(params);
  return res;
};


export const createMenu = async (data:MenuData)=>{
  const res = await foodService.createMenu(data);
  return res;
}

export const updateMenuAction = async (id: string, data: UpdateMenuData)=>{
  const res = await foodService.updateMenu(id, data);
  return res;
}

export const deleteMenuAction = async (id: string)=>{
  const res = await foodService.deleteMenu(id);
  return res;
}