import Link from "next/link";
import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const admin = await isAdmin();

  if (!admin) {
    redirect("/");
  }

  const links = [
    ["products", "/admin/products"],
    ["joki", "/admin/services"],
    ["orders", "/admin/orders"],
    ["testimonials", "/admin/testimonials"],
    ["faq", "/admin/faq"],
    ["settings", "/admin/settings"]
  ];

  return (
    <div className="page admin-page">
      <div className="page-header">
        <span>admin corner</span>
        <h1>hello, boss.</h1>
        <p>
          this is where you control the little alien
          shop.
        </p>
      </div>

      <div className="admin-grid">
        {links.map(([name, href]) => (
          <Link
            href={href}
            key={href}
            className="admin-card"
          >
            <span>✦</span>
            <strong>{name}</strong>
            <small>manage {name} →</small>
          </Link>
        ))}
      </div>
    </div>
  );
}