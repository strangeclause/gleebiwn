"use client";

import { useState } from "react";
import { createQuestionIntent } from "@/lib/x";

export default function AskPage() {
  const [question, setQuestion] = useState("");

  const url = question.trim()
    ? createQuestionIntent(question.trim())
    : "#";

  return (
    <div className="page">
      <div className="form-page">
        <span className="eyebrow">ask me</span>

        <h1>got a question?</h1>

        <p>
          write it here and i'll open x with your
          question ready to send.
        </p>

        <div className="form-card">
          <label htmlFor="question">
            your question
          </label>

          <textarea
            id="question"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            placeholder="e.g. do you have a cosmic relic?"
          />

          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            className={`button primary ${
              !question.trim() ? "disabled-link" : ""
            }`}
            onClick={(e) => {
              if (!question.trim()) {
                e.preventDefault();
              }
            }}
          >
            ask on x →
          </a>
        </div>
      </div>
    </div>
  );
}