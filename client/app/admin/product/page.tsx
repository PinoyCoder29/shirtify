"use client";
import { Product } from "@/app/type/product";
import ProductCard from "@/components/product/ProductCard";
import { getProduct } from "@/services/product.service";
import { useEffect, useState } from "react";

export default function ProductPage() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct();
        setProduct(data);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <main className="container mt-5">
        <h3>Loading products...</h3>
      </main>
    );
  }
  return (
    <main>
      <div className="row mt-5 mx-3 g-3">
        {product.map((item: any) => {
          return (
            <div className="col-md-3 col-6" key={item.id}>
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
