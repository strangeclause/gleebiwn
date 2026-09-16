import Link from "next/link";
import TestimonialCard from "@/components/TestimonialCard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function TestimonialsPage() {
  const supabase = await createClient();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select(
      "*, profiles(x_username,display_name,avatar_url)"
    )
    .eq("published", true)
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="page-header">
        <span>testimonials</span>
        <h1>what people said</h1>
        <p>
          tiny messages from people i've traded or worked
          with.
        </p>

        <Link
          href="/testimonials/write"
          className="button primary"
        >
          leave a testimonial →
        </Link>
      </div>

      {testimonials?.length ? (
        <div className="testimonial-grid">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              testimonial={testimonial}
            />
          ))}
        </div>
      ) : (
        <div className="empty-box">
          no testimonials yet.
        </div>
      )}
    </div>
  );
}