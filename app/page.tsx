import Link from "next/link";
import ProductCard from "@/components/ProductCard";
import TestimonialCard from "@/components/TestimonialCard";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";

export default async function Home() {
  const supabase = await createClient();

  const [
    { data: products },
    { data: testimonials },
    { data: services }
  ] = await Promise.all([
    supabase
      .from("products")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(6),

    supabase
      .from("testimonials")
      .select(
        "*, profiles(x_username,display_name,avatar_url)"
      )
      .eq("published", true)
      .order("created_at", { ascending: false })
      .limit(4),

    supabase
      .from("services")
      .select("*")
      .eq("active", true)
      .order("created_at", { ascending: false })
      .limit(3)
  ]);

  return (
    <div className="site">
      <section className="hero section">
        <div className="hero-orbit orbit-one" />
        <div className="hero-orbit orbit-two" />

        <div className="hero-copy">
          <span className="eyebrow">
            welcome to my tiny corner of fisch
          </span>

          <h1>
            my little
            <br />
            <span>fisch corner :3</span>
          </h1>

          <p>
            i sell stuff, trade stuff, and help people
            find things.
          </p>

          <div className="hero-buttons">
            <Link href="/stuff" className="button primary">
              see my stuff
            </Link>

            <Link href="/joki" className="button secondary">
              see joki
            </Link>
          </div>
        </div>

        <div className="alien">
          <div className="alien-antenna" />
          <div className="alien-head">
            <div className="alien-eye left" />
            <div className="alien-eye right" />
            <div className="alien-mouth" />
          </div>
          <div className="alien-body" />
        </div>
      </section>

      <section className="section about-section">
        <div className="section-label">01 / about</div>

        <div className="about-grid">
          <div>
            <h2>
              hi, i'm the girl
              <br />
              behind gleebiwn!!
            </h2>
          </div>

          <div className="about-copy">
            <p>
              i made this little place because i keep
              trading random stuff in fisch anyway, so...
              might as well put it here lol.
            </p>

            <p>
              i sell some stuff, help people find things,
              and sometimes hunt for items myself. that's
              pretty much it.
            </p>
          </div>
        </div>
      </section>

      <section className="section inventory-section">
        <div className="section-heading">
          <div>
            <div className="section-label">
              02 / inventory
            </div>
            <h2>stuff i currently have</h2>
          </div>

          <Link href="/stuff">view all →</Link>
        </div>

        {products?.length ? (
          <div className="product-grid">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
              />
            ))}
          </div>
        ) : (
          <div className="empty-box">
            nothing here yet... the alien is probably
            hunting for stuff.
          </div>
        )}
      </section>

      <section className="section service-preview">
        <div className="section-heading">
          <div>
            <div className="section-label">
              03 / joki
            </div>
            <h2>need me to do something?</h2>
          </div>

          <Link href="/joki">view all →</Link>
        </div>

        {services?.length ? (
          <div className="service-grid">
            {services.map((service) => (
              <div key={service.id}>
                <h3>{service.name}</h3>
                <p>
                  {service.description ||
                    "ask me about this one!"}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="empty-box">
            no joki available rn :(
          </div>
        )}
      </section>

      <section className="section how-section">
        <div className="section-label">04 / how it works</div>

        <div className="steps">
          <div>
            <span>01</span>
            <h3>find something</h3>
            <p>
              browse the stuff or joki page and find
              whatever you're looking for.
            </p>
          </div>

          <div>
            <span>02</span>
            <h3>hit order</h3>
            <p>
              i'll open an x message for you with the
              order details already written.
            </p>
          </div>

          <div>
            <span>03</span>
            <h3>pay with qr</h3>
            <p>
              payment is qr only. i'll send you the
              payment details after we confirm everything.
            </p>
          </div>

          <div>
            <span>04</span>
            <h3>done!</h3>
            <p>
              once everything is confirmed, i'll handle
              the rest.
            </p>
          </div>
        </div>
      </section>

      <section className="section testimonials-section">
        <div className="section-heading">
          <div>
            <div className="section-label">
              05 / testimonials
            </div>
            <h2>tiny words from people</h2>
          </div>

          <Link href="/testimonials">
            see all →
          </Link>
        </div>

        {testimonials?.length ? (
          <div className="testimonial-grid">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.id}
                testimonial={testimonial}
              />
            ))}
          </div>
        ) : (
          <div className="empty-box">
            no testimonials yet... be the first one?
          </div>
        )}
      </section>

      <section className="section request-section">
        <div className="request-box">
          <div>
            <span className="section-label">
              06 / can't find something?
            </span>

            <h2>
              just ask me.
              <br />
              seriously.
            </h2>

            <p>
              if it's not listed here, there's still a
              chance i can find it for you.
            </p>
          </div>

          <Link href="/request" className="button primary">
            make a request →
          </Link>
        </div>
      </section>

      <footer className="footer">
        <div>
          <strong>gleebiwn</strong>
          <p>
            my silly little fisch shop. run by me +
            one questionable alien.
          </p>
        </div>

        <div className="footer-links">
          <a
            href="https://x.com/gleebiwn"
            target="_blank"
            rel="noreferrer"
          >
            x / @gleebiwn
          </a>

          <Link href="/ask">ask me something</Link>
        </div>

        <div className="footer-note">
          made with questionable decisions
          <br />
          alien approved
        </div>
      </footer>
    </div>
  );
}