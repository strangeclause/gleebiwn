import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminTestimonialsPage() {
  if (!(await isAdmin())) redirect("/");

  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select(
      "*, profiles(x_username,display_name)"
    )
    .order("created_at", { ascending: false });

  const { data: access } = await supabase
    .from("testimonial_access")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="page-header">
        <span>admin</span>
        <h1>testimonials</h1>
      </div>

      <section className="admin-section">
        <h2>submitted testimonials</h2>

        <div className="admin-list">
          {testimonials?.map((item) => (
            <div
              className="admin-list-item"
              key={item.id}
            >
              <strong>
                {item.profiles?.x_username ||
                  "unknown"}
              </strong>

              <p>{item.content}</p>

              <small>
                published:{" "}
                {item.published ? "yes" : "no"}
              </small>
            </div>
          ))}
        </div>
      </section>

      <section className="admin-section">
        <h2>approved x accounts</h2>

        <div className="admin-list">
          {access?.map((item) => (
            <div
              className="admin-list-item"
              key={item.id}
            >
              <strong>
                @{item.x_username}
              </strong>

              <small>
                active:{" "}
                {item.active ? "yes" : "no"}
              </small>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}