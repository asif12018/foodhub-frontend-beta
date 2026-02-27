



export interface MenuData {
    category_id: string;
    name:string;
    description: string;
    price: number;
    discountPrice?: number;
    imageUrl?: string;
    cusine: string;
    dietary_tags: string[];
    preparationMinutes: number;
    restaurant: string;
}

