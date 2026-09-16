import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TestimonialForm from "../TestimonialForm";

export const dynamic = "force-dynamic";

export default async function WriteTestimonialPage() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("x_user_id,x_username")
    .eq("id", user.id)
    .maybeSingle();

  const { data: access } = await supabase
    .from("testimonial_access")
    .select("id")
    .eq("x_user_id", profile?.x_user_id || "")
    .eq("active", true)
    .maybeSingle();

  return (
    <div className="page">
      <div className="form-page">
        <span className="eyebrow">
          testimonials
        </span>

        <h1>leave me a little message</h1>

        {!access ? (
          <div className="notice-box">
            <strong>not approved yet!</strong>
            <p>
              i manually approve x accounts before they
              can leave testimonials, so random people
              can't fake reviews here.
            </p>
          </div>
        ) : (
          <TestimonialForm />
        )}
      </div>
    </div>
  );
}