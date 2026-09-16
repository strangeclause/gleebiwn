import { createXIntent } from "@/lib/x";

type Service = {
  id: number;
  name: string;
  description: string | null;
  image_url: string | null;
  price: string;
  estimated_time: string | null;
};

export default function ServiceCard({
  service
}: {
  service: Service;
}) {
  const message = `hi! i'd like to ask about your ${service.name} joki. price: ${service.price}.`;

  const url = createXIntent(message);

  return (
    <article className="service-card">
      <div className="service-image">
        {service.image_url ? (
          <img src={service.image_url} alt={service.name} />
        ) : (
          <span>✦</span>
        )}
      </div>

      <div className="service-content">
        <h3>{service.name}</h3>

        {service.description && (
          <p>{service.description}</p>
        )}

        <div className="service-meta">
          <span>{service.price}</span>

          {service.estimated_time && (
            <span>{service.estimated_time}</span>
          )}
        </div>

        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          className="order-button"
        >
          ask about this <span>↗</span>
        </a>
      </div>
    </article>
  );
}