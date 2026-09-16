import ServiceCard from "@/components/ServiceCard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function JokiPage() {
  const supabase = await createClient();

  const { data: services } = await supabase
    .from("services")
    .select("*")
    .eq("active", true)
    .order("created_at", { ascending: false });

  return (
    <div className="page">
      <div className="page-header">
        <span>joki</span>
        <h1>need me to do something?</h1>
        <p>
          here's the stuff i can help with. if you need
          something else, just ask.
        </p>
      </div>

      {services?.length ? (
        <div className="service-list">
          {services.map((service) => (
            <ServiceCard
              key={service.id}
              service={service}
            />
          ))}
        </div>
      ) : (
        <div className="empty-box">
          no joki available rn.
        </div>
      )}
    </div>
  );
}