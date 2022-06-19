export interface Wine {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
  isOnSale: boolean;
  quantityInCart: number;
  foodPairing: Food[];
  description?: string;
}

export interface Food {
  name: string;
  kcal: number;
  vegan: boolean;
  glutten: boolean;
}
