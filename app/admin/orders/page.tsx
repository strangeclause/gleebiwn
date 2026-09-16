import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminOrdersPage() {
  if (!(await isAdmin())) redirect("/");

  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="page-header">
        <span>admin</span>
        <h1>orders</h1>
        <p>
          all orders currently recorded by the site.
        </p>
      </div>

      <div className="admin-table">
        <div className="table-row table-head">
          <span>item</span>
          <span>qty</span>
          <span>payment</span>
          <span>status</span>
        </div>

        {orders?.map((order) => (
          <div
            className="table-row"
            key={order.id}
          >
            <span>{order.item_name}</span>
            <span>{order.quantity}</span>
            <span>{order.payment_status}</span>
            <span>{order.order_status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}