import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminFAQPage() {
  if (!(await isAdmin())) redirect("/");

  const supabase = await createClient();

  const { data: faqs } = await supabase
    .from("faq")
    .select("*")
    .order("sort_order", { ascending: true });

  return (
    <div className="page">
      <div className="page-header">
        <span>admin</span>
        <h1>faq</h1>
        <p>
          add questions that people keep asking.
        </p>
      </div>

      <div className="admin-list">
        {faqs?.map((faq) => (
          <div
            className="admin-list-item"
            key={faq.id}
          >
            <strong>{faq.question}</strong>
            <p>{faq.answer}</p>
            <small>
              published:{" "}
              {faq.published ? "yes" : "no"}
            </small>
          </div>
        ))}
      </div>
    </div>
  );
}