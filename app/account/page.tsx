import Link from "next/link";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const { data: profile } = await supabase
    .from("profiles")
    .select("x_username, display_name, avatar_url, is_admin")
    .eq("id", user.id)
    .single();

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("id, content, published, created_at")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const username =
    profile?.x_username ||
    user.user_metadata?.user_name ||
    user.user_metadata?.preferred_username ||
    "unknown";

  const displayName =
    profile?.display_name ||
    user.user_metadata?.full_name ||
    user.user_metadata?.name ||
    username;

  const avatar =
    profile?.avatar_url ||
    user.user_metadata?.avatar_url ||
    null;

  return (
    <main className="account-page">
      <section className="account-shell">
        <Link href="/" className="back-link">
          ← back home
        </Link>

        <div className="account-header">
          <div className="account-avatar">
            {avatar ? (
              <img src={avatar} alt={displayName} />
            ) : (
              <span>👽</span>
            )}
          </div>

          <div className="account-heading">
            <p className="eyebrow">your little corner</p>

            <h1>{displayName}</h1>

            <p className="account-username">
              @{username.replace(/^@/, "")}
            </p>
          </div>
        </div>

        <div className="account-grid">
          <section className="account-card">
            <div className="card-top">
              <div>
                <span className="card-label">account</span>
                <h2>hey, welcome back!!</h2>
              </div>

              <span className="alien-dot">✦</span>
            </div>

            <div className="account-info">
              <div className="info-row">
                <span>display name</span>
                <strong>{displayName}</strong>
              </div>

              <div className="info-row">
                <span>X username</span>
                <strong>@{username.replace(/^@/, "")}</strong>
              </div>

              <div className="info-row">
                <span>email</span>
                <strong>
                  {user.email || "hidden by X"}
                </strong>
              </div>
            </div>

            <div className="account-actions">
              <a
                href={`https://x.com/${username.replace(/^@/, "")}`}
                target="_blank"
                rel="noreferrer"
                className="account-button secondary"
              >
                view my X ↗
              </a>

              <Link
                href="/testimonials/write"
                className="account-button"
              >
                write a testimonial
              </Link>
            </div>
          </section>

          <section className="account-card">
            <div className="card-top">
              <div>
                <span className="card-label">testimonials</span>
                <h2>stuff you left here</h2>
              </div>

              <span className="testimonial-count">
                {testimonials?.length || 0}
              </span>
            </div>

            {!testimonials || testimonials.length === 0 ? (
              <div className="empty-account">
                <div className="empty-alien">👽</div>

                <p>
                  no testimonials yet...
                  <br />
                  wanna leave one?
                </p>

                <Link
                  href="/testimonials/write"
                  className="text-link"
                >
                  write one →
                </Link>
              </div>
            ) : (
              <div className="account-testimonials">
                {testimonials.map((testimonial) => (
                  <article
                    key={testimonial.id}
                    className="my-testimonial"
                  >
                    <div className="testimonial-status">
                      <span
                        className={
                          testimonial.published
                            ? "status published"
                            : "status pending"
                        }
                      >
                        {testimonial.published
                          ? "published"
                          : "waiting for approval"}
                      </span>

                      <span>
                        {new Date(
                          testimonial.created_at
                        ).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>

                    <p>{testimonial.content}</p>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>

        {profile?.is_admin && (
          <section className="admin-account-card">
            <div>
              <span className="card-label">little alien control room</span>
              <h2>you&apos;re the owner!!</h2>
              <p>
                products, joki, testimonials, FAQ, orders...
                all the suspicious buttons are in here.
              </p>
            </div>

            <Link
              href="/admin"
              className="account-button"
            >
              open admin →
            </Link>
          </section>
        )}

        <div className="logout-area">
          <a href="/auth/logout" className="logout-button">
            log out
          </a>
        </div>
      </section>
    </main>
  );
}