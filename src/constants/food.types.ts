



interface foodSingleData {
    id: string;
    provider_id: string;
    category_id: string;
    name: string;
    description: string;
    cusine: string;
    dietary_tags: string[];
    prepTimeMinutes: number;
    price: number;
    discountPrice?: number;
    imageUrl: string | null;
    rating?: number;
    total_reviews?: number;
    isAvailable: boolean;
    created_at: string;
    updated_at: string;
}

export default foodSingleData;