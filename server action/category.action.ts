"use server";

import { categoryService } from "@/services/category.service";



export const getAllCategory = async()=>{
    const res = await categoryService.getAllCategory();
    return res;
}