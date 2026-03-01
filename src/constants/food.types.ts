


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


interface ProfileData {
    id: string;
    userId: string;
    RestaurantName: string;
    address: string | null;
    city: string | null;
    isOpen: boolean;
    openingTime: string | null;
    closingTime: string | null;
    ratingAvg: number;
    ratingCount: number;
    createdAt: string;
    updateAt: string;
}


interface foodSingleData {
    id: string;
    provider_id: string;
    category_id: string;
    category?: Category;
    name: string;
    description: string;
    cuisine: string;
    dietary_tags: string[];
    prepTimeMinutes: number;
    price: number;
    discountPrice?: number;
    imageUrl: string | null;
    profile?: ProfileData;
    rating?: number;
    reviews?: ReviewData[];
    total_reviews?: number;
    isAvailable: boolean;
    created_at: string;
    updated_at: string;
}

export default foodSingleData;