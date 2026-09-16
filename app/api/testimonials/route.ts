import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json(
      { error: "you need to log in first." },
      { status: 401 }
    );
  }

  const body = await request.json();

  const content = String(
    body.content || ""
  ).trim();

  if (!content) {
    return NextResponse.json(
      { error: "testimonial cannot be empty." },
      { status: 400 }
    );
  }

  if (content.length > 500) {
    return NextResponse.json(
      { error: "testimonial is too long." },
      { status: 400 }
    );
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("x_user_id")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile?.x_user_id) {
    return NextResponse.json(
      { error: "your x account could not be verified." },
      { status: 403 }
    );
  }

  const { data: access } = await supabase
    .from("testimonial_access")
    .select("id")
    .eq("x_user_id", profile.x_user_id)
    .eq("active", true)
    .maybeSingle();

  if (!access) {
    return NextResponse.json(
      {
        error:
          "your x account has not been approved for testimonials."
      },
      { status: 403 }
    );
  }

  const { error } = await supabase
    .from("testimonials")
    .insert({
      user_id: user.id,
      content,
      published: false
    });

  if (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    success: true
  });
}