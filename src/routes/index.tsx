import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Droplets, Recycle, CloudSun, Trees } from "lucide-react";
import logoWhite from "@/assets/oryzza-logo-white.png";
import logoGreen from "@/assets/oryzza-logo-green.png";
import heroNature from "@/assets/hero-nature.jpg";
import heroRicehusk from "@/assets/hero-ricehusk.jpg";
import heroSawdust from "@/assets/hero-sawdust.jpg";
import heroCornhusks from "@/assets/hero-cornhusks.jpg";
import heroWares from "@/assets/hero-wares.jpg";
import tableware from "@/assets/tableware-set.jpg";
import bowlDetail from "@/assets/bowl-detail.jpg";
import agroWaste from "@/assets/agro-waste.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Oryzza — Wares of the Future" },
      {
        name: "description",
        content:
          "Oryzza engineers agro-processing waste — rice husks, sawdust, bagasse, coconut coir — into single-use tableware that returns to the earth.",
      },
      { property: "og:title", content: "Oryzza — Wares of the Future" },
      {
        property: "og:description",
        content:
          "Biodegradable single-use tableware engineered from Nigerian agro-processing waste.",
      },
      { property: "og:image", content: heroNature },
    ],
  }),
  component: Home,
});

function Section({ id, children, className = "" }: { id?: string; children: React.ReactNode; className?: string }) {
  return (
    <section id={id} className={`px-6 md:px-12 lg:px-20 py-24 md:py-32 ${className}`}>
      <div className="mx-auto max-w-7xl">{children}</div>
    </section>
  );
}

const heroSlides = [
  { src: heroRicehusk, alt: "Rice husk mounds beside a paddy field" },
  { src: heroSawdust, alt: "Sawdust piles at a sawmill at the forest edge" },
  { src: heroCornhusks, alt: "Corn field at harvest with dry husks" },
  { src: heroWares, alt: "Single-use plates, trays and cutlery moulded from agro-fibre" },
  { src: heroNature, alt: "Lush rainforest canopy in morning mist" },
];

const WHATSAPP_URL = "https://wa.me/2347054667373?text=Hello%20Oryzza%2C%20I%27d%20like%20to%20talk.";
const EMAIL = "hello@oryzza.com.ng";

