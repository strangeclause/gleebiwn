import { createClient } from "@/lib/supabase/server";

export async function getCurrentUser() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  return user;
}

export async function isAdmin() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  if (!user) return false;

  const { data } = await supabase
    .from("profiles")
    .select("is_admin")
    .eq("id", user.id)
    .maybeSingle();

  return data?.is_admin === true;
}

export async function requireAdmin() {
  const admin = await isAdmin();

  if (!admin) {
    throw new Error("unauthorized");
  }
}