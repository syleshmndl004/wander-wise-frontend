import { Star, Quote } from "lucide-react";

const testimonials = [
  {
    name: "Aarav Sharma",
    location: "Kathmandu, Nepal",
    avatar: "https://i.pravatar.cc/100?img=12",
    rating: 5,
    text: "WanderWise made planning my Everest trek effortless. The itinerary suggestions were spot on and saved me hours of research.",
  },
  {
    name: "Emily Carter",
    location: "London, UK",
    avatar: "https://i.pravatar.cc/100?img=32",
    rating: 5,
    text: "I planned a two-week Europe trip in minutes. The recommendations felt personal and the budget breakdown was a lifesaver.",
  },
  {
    name: "Kenji Tanaka",
    location: "Osaka, Japan",
    avatar: "https://i.pravatar.cc/100?img=15",
    rating: 4,
    text: "Great tool for organizing multi-city trips. The map view helps me visualize routes clearly. Highly recommend it.",
  },
];

function Testimonials() {
  return (
    <section className="bg-muted/30 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-wider text-primary">
            Testimonials
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Loved by travelers worldwide
          </h2>
          <p className="mt-4 text-base text-muted-foreground">
            Thousands of explorers trust WanderWise to plan their next
            adventure. Here's what a few of them have to say.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col rounded-xl border border-border bg-card p-6 shadow-sm"
            >
              <Quote className="h-8 w-8 text-primary/30" />
              <blockquote className="mt-4 flex-1 text-sm leading-relaxed text-card-foreground">
                "{t.text}"
              </blockquote>

              {/* Rating */}
              <div className="mt-4 flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={
                      "h-4 w-4 " +
                      (i < t.rating
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground/30")
                    }
                  />
                ))}
              </div>

              {/* Author */}
              <figcaption className="mt-4 flex items-center gap-3 border-t border-border pt-4">
                <img
                  src={t.avatar}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {t.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{t.location}</p>
                </div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
