"use client";

import { useState } from "react";

export default function FAQItem({
  question,
  answer
}: {
  question: string;
  answer: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`faq-item ${open ? "open" : ""}`}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
      >
        <span>{question}</span>
        <span>{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="faq-answer">
          <p>{answer}</p>
        </div>
      )}
    </div>
  );
}