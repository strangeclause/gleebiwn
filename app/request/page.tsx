"use client";

import { useState } from "react";
import { createRequestIntent } from "@/lib/x";

export default function RequestPage() {
  const [request, setRequest] = useState("");

  const url = request.trim()
    ? createRequestIntent(request.trim())
    : "#";

  return (
    <div className="page">
      <div className="form-page">
        <span className="eyebrow">
          request something
        </span>

        <h1>can't find what you need?</h1>

        <p>
          tell me what you're looking for. i might be
          able to find it for you.
        </p>

        <div className="form-card">
          <label htmlFor="request">
            what are you looking for?
          </label>

          <textarea
            id="request"
            value={request}
            onChange={(e) =>
              setRequest(e.target.value)
            }
            placeholder="tell me the item, amount, or whatever you need..."
          />

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className="button primary"
            onClick={(e) => {
              if (!request.trim()) {
                e.preventDefault();
              }
            }}
          >
            send request on x →
          </a>
        </div>
      </div>
    </div>
  );
}