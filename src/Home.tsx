import { useEffect, useRef, useState } from "react";
import {
  Droplets, Recycle, CloudSun, Trees, Menu, X as XClose,
  IceCream, Coffee, UtensilsCrossed, CircleDot, Layers, Users,
} from "lucide-react";
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
const X_URL = "https://x.com/oryzzawares";
const EMAIL = "hello@oryzza.com.ng";

// X (Twitter) icon — lucide doesn't ship the new X glyph
function XLogo({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className={className} fill="currentColor">
      <path d="M18.244 2H21l-6.52 7.45L22.5 22h-6.94l-4.7-6.2L5.4 22H2.64l6.98-7.98L1.5 2h7.12l4.25 5.66L18.24 2Zm-1.22 18.4h1.55L7.06 3.5H5.41l11.62 16.9Z" />
    </svg>
  );
}

// Custom spoon icon — clearer than lucide's Utensils
function SpoonIcon({ className = "", strokeWidth = 1.5, ...rest }: React.SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
      <ellipse cx="8.5" cy="6.5" rx="4.5" ry="3.5" />
      <path d="M10.8 9.4 L18 20" />
    </svg>
  );
}

// Custom tray icon — rounded rectangle with side handles
function TrayIcon({ className = "", strokeWidth = 1.5, ...rest }: React.SVGProps<SVGSVGElement> & { strokeWidth?: number }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" aria-hidden className={className} {...rest}>
      <rect x="4" y="7" width="16" height="10" rx="2" />
      <path d="M2 10 H4 M2 14 H4 M20 10 H22 M20 14 H22" />
      <path d="M7 11 H17" opacity="0.5" />
    </svg>
  );
}

function useCountUp(target: number, decimals = 0, duration = 1600) {
  const [val, setVal] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setVal(target * eased);
            if (p < 1) requestAnimationFrame(tick);
            else setVal(target);
          };
          requestAnimationFrame(tick);
        }
      });
    }, { threshold: 0.4 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [target, duration]);
  return { ref, display: decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString() };
}

function Stat({ value, suffix = "", decimals = 0, label }: { value: number; suffix?: string; decimals?: number; label: string }) {
  const { ref, display } = useCountUp(value, decimals);
  return (
    <div>
      <div className="text-5xl md:text-6xl font-display text-primary">
        <span ref={ref}>{display}</span>{suffix}
      </div>
      <p className="mt-3 text-foreground/70 max-w-xs">{label}</p>
    </div>
  );
}

const products = [
  { name: "Single-use plates", Icon: Layers,         tint: "bg-[oklch(0.55_0.12_135)]" },
  { name: "Ice cream cups",    Icon: IceCream,        tint: "bg-[oklch(0.62_0.10_85)]"  },
  { name: "Spoons",            Icon: SpoonIcon,       tint: "bg-[oklch(0.42_0.10_138)]" },
  { name: "Trays",             Icon: TrayIcon,        tint: "bg-[oklch(0.50_0.09_60)]"  },
  { name: "Forks",             Icon: UtensilsCrossed, tint: "bg-[oklch(0.58_0.11_150)]" },
  { name: "Bottle caps",       Icon: CircleDot,       tint: "bg-[oklch(0.36_0.07_120)]" },
  { name: "Coffee lids",       Icon: Coffee,          tint: "bg-[oklch(0.45_0.08_45)]"  },
];

const faqs = [
  { q: "How is Oryzza ware different from paper or bagasse plates I've seen before?",
    a: "We blend multiple agro-fibres — rice husk, sawdust, bagasse, coir — and cold-press them. The result is sturdier than paper, holds heat and moisture longer, and uses up to 80% less water in production." },
  { q: "Will it actually compost in my backyard?",
    a: "Yes. Every ware is 100% biodegradable and home-compostable in 60–90 days. No industrial facility needed. No microplastics left behind." },
  { q: "Can it hold hot soup or oily food?",
    a: "It can. Our wares are food-safe up to 100°C and naturally oil-resistant — no PFAS, no wax linings, no plastic coatings." },
  { q: "Do you do co-branded or custom-moulded orders?",
    a: "We do. Minimums depend on the SKU. Reach out via the form or WhatsApp and we'll send the spec sheet." },
  { q: "Where do you ship?",
    a: "Nationwide across Nigeria today, with West-Africa freight on request. International pilots are open by conversation." },
];

