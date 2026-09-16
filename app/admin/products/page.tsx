import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  if (!(await isAdmin())) redirect("/");

  const supabase = await createClient();

  const { data: products } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="admin-header">
        <div>
          <span className="eyebrow">admin</span>
          <h1>products</h1>
        </div>

        <a
          href="#add"
          className="button primary"
        >
          add product
        </a>
      </div>

      <div className="admin-table">
        <div className="table-row table-head">
          <span>name</span>
          <span>stock</span>
          <span>price</span>
          <span>active</span>
        </div>

        {products?.map((product) => (
          <div
            className="table-row"
            key={product.id}
          >
            <span>{product.name}</span>
            <span>{product.stock}</span>
            <span>{product.price}</span>
            <span>
              {product.active ? "yes" : "no"}
            </span>
          </div>
        ))}
      </div>

      <div id="add" className="notice-box">
        product editing can be connected here to your
        supabase admin actions.
      </div>
    </div>
  );
}