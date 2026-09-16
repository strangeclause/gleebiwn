import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export default async function Navbar() {
  const supabase = await createClient();

  const {
    data: { user }
  } = await supabase.auth.getUser();

  let admin = false;

  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select("is_admin")
      .eq("id", user.id)
      .maybeSingle();

    admin = data?.is_admin === true;
  }

  return (
    <header className="navbar">
      <div className="nav-inner">
        <Link href="/" className="brand">
          gleebiwn
          <span>✦</span>
        </Link>

        <nav>
          <Link href="/stuff">stuff</Link>
          <Link href="/joki">joki</Link>
          <Link href="/testimonials">testimonials</Link>
          <Link href="/faq">faq</Link>
          <Link href="/request">request</Link>
        </nav>

        <div className="nav-actions">
          {user ? (
            <>
              <Link href="/account" className="nav-account">
                account
              </Link>

              {admin && (
                <Link href="/admin" className="nav-admin">
                  admin
                </Link>
              )}
            </>
          ) : (
            <Link href="/login" className="login-button">
              login with x
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}