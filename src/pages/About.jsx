import { MapPinned, Sparkles } from "lucide-react";
import Navbar from "../components/common/Navbar";
import Footer from "../components/landingComponents/Footer";
import aboutCity from "../assets/about-city.png";

const stats = [
  { value: "20+", label: "Years Experience" },
  { value: "100+", label: "Happy Travelers" },
  { value: "15+", label: "Choice of Services" },
  { value: "10+", label: "Professional Guides" },
];

export function AboutSection() {
  return (
    <section id="about" className="bg-cream">
      <div className="mx-auto max-w-7xl px-6 py-20 lg:py-28">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* Image */}
          <div className="relative order-2 lg:order-1">
            <div className="overflow-hidden rounded-[1.75rem] shadow-2xl shadow-brand/20 ring-1 ring-black/5">
              <img
                src={aboutCity}
                alt="Aerial view of a Tuscan town with orange rooftops and medieval tower"
                width={1024}
                height={1024}
                loading="lazy"
                className="h-full w-full object-cover aspect-square"
              />
            </div>
            {/* floating badge */}
            <div className="absolute -bottom-6 -right-4 flex items-center gap-3 rounded-2xl bg-white/95 px-5 py-4 shadow-xl ring-1 ring-black/5 backdrop-blur sm:-right-6">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand/12 text-brand">
                <MapPinned className="h-6 w-6" />
              </span>
              <div className="leading-tight">
                <p className="text-sm font-bold text-ink">Trusted since 2005</p>
                <p className="text-xs text-ink-soft">Local experts, real journeys</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="order-1 lg:order-2">
            <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-brand">
              <Sparkles className="h-4 w-4" />
              Welcome to WanderWise
            </p>
            <h2 className="mt-4 text-3xl font-bold leading-tight tracking-tight text-ink sm:text-4xl lg:text-[2.75rem]">
              We care about making every journey feel effortless
            </h2>
            <div className="mt-5 space-y-4 text-base leading-relaxed text-ink-soft">
              <p>
                WanderWise was born from a love of slow travel and the people who
                make a place feel like home. We handcraft every itinerary around
                what you actually want — not a template — so each trip unfolds the
                way you dreamed it would.
              </p>
              <p>
                From tucked-away villages to the viewpoints the locals keep quiet
                about, our guides open doors you'd never find on your own. You just
                show up; we handle the rest with care.
              </p>
            </div>

            {/* Stats */}
            <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 border-t border-brand/15 pt-8 sm:grid-cols-4">
              {stats.map((s) => (
                <div key={s.label}>
                  <dt className="order-2 mt-1 text-xs font-medium text-ink-soft">
                    {s.label}
                  </dt>
                  <dd className="order-1 text-3xl font-extrabold text-brand-strong">
                    {s.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </div>
    </section>
  );
}

const About = () => {
  return (
    <div>
      <Navbar />
      <AboutSection />
      <Footer />
    </div>
  );
};

export default About;
