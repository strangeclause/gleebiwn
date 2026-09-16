import { redirect } from "next/navigation";
import { isAdmin } from "@/lib/admin";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AdminSettingsPage() {
  if (!(await isAdmin())) redirect("/");

  const supabase = await createClient();

  const { data: settings } = await supabase
    .from("site_settings")
    .select("*")
    .eq("id", 1)
    .maybeSingle();

  return (
    <div className="page">
      <div className="page-header">
        <span>admin</span>
        <h1>settings</h1>
      </div>

      <div className="form-card">
        <div className="setting-row">
          <strong>shop status</strong>
          <span>
            {settings?.shop_status || "open"}
          </span>
        </div>

        <div className="setting-row">
          <strong>payment</strong>
          <span>QR only</span>
        </div>

        <div className="setting-row">
          <strong>x username</strong>
          <span>
            @{settings?.x_username || "gleebiwn"}
          </span>
        </div>

        <div className="setting-row">
          <strong>qr image</strong>
          <span>
            {settings?.qr_image_url
              ? "configured"
              : "not configured"}
          </span>
        </div>
      </div>
    </div>
  );
}