function Home() {
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  const materials = [
    "Rice husks", "Sawdust", "Bagasse",
    "Coconut coir", "Corn husks", "Palm-kernel fiber",
  ];

  const goals = [
    { n: "06", t: "Clean Water & Sanitation", d: "Our cold-press process uses up to 80% less water than conventional moulded-fibre lines.", Icon: Droplets },
    { n: "12", t: "Responsible Consumption", d: "Replacing single-use plastics with compostable wares crafted from waste streams.", Icon: Recycle },
    { n: "13", t: "Climate Action", d: "Every ware diverts crop residue from open burning — locking carbon, not releasing it.", Icon: CloudSun },
    { n: "15", t: "Life on Land", d: "Zero virgin-tree pulp. Zero petrochemicals. Soil-safe at end-of-life.", Icon: Trees },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-30">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
          <a href="#" className="flex items-center gap-3">
            <img src={logoWhite} alt="Oryzza" className="h-16 md:h-20 lg:h-24 w-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]" />
          </a>
          <div className="hidden md:flex items-center gap-10 text-sm tracking-wide text-bone/90">
            <a href="#story" className="hover:text-bone transition">Story</a>
            <a href="#materials" className="hover:text-bone transition">Materials</a>
            <a href="#impact" className="hover:text-bone transition">Impact</a>
            <a href="#contact" className="hover:text-bone transition">Contact</a>
          </div>
          <a href="#contact" className="hidden md:inline-flex items-center gap-2 rounded-full bg-bone/95 text-primary px-5 py-2.5 text-sm font-medium hover:bg-bone transition">
            Partner with us
          </a>
        </nav>
      </header>

      {/* HERO */}
      <section className="relative min-h-screen w-full overflow-hidden">
        {heroSlides.map((s, i) => (
          <img
            key={s.src}
            src={s.src}
            alt={s.alt}
            className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1800ms] ease-in-out ${i === slide ? "opacity-100" : "opacity-0"}`}
            width={1920}
            height={1080}
            loading={i === 0 ? "eager" : "lazy"}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 via-primary/40 to-primary/85" />
        <div className="absolute -right-32 top-1/4 w-[420px] h-[420px] blob-1 animate-blob bg-bone/10 backdrop-blur-sm hidden md:block" />

        <div className="relative z-10 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 pt-40 md:pt-48 pb-24">
          <h1 className="font-display text-bone text-shadow-hero text-[3.4rem] leading-[0.95] md:text-[6.5rem] lg:text-[8rem] animate-float-up">
            Wares of <br />
            <span className="italic">the future.</span>
          </h1>
          <div className="mt-10 max-w-xl text-bone/90 text-lg leading-relaxed animate-float-up">
            Oryzza engineers the waste of agro-processing — rice husks, sawdust, bagasse, coconut coir —
            into single-use utensils and tableware that return to the earth as quietly as they came.
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4 animate-float-up">
            <a href="#story" className="rounded-full bg-bone text-primary px-7 py-3.5 text-sm tracking-wide hover:bg-bone/90 transition">
              Read our story
            </a>
            <a href="#materials" className="rounded-full border border-bone/40 text-bone px-7 py-3.5 text-sm tracking-wide hover:bg-bone/10 transition">
              See the materials
            </a>
          </div>
        </div>

        {/* slide indicators */}
        <div className="absolute bottom-28 md:bottom-32 left-0 right-0 z-20 mx-auto max-w-7xl px-6 md:px-12 lg:px-20 flex items-center justify-end">
          <div className="flex items-center gap-2">
            {heroSlides.map((_, i) => (
              <button
                key={i}
                onClick={() => setSlide(i)}
                aria-label={`Show slide ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-500 ${i === slide ? "w-10 bg-bone" : "w-4 bg-bone/40 hover:bg-bone/70"}`}
              />
            ))}
          </div>
        </div>

        {/* organic bottom edge */}
        <svg className="absolute bottom-[-1px] left-0 w-full text-background" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor" d="M0,80 C240,140 480,20 720,60 C960,100 1200,40 1440,80 L1440,120 L0,120 Z" />
        </svg>
      </section>

      {/* STORY */}
      <Section id="story">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-5 relative">
            <div className="absolute -inset-6 blob-2 bg-primary/10 -z-10" />
            <img
              src={agroWaste}
              alt="Pile of agricultural waste fibers"
              loading="lazy"
              width={1280}
              height={960}
              className="w-full h-[520px] object-cover blob-2 shadow-soft"
            />
          </div>
          <div className="md:col-span-7 md:pl-8">
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">The Problem</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
              Africa is choking on plastic, while burning the very fibres that could replace it.
            </h2>
            <div className="mt-8 space-y-5 text-base md:text-lg text-foreground/80 max-w-2xl leading-relaxed">
              <p>
                Across our continent, a population racing past 1.5 billion generates over
                <span className="text-primary font-medium"> 230 million tonnes</span> of agricultural residue every year.
                Most of it is set ablaze in open fields — releasing CO₂, methane and soot into the lungs of the
                cities downwind.
              </p>
              <p>
                Meanwhile as we develop innovative foodprocessing methods to feed a billion mouths, we almost never thought 
                to use the waste from the food to <em>hold and consume</em> the food. Instead, we reach for the styrofoam plates 
                and the single-use plastic spoons — conveniences that outlive the meal by four centuries, breaking into the soils 
                and rivers our farmers depend on, and into us, before the next meal is served.
              </p>
              <p className="text-primary font-display text-2xl italic">
                Oryzza closes that loop.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* MATERIALS */}
      <Section id="materials" className="bg-primary text-bone">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-6 order-2 md:order-1">
            <p className="text-bone/60 uppercase tracking-[0.3em] text-xs mb-5">Our Substrates</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl leading-[1.05]">
              Six humble fibres. <br /><span className="italic">One quiet revolution.</span>
            </h2>
            <p className="mt-6 text-bone/80 text-lg max-w-xl">
              We source from rice mills, sawmills, palm processors and smallholder farms across Nigeria —
              paying for what was once burned away.
            </p>
            <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-3">
              {materials.map((m) => (
                <li key={m} className="flex items-center gap-3 text-bone/95 text-base border-b border-bone/15 pb-3">
                  <span className="w-2 h-2 bg-accent blob-3" />
                  {m}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:col-span-6 order-1 md:order-2 relative">
            <img
              src={tableware}
              alt="Single-use biodegradable tableware set moulded from agro-fibre"
              loading="lazy"
              width={1024}
              height={1024}
              className="w-full h-[560px] object-cover blob-1 shadow-leaf"
            />
            <div className="absolute -bottom-8 -left-8 w-44 h-44 blob-4 overflow-hidden border-4 border-primary shadow-soft hidden md:block">
              <img src={bowlDetail} alt="Rice husk bowl texture" loading="lazy" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </Section>

      {/* IMPACT — SDGs */}
      <Section id="impact">
        <div className="max-w-3xl">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">Sustainability Commitments</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
            Engineered against four <span className="italic">global goals.</span>
          </h2>
          <p className="mt-6 text-foreground/70 text-lg">
            Every ware we ship is measured against the UN Sustainable Development Goals. The earth keeps the receipts.
          </p>
        </div>

        <div className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((g, i) => {
            const Icon = g.Icon;
            return (
              <article
                key={g.n}
                className={`relative p-8 bg-card text-card-foreground border border-border ${i % 2 === 0 ? "blob-2" : "blob-1"} hover:-translate-y-1 transition duration-500 shadow-soft`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-bone">
                    <Icon className="w-6 h-6" aria-hidden />
                  </span>
                  <span className="text-xs uppercase tracking-[0.25em] text-foreground/60">SDG {g.n}</span>
                </div>
                <div className="text-6xl font-display text-accent/80 mb-3">{g.n}</div>
                <h3 className="text-2xl text-primary mb-3">{g.t}</h3>
                <p className="text-foreground/70 text-sm leading-relaxed">{g.d}</p>
              </article>
            );
          })}
        </div>

        {/* impact stats */}
        <div className="mt-20 grid md:grid-cols-3 gap-10 border-t border-border pt-16">
          {[
            { k: "80%", v: "less water used vs. conventional moulded-fibre lines." },
            { k: "1 tonne", v: "of agro-waste diverted from open burning per production run." },
            { k: "0g", v: "of petrochemical plastic in any Oryzza ware. Ever." },
          ].map((s) => (
            <div key={s.k}>
              <div className="text-5xl md:text-6xl font-display text-primary">{s.k}</div>
              <p className="mt-3 text-foreground/70 max-w-xs">{s.v}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CONTACT */}
      <Section id="contact" className="bg-gradient-forest text-bone relative overflow-hidden">
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] blob-3 bg-bone/5 animate-blob" />
        <div className="absolute -bottom-32 -right-16 w-[360px] h-[360px] blob-4 bg-accent/10" />
        <div className="relative grid md:grid-cols-12 gap-12">
          <div className="md:col-span-7">
            <p className="text-bone/60 uppercase tracking-[0.3em] text-xs mb-5">Let's build the loop</p>
            <h2 className="text-4xl md:text-6xl lg:text-7xl leading-[1.02]">
              Restaurants, retailers, <br />
              <span className="italic">replenishers</span> — come in.
            </h2>
            <p className="mt-6 text-bone/85 text-lg max-w-xl">
              Whether you need wholesale tableware, a co-branded line or a pilot for your hospitality group —
              we'd love to talk.
            </p>
          </div>
          <div className="md:col-span-5 space-y-6 md:pt-2">
            <div>
              <p className="text-bone/60 text-xs uppercase tracking-[0.25em] mb-2">Studio</p>
              <p className="text-xl">36 Christ Street<br />Aba, Abia State<br />Nigeria</p>
            </div>
            <div>
              <p className="text-bone/60 text-xs uppercase tracking-[0.25em] mb-2">Email</p>
              <a href={`mailto:${EMAIL}`} className="text-xl underline decoration-bone/40 underline-offset-4 hover:decoration-bone">
                {EMAIL}
              </a>
            </div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 mt-4 rounded-full bg-bone text-primary px-7 py-3.5 text-sm tracking-wide hover:bg-bone/90 transition"
            >
              Start a conversation →
            </a>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <img src={logoGreen} alt="Oryzza" className="h-8 w-auto" />
          <p className="text-sm text-foreground/60 font-display italic">Wares of the future.</p>
          <p className="text-xs text-foreground/50 tracking-wide">
            © {new Date().getFullYear()} Oryzza. Made in Aba.
          </p>
        </div>
      </footer>
    </div>
  );
}
