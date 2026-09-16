import FAQItem from "@/components/FAQItem";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function FAQPage() {
  const supabase = await createClient();

  const { data: faqs } = await supabase
    .from("faq")
    .select("*")
    .eq("published", true)
    .order("sort_order", { ascending: true });

  return (
    <div className="page">
      <div className="page-header">
        <span>faq</span>
        <h1>things people keep asking me</h1>
        <p>
          if you've wondered it, someone probably asked
          me before.
        </p>
      </div>

      <div className="faq-list">
        {faqs?.map((item) => (
          <FAQItem
            key={item.id}
            question={item.question}
            answer={item.answer}
          />
        ))}
      </div>
    </div>
  );
}