export interface BaseProduct {
  id: string;
  name: string;
  price: number;
  image: string;
  category: string;
}

export interface Product extends BaseProduct {
  description: string;
  fullDescription: string | null;
  features: string | null;
  specs: string | null;
  stock: number;
  rating: number;
  reviews: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface User {
  id: string;
  email: string;
  name: string | null;
  isLoggedIn: boolean;
}

export type CartItem = BaseProduct & { quantity: number };