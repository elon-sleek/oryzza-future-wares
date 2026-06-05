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
import huskHill from "@/assets/husk-hill-abakaliki.jpg";
import womanRice from "@/assets/woman-rice-harvest.jpg";

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

function useInView<T extends HTMLElement>(threshold = 0.25) {
  const ref = useRef<T>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { setInView(true); io.disconnect(); }
    }, { threshold });
    io.observe(ref.current);
    return () => io.disconnect();
  }, [threshold]);
  return [ref, inView] as const;
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

  useEffect(() => {
    const t = setInterval(() => setSlide((s) => (s + 1) % heroSlides.length), 5000);
    return () => clearInterval(t);
  }, []);


  const [goalsRef, goalsInView] = useInView<HTMLDivElement>(0.3);

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

        {/* The husk hill of Abakaliki — cinematic full-width band */}
        <div className="relative mt-28 md:mt-36">
          {/* big irregular-shaped image sitting behind, with slow wavy outline */}
          <div className="relative h-[520px] md:h-[680px] overflow-hidden blob-2 animate-blob-wave shadow-leaf">
            <img
              src={huskHill}
              alt="The rice husk hill of Abakaliki, Ebonyi State — workers sift husk on a man-made mountain of rice mill waste"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover scale-105"
            />
            {/* darker bottom gradient so the title (placed safely inside the image) stays legible */}
            <div className="absolute inset-0 bg-gradient-to-t from-primary/90 via-primary/40 to-primary/10" />
            {/* Title intentionally kept well within the image frame (padded inward to avoid blob curves) */}
            <div className="absolute inset-x-0 bottom-0 px-10 md:px-20 pb-14 md:pb-20">
              <p className="text-bone/85 uppercase tracking-[0.3em] text-xs mb-3">A mountain made of waste</p>
              <h3 className="font-display text-bone text-3xl md:text-5xl lg:text-6xl leading-[1.02] max-w-3xl text-shadow-hero">
                The rice-husk hill of <span className="italic">Abakaliki.</span>
              </h3>
            </div>
          </div>

          {/* paragraph card — confined within its own irregular blob frame, floating downward over the image */}
          <div className="relative md:absolute md:bottom-[-70px] md:right-6 lg:right-12 md:max-w-xl bg-card text-card-foreground blob-3 animate-blob-wave shadow-soft p-10 md:p-14 mt-[-60px] md:mt-0 mx-6 md:mx-0">
            <div className="space-y-5 text-base text-foreground/80 leading-relaxed">
              <p>
                In <span className="text-primary font-medium">Abakaliki, Ebonyi State</span>, a literal hill has risen out of rice. Since the
                <span className="text-primary font-medium"> mid-1970s</span>, when the Abakaliki rice-mill cluster began processing the harvests of Nigeria's eastern belt,
                the husk left after milling has been dumped on the same ground — season after season. Half a century later it is a landmark visible from the sky:
                a man-made mountain of agro-waste, picked over by women and children for a few naira a basin.
              </p>
              <p>
                Ebonyi is one of Nigeria's largest rice-producing states. Every tonne of paddy milled there leaves roughly
                <span className="text-primary font-medium"> 200 kg of husk</span> behind — burned, dumped or slowly smouldering, releasing CO₂, methane and soot into the city's air.
              </p>
              <p className="text-primary font-display text-xl italic">
                Oryzza's press exists to flatten that hill — one ware at a time.
              </p>
            </div>
          </div>
        </div>
        <div className="hidden md:block h-32" />
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
            From our agro-fibre press, an expansive family of single-use wares — each one moulded, used, and returned to soil.
          </p>
        </div>

        <div className="mt-14 overflow-hidden relative [mask-image:linear-gradient(to_right,transparent,black_4%,black_96%,transparent)]">
          <div className="flex w-max animate-marquee">
            {[...products, ...products].map(({ name, Icon, tint }, idx) => (
              <article
                key={`${name}-${idx}`}
                className={`relative ${tint} text-bone shrink-0 w-[78vw] sm:w-[42vw] md:w-[28vw] lg:w-[22vw] h-[360px] md:h-[440px] overflow-hidden group`}
              >
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

        <div ref={goalsRef} className="mt-16 grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {goals.map((g, i) => {
            const Icon = g.Icon;
            return (
              <article
                key={g.n}
                className={`relative p-8 bg-card text-card-foreground border border-border ${i % 2 === 0 ? "blob-2" : "blob-1"} hover:-translate-y-1 transition duration-500 shadow-soft`}
              >
                <div className="flex items-center gap-3 mb-4">
                  <span
                    className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary text-bone ${goalsInView ? "animate-tether" : ""}`}
                    style={{ animationDelay: `${i * 0.25}s` }}
                  >
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
            <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">Our impact so far</p>
            <h3 className="text-3xl md:text-4xl text-primary leading-[1.1]">
              Since the day our first press came down — <span className="italic">a running tally of what fibre, not plastic, has done.</span>
            </h3>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            <Stat value={3}      suffix=" t"      label="of agro-biomass upcycled into ware to date." />
            <Stat value={7830}                    label="Swoon spoons pressed since production began." />
            <Stat value={7830}                    label="single-use plastic spoons kept out of drains and landfill." />
            <Stat value={11.7}   decimals={1} suffix=" kg"      label="petrochemical plastic avoided to date." />
            <Stat value={4.5}    decimals={1} suffix=" t CO₂e"  label="emissions avoided vs. open-burning the same biomass." />
            <Stat value={31300}  suffix=" L"      label="water saved vs. a conventional moulded-fibre line." />
          </div>
          <p className="mt-8 text-xs text-foreground/50 max-w-3xl leading-relaxed">
            Cumulative since first production. Estimates based on IPCC open-burning emission factors (~1.5 t CO₂ per tonne of dry agro-residue), an average 1.5 g per disposable plastic spoon, and an 80% water reduction vs. conventional moulded-fibre pulp lines.
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
        <div className="max-w-3xl mb-12">
          <p className="text-accent uppercase tracking-[0.3em] text-xs mb-5">An equal-opportunity press</p>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-primary leading-[1.05]">
            Pressed by the hands that <span className="italic">grow the grain.</span>
          </h2>
        </div>

        <div className="relative">
          {/* big irregular-shaped image behind */}
          <div className="relative h-[560px] md:h-[680px] overflow-hidden blob-1 shadow-leaf">
            <img
              src={womanRice}
              alt="A woman rice farmer in Nigeria holding a freshly harvested bundle of paddy, with other farmers working the field behind her"
              loading="lazy"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-primary/70 via-primary/20 to-transparent" />
          </div>

          {/* paragraph card floating over the image, on the left */}
          <div className="relative md:absolute md:top-1/2 md:-translate-y-1/2 md:left-6 lg:left-12 md:max-w-md bg-card text-card-foreground blob-4 shadow-soft p-8 md:p-10 mt-[-80px] md:mt-0 mx-6 md:mx-0">
            <p className="text-foreground/80 leading-relaxed">
              Oryzza is an equal-opportunity operation. Our supply chain leans deliberately on
              <strong className="text-primary"> women agro-processors</strong> — the rice farmers, millers, huskers and
              drying-yard collectives of eastern Nigeria whose work has long been undercounted. Every tonne of biomass
              we press goes through their hands first, and is paid for at the gate.
            </p>
            <div className="mt-6 flex items-center gap-4 border-t border-border pt-5">
              <Users className="w-8 h-8 text-primary shrink-0" strokeWidth={1.25} aria-hidden />
              <div>
                <div className="text-3xl font-display text-primary leading-none">≥50%</div>
                <p className="mt-1 text-xs text-foreground/65">of biomass sourced through women-led collectives.</p>
              </div>
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
