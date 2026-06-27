import { Product } from "@/app/type/product";
import styles from "./style.module.css";

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  const totalStock = product.variants.reduce(
    (total, variant) => total + variant.stock,
    0,
  );

  const displayStock = Intl.NumberFormat("en", {
    notation: "compact",
    maximumFractionDigits: 1,
  }).format(totalStock);

  return (
    <div className={`card ${styles.card}`}>
      <div className={styles.imgWrapper}>
        <img
          src={product.images[0]}
          alt={product.name}
          className={styles.cardImg}
        />
      </div>

      <div className="card-body">
        <p className="fw-bold mb-2 text-truncate">{product.name}</p>

        <p className="mb-1">
          ₱<strong>{product.price}</strong>
        </p>

        <p className="mb-0">
          Stock <strong>{displayStock}</strong>
        </p>
      </div>
    </div>
  );
}
