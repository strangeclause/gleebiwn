"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function TestimonialForm() {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(e: React.FormEvent) {
    e.preventDefault();

    if (!content.trim()) return;

    setLoading(true);
    setError("");

    const response = await fetch(
      "/api/testimonials",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          content: content.trim()
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      setError(data.error || "something went wrong.");
      setLoading(false);
      return;
    }

    router.push("/testimonials");
    router.refresh();
  }

  return (
    <form onSubmit={submit} className="form-card">
      <label htmlFor="content">
        your message
      </label>

      <textarea
        id="content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="tell people what your experience was like..."
        maxLength={500}
        required
      />

      <small>{content.length}/500</small>

      {error && (
        <div className="error-box">{error}</div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="button primary"
      >
        {loading ? "sending..." : "send testimonial →"}
      </button>
    </form>
  );
}