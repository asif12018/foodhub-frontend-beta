export interface MenuData {
  category_id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  imageUrl?: string;
  dietary_tags: string[];
  prepTimeMinutes: number;
  cuisine?: string;
}

export interface UpdateMenuData {
  category_id?: string;
  name?: string;
  description?: string;
  price?: number;
  discountPrice?: number;
  imageUrl?: string;
  cuisine?: string;
  dietary_tags?: string[];
  prepTimeMinutes?: number;
}
