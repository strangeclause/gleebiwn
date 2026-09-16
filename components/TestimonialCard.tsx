type Testimonial = {
  id: number;
  content: string;
  created_at: string;
  profiles?: {
    x_username: string | null;
    display_name: string | null;
    avatar_url: string | null;
  } | null;
};

export default function TestimonialCard({
  testimonial
}: {
  testimonial: Testimonial;
}) {
  const profile = testimonial.profiles;

  return (
    <article className="testimonial-card">
      <div className="testimonial-top">
        {profile?.avatar_url ? (
          <img
            src={profile.avatar_url}
            alt=""
            className="testimonial-avatar"
          />
        ) : (
          <div className="testimonial-avatar placeholder">
            ✦
          </div>
        )}

        <div>
          <strong>
            {profile?.display_name ||
              profile?.x_username ||
              "anonymous"}
          </strong>

          {profile?.x_username && (
            <small>@{profile.x_username}</small>
          )}
        </div>
      </div>

      <p>"{testimonial.content}"</p>
    </article>
  );
}