export default function Home() {
  const [slide, setSlide] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    const carousel = carouselRef.current;
    if (!carousel) return;

    let isWrapping = false;

    const handleScroll = () => {
      if (isWrapping) return;

      const scrollLeft = carousel.scrollLeft;
      const scrollWidth = carousel.scrollWidth;
      const clientWidth = carousel.clientWidth;
      const maxScroll = scrollWidth - clientWidth;
      const oneSetWidth = scrollWidth / 3;

      if (scrollLeft >= maxScroll - 200) {
        isWrapping = true;
        carousel.scrollLeft = oneSetWidth;
        setTimeout(() => {
          isWrapping = false;
        }, 50);
      } else if (scrollLeft < 100) {
        isWrapping = true;
        carousel.scrollLeft = oneSetWidth - 100;
        setTimeout(() => {
          isWrapping = false;
        }, 50);
      }
    };

    setTimeout(() => {
      const oneSetWidth = carousel.scrollWidth / 5;
      carousel.scrollLeft = oneSetWidth;
    }, 100);

    carousel.addEventListener("scroll", handleScroll);
    return () => carousel.removeEventListener("scroll", handleScroll);
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

  const navLinks = [
    { href: "#story", label: "Story" },
    { href: "#materials", label: "Materials" },
    { href: "#products", label: "Products" },
    { href: "#impact", label: "Impact" },
    { href: "#questions", label: "Questions" },
    { href: "#contact", label: "Contact" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* NAV */}
      <header className="absolute top-0 left-0 right-0 z-40">
        <nav className="mx-auto max-w-7xl flex items-center justify-between px-6 md:px-12 lg:px-20 py-6">
          <a href="#" className="flex items-center gap-3">
            <img src={logoWhite} alt="Oryzza" className="h-16 md:h-20 lg:h-24 w-auto drop-shadow-[0_6px_20px_rgba(0,0,0,0.45)]" />
          </a>
          <div className="hidden md:flex items-center gap-8 text-sm tracking-wide text-bone/90">
            {navLinks.map((l) => (
              <a key={l.href} href={l.href} className="hover:text-bone transition">{l.label}</a>
            ))}
          </div>
          <div className="hidden md:flex items-center gap-4">
            <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="Oryzza on X (@oryzzawares)"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-bone/40 text-bone hover:bg-bone/10 transition">
              <XLogo className="w-3.5 h-3.5" />
            </a>
            <a href="#contact" className="inline-flex items-center gap-2 rounded-full bg-bone/95 text-primary px-5 py-2.5 text-sm font-medium hover:bg-bone transition">
              Partner with us
            </a>
          </div>
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open menu"
            className="md:hidden inline-flex items-center justify-center w-11 h-11 rounded-full border border-bone/40 text-bone hover:bg-bone/10 transition"
          >
            <Menu className="w-5 h-5" />
          </button>
        </nav>
      </header>

      {/* MOBILE MENU OVERLAY */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 md:hidden bg-primary text-bone animate-float-up">
          <div className="flex items-center justify-between px-6 py-6">
            <img src={logoWhite} alt="Oryzza" className="h-14 w-auto" />
            <button
              type="button"
              onClick={() => setMenuOpen(false)}
              aria-label="Close menu"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-bone/40 text-bone hover:bg-bone/10 transition"
            >
              <XClose className="w-5 h-5" />
            </button>
          </div>
          <nav className="px-6 mt-6 flex flex-col gap-1">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setMenuOpen(false)}
                className="font-display text-4xl py-4 border-b border-bone/15"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="px-6 mt-10 flex items-center gap-4">
            <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="Oryzza on X"
              className="inline-flex items-center justify-center w-11 h-11 rounded-full border border-bone/40">
              <XLogo className="w-4 h-4" />
            </a>
            <a href="#contact" onClick={() => setMenuOpen(false)} className="rounded-full bg-bone text-primary px-6 py-3 text-sm font-medium">
              Partner with us
            </a>
          </div>
        </div>
      )}

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

        {/* organic bottom edge — slow wave */}
        <svg className="absolute bottom-[-1px] left-0 w-full text-background overflow-hidden" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden>
          <path fill="currentColor">
            <animate
              attributeName="d"
              dur="12s"
              repeatCount="indefinite"
              values="
                M0,80 C240,140 480,20 720,60 C960,100 1200,40 1440,80 L1440,120 L0,120 Z;
                M0,60 C240,30 480,110 720,80 C960,50 1200,100 1440,60 L1440,120 L0,120 Z;
                M0,80 C240,140 480,20 720,60 C960,100 1200,40 1440,80 L1440,120 L0,120 Z"
            />
          </path>
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

      {/* PRODUCTS — horizontal swipe */}
      <Section id="products" className="!px-0">
        <div className="px-6 md:px-12 lg:px-20 max-w-3xl">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">The Range</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
            What fibre can <span className="italic">become.</span>
          </h2>
          <p className="mt-6 text-foreground/70 text-lg">
            From our agro-fibre press, an expansive family of single-use wares — each one moulded, used, and returned to soil. Swipe to explore.
          </p>
        </div>

        <div ref={carouselRef} className="mt-14 overflow-x-auto overflow-y-hidden snap-x snap-mandatory scroll-smooth [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex min-w-max">
            {[...products, ...products, ...products].map(({ name, Icon, tint }, idx) => (
              <article
                key={`${name}-${idx}`}
                className={`relative ${tint} text-bone snap-start shrink-0 w-[78vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] h-[360px] md:h-[440px] overflow-hidden group`}
              >
                {/* faded background icon "sketch" */}
                <Icon
                  className="absolute -right-10 -bottom-10 w-[300px] h-[300px] text-bone/15 group-hover:text-bone/25 transition-colors duration-700"
                  strokeWidth={1}
                  aria-hidden
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />
                <div className="relative h-full flex flex-col justify-between p-7">
                  <Icon className="w-9 h-9" strokeWidth={1.25} aria-hidden />
                  <div>
                    <p className="text-bone/70 text-xs uppercase tracking-[0.25em] mb-2">Oryzza ware</p>
                    <h3 className="font-display text-2xl md:text-3xl leading-tight">{name}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
        <p className="px-6 md:px-12 lg:px-20 mt-6 text-xs text-foreground/50 tracking-wide">← swipe →</p>
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

        {/* impact stats — animated count-up */}
        <div className="mt-20 border-t border-border pt-16">
          <div className="max-w-2xl mb-12">
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">From one production run</p>
            <h3 className="text-3xl md:text-4xl text-primary leading-[1.1]">
              3 tonnes of rice husk, sawdust, bagasse and coir — <span className="italic">pressed, not burned.</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Stat value={3}      suffix=" t"      label="of agro-biomass upcycled into ware." />
            <Stat value={7830}                    label="Swoon spoons pressed in our flagship run." />
            <Stat value={7830}                    label="single-use plastic spoons kept out of drains and landfill." />
            <Stat value={11.7}   decimals={1} suffix=" kg"      label="petrochemical plastic avoided." />
            <Stat value={4.5}    decimals={1} suffix=" t CO₂e"  label="emissions avoided vs. open-burning the same biomass." />
            <Stat value={31300}  suffix=" L"      label="water saved vs. a conventional moulded-fibre line." />
          </div>
          <p className="mt-8 text-xs text-foreground/50 max-w-3xl leading-relaxed">
            Estimates based on IPCC open-burning emission factors (~1.5 t CO₂ per tonne of dry agro-residue), an average 1.5 g per disposable plastic spoon, and an 80% water reduction vs. conventional moulded-fibre pulp lines.
          </p>

          <div className="mt-20 grid md:grid-cols-2 lg:grid-cols-4 gap-10 border-t border-border pt-16">
            <Stat value={80}  suffix="%" label="less water used vs. conventional moulded-fibre lines." />
            <Stat value={100} suffix="%" label="usable material — nothing in the press is wasted." />
            <Stat value={100} suffix="%" label="recyclable at end of life, with zero contamination." />
            <Stat value={100} suffix="%" label="biodegradable — home-composts in 60–90 days." />
          </div>
        </div>
      </Section>

      {/* EQUAL OPPORTUNITY */}
      <Section id="equity" className="bg-[oklch(0.97_0.01_135)]">
        <div className="grid md:grid-cols-12 gap-12 items-center">
          <div className="md:col-span-7">
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">An equal-opportunity press</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
              Pressed by the hands that <span className="italic">grow the grain.</span>
            </h2>
            <p className="mt-6 text-foreground/75 text-lg leading-relaxed max-w-2xl">
              Oryzza is an equal-opportunity operation. Our supply chain leans deliberately on <strong className="text-primary">women agro-processors</strong> — the millers, huskers and drying-yard collectives whose work has long been undercounted. Every tonne of biomass we press goes through their hands first, and is paid for at the gate.
            </p>
          </div>
          <div className="md:col-span-5">
            <div className="bg-card border border-border p-10 shadow-soft">
              <Users className="w-10 h-10 text-primary mb-5" strokeWidth={1.25} aria-hidden />
              <div className="text-5xl md:text-6xl font-display text-primary">≥50%</div>
              <p className="mt-3 text-foreground/70">of our biomass is sourced through women-led processing collectives.</p>
            </div>
          </div>
        </div>
      </Section>


      {/* QUESTIONS / FAQ */}
      <Section id="questions" className="bg-[oklch(0.97_0.005_100)]">
        <div className="grid md:grid-cols-12 gap-12">
          <div className="md:col-span-5">
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">Questions you might have</p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
              Ask us <span className="italic">anything.</span>
            </h2>
            <p className="mt-6 text-foreground/70 text-lg max-w-md">
              The ones we hear most often. If yours isn't here, our inbox is open.
            </p>
            <a href={`mailto:${EMAIL}`} className="inline-block mt-6 text-primary underline decoration-primary/30 underline-offset-4 hover:decoration-primary">
              {EMAIL}
            </a>
          </div>
          <div className="md:col-span-7">
            <ul className="divide-y divide-border border-y border-border">
              {faqs.map((f, i) => {
                const open = openFaq === i;
                return (
                  <li key={f.q}>
                    <button
                      type="button"
                      onClick={() => setOpenFaq(open ? null : i)}
                      aria-expanded={open}
                      className="w-full flex items-start gap-6 py-6 text-left group"
                    >
                      <span className="font-display text-2xl text-accent shrink-0 w-10">{String(i + 1).padStart(2, "0")}</span>
                      <span className="flex-1 text-lg md:text-xl text-primary leading-snug">{f.q}</span>
                      <span className={`shrink-0 mt-2 w-6 h-6 rounded-full border border-primary/40 flex items-center justify-center text-primary transition-transform duration-300 ${open ? "rotate-45" : ""}`}>
                        <span className="block w-3 h-px bg-primary relative before:absolute before:inset-0 before:bg-primary before:rotate-90" />
                      </span>
                    </button>
                    <div className={`grid transition-all duration-500 ease-out ${open ? "grid-rows-[1fr] opacity-100 pb-6" : "grid-rows-[0fr] opacity-0"}`}>
                      <div className="overflow-hidden">
                        <p className="pl-16 pr-8 text-foreground/75 leading-relaxed max-w-2xl">{f.a}</p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ul>
          </div>
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
            <div className="flex items-center gap-3">
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 rounded-full bg-bone text-primary px-7 py-3.5 text-sm tracking-wide hover:bg-bone/90 transition"
              >
                Start a conversation →
              </a>
              <a
                href={X_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Oryzza on X (@oryzzawares)"
                className="inline-flex items-center justify-center w-12 h-12 rounded-full border border-bone/40 text-bone hover:bg-bone/10 transition"
              >
                <XLogo className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </Section>

      {/* FOOTER */}
      <footer className="bg-background border-t border-border">
        <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20 py-12 flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
          <img src={logoGreen} alt="Oryzza" className="h-8 w-auto" />
          <p className="text-sm text-foreground/60 font-display italic">Wares of the future.</p>
          <div className="flex items-center gap-5">
            <a href={X_URL} target="_blank" rel="noopener noreferrer" aria-label="Oryzza on X (@oryzzawares)"
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-border text-foreground/70 hover:text-primary hover:border-primary transition">
              <XLogo className="w-3.5 h-3.5" />
            </a>
            <p className="text-xs text-foreground/50 tracking-wide">
              © {new Date().getFullYear()} Oryzza. Made in Aba.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
