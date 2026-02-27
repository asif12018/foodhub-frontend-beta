


export interface UserData {
    createdAt: string;
    email:string;
    emailVerified: boolean;
    id: string;
    image:string | null;
    name: string;
    phone: string | null;
    roles: string;
    status: string;
    updatedAt: string;
}


export interface ReviewData {
    id:string;
    userId:string;
    mealId:string;
    providerId:string;
    rating:number;
    comment:string;
    user: UserData;
}


interface Category{
    id: string;
    icon: string | null;
    name: string;
    isDeleted: boolean;
    updatedAt: string;
    createdAt: string;
}


interface foodSingleData {
    id: string;
    provider_id: string;
    category_id: string;
    category?: Category;
    name: string;
    description: string;
    cusine: string;
    dietary_tags: string[];
    prepTimeMinutes: number;
    price: number;
    discountPrice?: number;
    imageUrl: string | null;
    rating?: number;
    reviews?: ReviewData[];
    total_reviews?: number;
    isAvailable: boolean;
    created_at: string;
    updated_at: string;
}

export default foodSingleData;