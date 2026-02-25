"use server";

import { reviewService } from "@/services/review.service";



export const createReviewAction = async (rating: number, comment: string, mealId: string)=>{
    const res = await reviewService.createReview(rating, comment, mealId);
    return res;
}

export const getReviewByMealIdAction = async (mealId: string)=>{
    const res = await reviewService.getReviewByMealId(mealId);
    return res;
}