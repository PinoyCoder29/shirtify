export interface ProductVariant {
  id: string;
  size: string;
  stock: number;

  productId: string;

  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  variants: ProductVariant[];
  createdAt: string;
  updatedAt: string;
}

// NEW
export interface CreateProductInput {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  variants: {
    size: string;
    stock: number;
  }[];
}