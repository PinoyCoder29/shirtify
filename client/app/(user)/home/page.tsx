"use client";
import { Product } from "@/app/type/product";
import ProductCard from "@/components/product/ProductCard";
import { getProduct } from "@/services/product.service";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [product, setProduct] = useState<Product[]>([]);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const data = await getProduct();
        setProduct(data);
      } catch (error) {}
    }
    fetchProduct();
  }, []);

  return (
    <main>
      <div className="row ">
        {product.map((item: any) => {
          return (
            <div className="col-md-3 col-4 " key={item.id}>
              <ProductCard product={item} />
            </div>
          );
        })}
      </div>
    </main>
  );
}
