import { apiPost } from "./api";

export type ProductVariant = {
  size: string;
  stock: number;
};

export type CreateProductInput = {
  name: string;
  description: string;
  price: number;
  category: string;
  images: string[];
  variants: ProductVariant[];
};

export function createProduct(data: CreateProductInput) {
  return apiPost("/products", data);
}
