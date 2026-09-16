import Link from "next/link";
import OrderButton from "./OrderButton";

type Product = {
  id: number;
  name: string;
  image_url: string | null;
  stock: number;
  price: string;
};

export default function ProductCard({
  product
}: {
  product: Product;
}) {
  return (
    <article className="product-card">
      <Link
        href={`/stuff/${product.id}`}
        className="product-image"
      >
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} />
        ) : (
          <div className="image-placeholder">
            <span>✦</span>
          </div>
        )}
      </Link>

      <div className="product-info">
        <h3>{product.name}</h3>

        <div className="product-details">
          <div>
            <small>stock</small>
            <strong
              className={
                product.stock > 0
                  ? "stock-available"
                  : "stock-empty"
              }
            >
              {product.stock > 0
                ? `${product.stock} left`
                : "sold out"}
            </strong>
          </div>

          <div className="product-price">
            <small>price</small>
            <strong>{product.price}</strong>
          </div>
        </div>

        <OrderButton
          name={product.name}
          price={product.price}
          stock={product.stock}
        />
      </div>
    </article>
  );
}