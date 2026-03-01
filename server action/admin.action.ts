"use server";
import { adminStatsService } from "@/services/adminStats.service";
import { revalidatePath } from "next/cache";

export const getAdminStatsAction = async () => {
  const result = await adminStatsService.getAdminStats();
  return result;
};

export const getAllOrderAction = async () => {
  const result = await adminStatsService.getAllOrder();
  return result;
};

export const getAllUserAction = async () => {
  const result = await adminStatsService.getAllUser();
  return result;
};

export const suspendAUserAction = async (userId: string) => {
  const result = await adminStatsService.suspendAUser(userId);
  revalidatePath("/dashboard/manageUser");
  return result;
};

export const activateAUserAction = async (userId: string) => {
  const result = await adminStatsService.activateAUser(userId);
  revalidatePath("/dashboard/manageUser");
  return result;
};


export const createCategoryAction = async (payload:string)=>{
  const result = await adminStatsService.createCategory(payload);
  revalidatePath("/dashboard/manageCategories");
  return result;
}
export const deleteCategoryAction = async (categoryId:string)=>{
  const result = await adminStatsService.deleteCategory(categoryId);
  revalidatePath("/dashboard/manageCategories");
  return result;
}
export const updateCategoryAction = async (categoryId:string,payload:string)=>{
  const result = await adminStatsService.updateCategory(categoryId,payload);
  revalidatePath("/dashboard/manageCategories");
  return result;
}
export const restoreDeletedCategory = async(categoryId: string)=>{
    const res = await adminStatsService.restoreDeletedCategory(categoryId);
    revalidatePath("/dashboard/manageCategories");
    return res;
}

export const editCategoriesAction = async(categoryId:string,payload: string)=>{
  const res = await adminStatsService.editCategories(categoryId,payload);
  revalidatePath("/dashboard/manageCategories");
  return res;
}

