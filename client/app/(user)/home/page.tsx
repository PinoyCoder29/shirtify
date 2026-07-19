"use client";
import { Product } from "@/app/type/product";
import ProductCard from "@/components/product/ProductCard";
import { getProduct } from "@/services/product.service";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [product, setProduct] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct();
        setProduct(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
  }, []);

  if (loading) {
    return (
      <main className="container mt-5">
        <h3>Loading....</h3>
      </main>
    );
  }
  return (
    <main>
      <div className="row gy-4">
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
