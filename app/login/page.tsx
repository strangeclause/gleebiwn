"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);

  async function login() {
    setLoading(true);

    const supabase = createClient();

    const { error } =
      await supabase.auth.signInWithOAuth({
        provider: "x",
        options: {
          redirectTo: `${window.location.origin}/auth/callback`
        }
      });

    if (error) {
      console.error(error);
      setLoading(false);
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-box">
        <div className="auth-alien">✦</div>

        <span className="eyebrow">welcome back</span>

        <h1>log in first!</h1>

        <p>
          you need to log in with x before you can leave
          a testimonial or use account-only stuff.
        </p>

        <button
          onClick={login}
          disabled={loading}
          className="button primary full"
        >
          {loading ? "opening x..." : "continue with x →"}
        </button>

        <small>
          don't worry, i only use your x account to
          identify you.
        </small>
      </div>
    </div>
  );
}