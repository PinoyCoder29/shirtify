import { CreateProductInput, Product } from "@/app/type/product";
import { apiGet, apiPost } from "./api";

export function createProduct(data: CreateProductInput) {
  return apiPost("/products/create", data);
}

export function getProduct() {
  return apiGet<Product[]>("/products");
}
