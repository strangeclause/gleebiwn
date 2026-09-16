import { notFound } from "next/navigation";
import Link from "next/link";
import OrderButton from "@/components/OrderButton";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function ProductPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .eq("active", true)
    .maybeSingle();

  if (!product) {
    notFound();
  }

  return (
    <div className="page product-detail-page">
      <Link href="/stuff" className="back-link">
        ← back to stuff
      </Link>

      <div className="product-detail">
        <div className="detail-image">
          {product.image_url ? (
            <img
              src={product.image_url}
              alt={product.name}
            />
          ) : (
            <span>✦</span>
          )}
        </div>

        <div className="detail-content">
          <span className="eyebrow">
            available stuff
          </span>

          <h1>{product.name}</h1>

          <div className="detail-price">
            {product.price}
          </div>

          <div className="detail-stock">
            {product.stock > 0
              ? `${product.stock} available`
              : "currently sold out"}
          </div>

          <OrderButton
            name={product.name}
            price={product.price}
            stock={product.stock}
          />
        </div>
      </div>
    </div>
  );
}