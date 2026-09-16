import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminServicesPage() {
  if (!(await isAdmin())) redirect("/");

  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="admin-header">
        <div>
          <span className="eyebrow">admin</span>
          <h1>joki</h1>
        </div>

        <a
          href="#add"
          className="button primary"
        >
          add joki
        </a>
      </div>

      <div className="admin-table">
        <div className="table-row table-head">
          <span>name</span>
          <span>price</span>
          <span>time</span>
          <span>active</span>
        </div>

        {services?.map((service) => (
          <div
            className="table-row"
            key={service.id}
          >
            <span>{service.name}</span>
            <span>{service.price}</span>
            <span>
              {service.estimated_time || "-"}
            </span>
            <span>
              {service.active ? "yes" : "no"}
            </span>
          </div>
        ))}
      </div>

      <div id="add" className="notice-box">
        add/edit actions can be connected to supabase
        here.
      </div>
    </div>
  );
}