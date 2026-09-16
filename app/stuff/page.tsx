import ProductCard from "@/components/ProductCard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function StuffPage() {
  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="page-header">
        <span>stuff</span>
        <h1>things i have rn</h1>
        <p>
          if something is sold out, you can still ask me
          if i can find another one.
        </p>
      </div>

      {products?.length ? (
        <div className="product-grid">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
            />
          ))}
        </div>
      ) : (
        <div className="empty-box">
          inventory is empty rn :(
        </div>
      )}
    </div>
  );
}