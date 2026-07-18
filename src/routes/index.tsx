import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import {
  Activity,
  Apple,
  Award,
  ChevronRight,
  Clock,
  Dumbbell,
  Flame,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Phone,
  Play,
  Sparkles,
  Star,
  Trophy,
  Users,
  X,
  Zap,
} from "lucide-react";

import heroGym from "@/assets/hero-gym.jpg";
import coachFrontAsset from "@/assets/bodybuilder-front.jpg.asset.json";
import coachWideAsset from "@/assets/bodybuilder-wide.jpg.asset.json";
import thailandAsset from "@/assets/thailand-champion.png.asset.json";
import trophyWallAsset from "@/assets/trophy-wall.png.asset.json";
import coachingAsset from "@/assets/coaching-session.jpg.asset.json";
import gymInteriorAsset from "@/assets/gym-interior.jpg.asset.json";

const coachFront = coachFrontAsset.url;
const coachWide = coachWideAsset.url;
const thailandImg = thailandAsset.url;
const trophyWallImg = trophyWallAsset.url;
const coachingImg = coachingAsset.url;
const gymInteriorImg = gymInteriorAsset.url;

export const Route = createFileRoute("/")({
  component: Landing,
});

const WA_NUMBER = "919743231514";
const WA_MSG = encodeURIComponent(
  "Hello Sahara Multi Fitness Team, I visited your website and would like to know more about membership plans and training programs.",
);
const WA_URL = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;
const IG_GYM = "https://www.instagram.com/sahara_multi_fitness";
const IG_COACH = "https://www.instagram.com/sulemansalman";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "About", href: "#about" },
  { label: "Programs", href: "#programs" },
  { label: "Membership", href: "#membership" },
  { label: "Achievements", href: "#achievements" },
  { label: "Certifications", href: "#certifications" },
  { label: "Gallery", href: "#gallery" },
  { label: "Contact", href: "#contact" },
];

/* ---------- shared bits ---------- */

function Particles() {
  const dots = useMemo(
    () =>
      Array.from({ length: 28 }).map(() => ({
        left: Math.random() * 100,
        delay: Math.random() * 12,
        duration: 12 + Math.random() * 14,
        size: 1 + Math.random() * 2.5,
      })),
    [],
  );
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((d, i) => (
        <span
          key={i}
          className="absolute bottom-0 rounded-full bg-gold/70 blur-[1px]"
          style={{
            left: `${d.left}%`,
            width: d.size,
            height: d.size,
            animation: `particle-drift ${d.duration}s linear ${d.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}

function SectionTitle({
  eyebrow,
  title,
  subtitle,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  subtitle?: string;
}) {
  return (
    <div className="mx-auto mb-12 max-w-2xl text-center sm:mb-16">
      {eyebrow && (
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold"
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-balance text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-6xl"
      >
        {title}
      </motion.h2>
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="mt-5 text-sm text-muted-foreground sm:text-base"
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
}

function GoldButton({
  children,
  href,
  onClick,
  variant = "solid",
  className = "",
  target,
  rel,
}: {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline";
  className?: string;
  target?: string;
  rel?: string;
}) {
  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-semibold uppercase tracking-wider transition-all duration-300 sm:px-7 sm:py-3.5";
  const solid =
    "bg-gold-gradient text-black shadow-[0_10px_30px_-10px_oklch(0.82_0.15_85/0.7)] hover:shadow-[0_18px_50px_-10px_oklch(0.82_0.15_85/0.9)] hover:-translate-y-0.5";
  const outline =
    "border border-gold/40 text-gold hover:border-gold hover:bg-gold/10 hover:-translate-y-0.5";
  const cls = `${base} ${variant === "solid" ? solid : outline} ${className}`;
  const inner = (
    <>
      <span className="relative z-10 flex items-center gap-2">{children}</span>
      {variant === "solid" && (
        <span className="absolute inset-0 rounded-full opacity-0 blur-xl transition-opacity duration-500 group-hover:opacity-100 bg-gold-gradient" />
      )}
    </>
  );
  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={cls}>
        {inner}
      </a>
    );
  }
  return (
    <button type="button" onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}

/* ---------- navbar ---------- */

function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled ? "border-b border-gold/10 bg-background/80 backdrop-blur-xl" : "bg-transparent"
        }`}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:h-20 sm:px-6 lg:px-8">
          <a href="#home" className="group flex min-w-0 items-center gap-2.5 shrink-0">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-gold-gradient text-black shadow-[0_8px_20px_-6px_oklch(0.82_0.15_85/0.6)]">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="flex min-w-0 flex-col leading-none">
              <span className="truncate text-[11px] font-black uppercase tracking-[0.2em] text-gold-gradient sm:text-sm sm:tracking-widest">
                Sahara Multi Fitness
              </span>
              <span className="truncate text-[9px] uppercase tracking-[0.3em] text-muted-foreground sm:text-[10px]">
                Unisex
              </span>
            </span>
          </a>

          <nav className="hidden items-center gap-1 xl:flex">
            {NAV.map((n) => (
              <a
                key={n.href}
                href={n.href}
                className="relative rounded-full px-3.5 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-gold"
              >
                {n.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2 sm:gap-3">
            <a
              href={IG_GYM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
              className="hidden h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-all hover:bg-gold hover:text-black sm:grid"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="hidden h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-all hover:bg-gold hover:text-black sm:grid"
            >
              <MessageCircle className="h-4.5 w-4.5" />
            </a>
            <a
              href="#membership"
              className="hidden rounded-full bg-gold-gradient px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black shadow-[0_8px_25px_-8px_oklch(0.82_0.15_85/0.8)] transition-all hover:-translate-y-0.5 sm:inline-flex"
            >
              Join Now
            </a>
            <button
              type="button"
              aria-label="Menu"
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold xl:hidden"
            >
              {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 xl:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-2xl" />
            <div className="relative flex h-full flex-col items-center justify-center gap-1 px-6">
              {NAV.map((n, i) => (
                <motion.a
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05 }}
                  className="py-3 text-3xl font-black uppercase tracking-wider text-foreground transition-colors hover:text-gold"
                >
                  {n.label}
                </motion.a>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="mt-8 flex gap-3"
              >
                <a
                  href={IG_GYM}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href={WA_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="grid h-12 w-12 place-items-center rounded-full border border-gold/30 text-gold"
                >
                  <MessageCircle className="h-5 w-5" />
                </a>
                <a
                  href="#membership"
                  onClick={() => setOpen(false)}
                  className="rounded-full bg-gold-gradient px-6 py-3 text-xs font-bold uppercase tracking-widest text-black"
                >
                  Join Now
                </a>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/* ---------- hero ---------- */

function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const stats = [
    { icon: Flame, value: "12,000+", label: "KGs Lost Together" },
    { icon: Users, value: "500+", label: "Members Transformed" },
    { icon: Trophy, value: "45+", label: "Champions Trained" },
    { icon: Star, value: "98%", label: "Success Rate" },
  ];

  return (
    <section id="home" ref={ref} className="relative min-h-screen overflow-hidden pt-20 sm:pt-24">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <img
          src={heroGym}
          alt="Sahara Multi Fitness luxury gym interior"
          className="h-full w-full object-cover opacity-40"
          width={1920}
          height={1080}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,oklch(0.82_0.15_85/0.18),transparent_50%)]" />
      </motion.div>
      <Particles />

      <div className="relative mx-auto grid max-w-7xl gap-10 px-4 pb-16 pt-8 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pt-16">
        {/* left */}
        <div className="flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex w-fit items-center gap-2 rounded-full border border-gold/25 bg-gold/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.3em] text-gold backdrop-blur-sm"
          >
            <Sparkles className="h-3.5 w-3.5" /> Transformations
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.7 }}
            className="mt-6 text-5xl font-black uppercase leading-[0.9] sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Real people.
            <br />
            <span className="text-gold-gradient">Real results.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.35 }}
            className="mt-6 max-w-xl text-base text-muted-foreground sm:text-lg"
          >
            Sahara Multi Fitness is more than a gym — it's a commitment to strength, discipline,
            and transformation. Train under champion coaches and unlock your full potential.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <GoldButton href="#membership">
              Join Now <ChevronRight className="h-4 w-4" />
            </GoldButton>
            <GoldButton
              href={IG_GYM}
              target="_blank"
              rel="noreferrer"
              variant="outline"
            >
              <Play className="h-4 w-4" /> Watch Story
            </GoldButton>
          </motion.div>

          <div className="mt-10 flex items-center gap-6 border-t border-gold/10 pt-6 text-xs uppercase tracking-widest text-muted-foreground">
            <span className="text-gold">★★★★★</span>
            <span>Trusted by 500+ athletes in Gangavathi</span>
          </div>
        </div>

        {/* right */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.2 }}
          className="relative mx-auto w-full max-w-md lg:max-w-none"
        >
          <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl gold-border">
            <div className="absolute inset-0 bg-gold-gradient opacity-20" />
            <img
              src={coachImg}
              alt="Coach Suleman Mustafa"
              className="h-full w-full object-cover"
              width={900}
              height={1200}
            />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Head Coach</p>
              <p className="mt-1 text-2xl font-black uppercase">Suleman Mustafa</p>
              <p className="text-xs text-muted-foreground">Mr. World Overall Champion</p>
            </div>
          </div>

          {/* floating stats */}
          <div className="pointer-events-none absolute -left-2 top-6 hidden sm:block">
            <StatCard s={stats[0]} delay={0.6} />
          </div>
          <div className="pointer-events-none absolute -right-2 top-32 hidden sm:block">
            <StatCard s={stats[2]} delay={0.8} />
          </div>
          <div className="pointer-events-none absolute -left-3 bottom-32 hidden sm:block">
            <StatCard s={stats[1]} delay={1} />
          </div>
          <div className="pointer-events-none absolute -right-3 bottom-6 hidden sm:block">
            <StatCard s={stats[3]} delay={1.2} />
          </div>
        </motion.div>
      </div>

      {/* mobile stats grid */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-3 px-4 pb-8 sm:hidden">
        {stats.map((s, i) => (
          <StatCard key={i} s={s} delay={0.1 * i} inline />
        ))}
      </div>
    </section>
  );
}

function StatCard({
  s,
  delay = 0,
  inline = false,
}: {
  s: { icon: React.ComponentType<{ className?: string }>; value: string; label: string };
  delay?: number;
  inline?: boolean;
}) {
  const Icon = s.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className={`glass-strong pointer-events-auto rounded-2xl p-3 sm:p-4 ${
        inline ? "" : "animate-float-slow shadow-[0_20px_60px_-20px_oklch(0.82_0.15_85/0.35)]"
      }`}
      style={inline ? {} : { animationDelay: `${delay}s` }}
    >
      <div className="flex items-center gap-3">
        <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-gold/15 text-gold">
          <Icon className="h-4 w-4" />
        </span>
        <div className="min-w-0">
          <p className="text-lg font-black leading-none text-gold-gradient sm:text-xl">{s.value}</p>
          <p className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">
            {s.label}
          </p>
        </div>
      </div>
    </motion.div>
  );
}

/* ---------- quick info ---------- */

function QuickInfo() {
  const cards = [
    {
      icon: MapPin,
      title: "Location",
      body: (
        <>
          Opposite Musti Petrol Pump,<br />
          Above Federal Bank, Koppal Road,<br />
          Prashant Nagar, Gangavathi.
        </>
      ),
    },
    {
      icon: Phone,
      title: "Call Us",
      body: (
        <div className="space-y-1">
          <a href="tel:+919743231514" className="block hover:text-gold">
            +91 97432 31514
          </a>
          <a href="tel:+917019767877" className="block hover:text-gold">
            +91 70197 67877
          </a>
        </div>
      ),
    },
    {
      icon: Clock,
      title: "Opening Hours",
      body: (
        <div className="space-y-1 text-xs">
          <p><span className="text-gold">Mon – Fri:</span> 5–9 AM · 5–9:30 PM</p>
          <p><span className="text-gold">Saturday:</span> 5 AM – 9 AM</p>
          <p><span className="text-gold">Sunday:</span> Closed</p>
        </div>
      ),
    },
    {
      icon: MessageCircle,
      title: "WhatsApp",
      body: (
        <>
          <p className="mb-3 text-xs text-muted-foreground">Message the team directly.</p>
          <a
            href={WA_URL}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 rounded-full bg-gold-gradient px-4 py-2 text-xs font-bold uppercase tracking-widest text-black"
          >
            Chat Now <ChevronRight className="h-3 w-3" />
          </a>
        </>
      ),
    },
  ];
  return (
    <section className="relative -mt-8 px-4 pb-16 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((c, i) => {
          const Icon = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass-strong group relative overflow-hidden rounded-2xl p-6"
            >
              <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-gold to-transparent opacity-60" />
              <span className="mb-4 grid h-11 w-11 place-items-center rounded-xl bg-gold/10 text-gold transition-transform group-hover:scale-110">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="mb-2 text-lg font-bold uppercase tracking-wider">{c.title}</h3>
              <div className="text-sm text-muted-foreground">{c.body}</div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- about ---------- */

function About() {
  return (
    <section id="about" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative aspect-square w-full overflow-hidden rounded-3xl gold-border">
            <img src={g1} alt="Gym interior" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="glass-strong absolute -bottom-6 -right-2 rounded-2xl p-4 sm:-right-6 sm:p-5">
            <div className="flex items-center gap-3">
              <Award className="h-8 w-8 text-gold" />
              <div>
                <p className="text-2xl font-black text-gold-gradient">15+</p>
                <p className="text-[10px] uppercase tracking-widest text-muted-foreground">
                  Years of Excellence
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        <div>
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
            About the Gym
          </p>
          <h2 className="text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-6xl">
            Where champions <span className="text-gold-gradient">are forged.</span>
          </h2>
          <p className="mt-6 text-muted-foreground">
            Sahara Multi Fitness is Gangavathi's premier destination for serious training. From
            strength and hypertrophy to fat loss and elite conditioning, every program is engineered
            by Mr. World champion Suleman Mustafa and delivered with world-class equipment,
            science-backed methods and relentless standards.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4">
            {[
              { icon: Trophy, t: "Champion Coaches" },
              { icon: Dumbbell, t: "Premium Equipment" },
              { icon: Apple, t: "Custom Diet Plans" },
              { icon: Heart, t: "Personal Attention" },
            ].map((f) => {
              const Ic = f.icon;
              return (
                <div key={f.t} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-gold/10 text-gold">
                    <Ic className="h-4.5 w-4.5" />
                  </span>
                  <span className="text-sm font-semibold">{f.t}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- programs ---------- */

function Programs() {
  const items = [
    { icon: Dumbbell, title: "Gym & Strength Training", desc: "Progressive overload, powerlifting fundamentals and hypertrophy blocks." },
    { icon: Users, title: "Personal Training", desc: "1-on-1 coaching with the champion himself — form, plan and results." },
    { icon: Flame, title: "Fat Loss / Weight Gain", desc: "Structured cutting and bulking cycles built around your goals." },
    { icon: Sparkles, title: "Body Transformation", desc: "12- and 24-week programs designed to change the way you look and feel." },
    { icon: Zap, title: "CrossFit", desc: "High-intensity functional training for total-body conditioning." },
    { icon: Apple, title: "Diet Plans", desc: "Personalised nutrition from a certified nutrition scientist." },
    { icon: Activity, title: "Cardio", desc: "Modern cardio floor with treadmills, cycles and interval programming." },
  ];
  return (
    <section id="programs" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionTitle
        eyebrow="Programs"
        title={
          <>
            Train. Transform. <span className="text-gold-gradient">Achieve.</span>
          </>
        }
        subtitle="Seven disciplines. One standard: championship-level results."
      />
      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((it, i) => {
          const Icon = it.icon;
          return (
            <motion.div
              key={it.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass-strong group relative overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 hover:border-gold/50 hover:shadow-[0_30px_60px_-30px_oklch(0.82_0.15_85/0.5)]"
            >
              <div className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-gold/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
              <span className="mb-5 inline-grid h-14 w-14 place-items-center rounded-2xl bg-gold/10 text-gold transition-all group-hover:bg-gold group-hover:text-black group-hover:shadow-[0_0_30px_oklch(0.82_0.15_85/0.6)]">
                <Icon className="h-6 w-6" />
              </span>
              <h3 className="mb-2 text-xl font-black uppercase tracking-wide">{it.title}</h3>
              <p className="text-sm text-muted-foreground">{it.desc}</p>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- membership ---------- */

type Plan = {
  name: string;
  admission: string;
  monthly: string;
  package: string;
  offer: string;
  highlight?: boolean;
};

const plansNoCardio: Plan[] = [
  { name: "1 Month", admission: "₹200", monthly: "₹800", package: "₹1,000", offer: "Basic Diet" },
  { name: "3 Months", admission: "₹200", monthly: "₹750", package: "₹2,450", offer: "1 Diet Chart + 10 Days Gym Free" },
  { name: "6 Months", admission: "Free", monthly: "₹700", package: "₹4,200", offer: "1 Diet Chart + 20 Days Gym Free", highlight: true },
  { name: "12 Months", admission: "Free", monthly: "₹650", package: "₹7,800", offer: "2 Diet Charts + 1 Month Gym Free" },
];

const plansCardio: Plan[] = [
  { name: "1 Month", admission: "₹200", monthly: "₹1,500", package: "₹1,700", offer: "Basic Diet" },
  { name: "3 Months", admission: "Free", monthly: "₹1,450", package: "₹4,450", offer: "1 Diet Chart + 10 Days Gym Free" },
  { name: "6 Months", admission: "Free", monthly: "₹1,400", package: "₹8,400", offer: "1 Diet Chart + 20 Days Gym Free", highlight: true },
  { name: "12 Months", admission: "Free", monthly: "₹1,250", package: "₹15,000", offer: "2 Diet Charts + 1 Month Gym Free" },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`relative flex flex-col overflow-hidden rounded-2xl p-6 transition-all duration-500 hover:-translate-y-1 ${
        plan.highlight
          ? "border border-gold/50 bg-gradient-to-b from-gold/10 via-transparent to-transparent shadow-[0_30px_60px_-30px_oklch(0.82_0.15_85/0.5)]"
          : "glass-strong"
      }`}
    >
      {plan.highlight && (
        <span className="absolute right-4 top-4 rounded-full bg-gold-gradient px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-black">
          Popular
        </span>
      )}
      <p className="text-xs uppercase tracking-[0.3em] text-gold">{plan.name}</p>
      <p className="mt-3 flex flex-wrap items-baseline gap-1 text-4xl font-black text-gold-gradient sm:text-5xl">
        {plan.package}
        <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
          /total
        </span>
      </p>
      <div className="mt-5 space-y-2.5 text-sm">
        <Row label="Admission" value={plan.admission} />
        <Row label="Monthly" value={`${plan.monthly}/mo`} />
        <Row label="Offer" value={plan.offer} multiline />
      </div>
      <a
        href={WA_URL}
        target="_blank"
        rel="noreferrer"
        className={`mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-xs font-bold uppercase tracking-widest transition-all ${
          plan.highlight
            ? "bg-gold-gradient text-black hover:-translate-y-0.5"
            : "border border-gold/40 text-gold hover:bg-gold/10"
        }`}
      >
        Enrol via WhatsApp <ChevronRight className="h-3.5 w-3.5" />
      </a>
    </motion.div>
  );
}

function Row({ label, value, multiline }: { label: string; value: string; multiline?: boolean }) {
  return (
    <div className={`flex gap-3 border-b border-gold/10 pb-2 last:border-none ${multiline ? "flex-col sm:flex-row sm:items-start sm:justify-between" : "items-center justify-between"}`}>
      <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
      <span className="text-right text-sm font-semibold text-foreground break-words">{value}</span>
    </div>
  );
}

function Membership() {
  const [tab, setTab] = useState<"no" | "yes">("no");
  const plans = tab === "no" ? plansNoCardio : plansCardio;
  return (
    <section id="membership" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionTitle
        eyebrow="Membership"
        title={
          <>
            Gents <span className="text-gold-gradient">Membership Packages</span>
          </>
        }
        subtitle="Two tracks. Four durations. One goal — championship-level transformation."
      />

      <div className="mb-10 flex justify-center">
        <div className="glass-strong inline-flex rounded-full p-1">
          {(
            [
              ["no", "Without Cardio"],
              ["yes", "With Cardio"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              className={`rounded-full px-5 py-2.5 text-xs font-bold uppercase tracking-widest transition-all sm:px-7 ${
                tab === key ? "bg-gold-gradient text-black shadow-[0_8px_20px_-8px_oklch(0.82_0.15_85/0.8)]" : "text-muted-foreground hover:text-gold"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {plans.map((p) => (
          <PlanCard key={`${tab}-${p.name}`} plan={p} />
        ))}
      </div>

      <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-2 rounded-2xl border border-gold/15 bg-gold/5 p-5 text-center text-xs text-muted-foreground sm:text-sm">
        <p>★ Extra charges apply for personal training.</p>
        <p>★ Gym rules are strictly and compulsorily maintained.</p>
      </div>
    </section>
  );
}

/* ---------- achievements / coach ---------- */

function Achievements() {
  const awards = [
    { icon: Trophy, title: "Mr. World Overall Champion", year: "International" },
    { icon: Trophy, title: "Mr. India Overall Champion", year: "National" },
    { icon: Award, title: "Mr. Karnataka", year: "State" },
    { icon: Award, title: "Mr. State Karnataka", year: "State" },
    { icon: Trophy, title: "Mr. Hyderabad Karnataka Overall Champion", year: "Regional" },
    { icon: Star, title: "UWSFF Professional Athlete", year: "Federation" },
  ];
  return (
    <section id="achievements" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionTitle
        eyebrow="Meet Your Coach"
        title={
          <>
            Suleman <span className="text-gold-gradient">Mustafa</span>
          </>
        }
        subtitle="Fitness Expert. Multi-title champion. Mentor to Gangavathi's next generation of athletes."
      />

      <div className="mx-auto grid max-w-6xl items-start gap-10 lg:grid-cols-[minmax(0,1fr)_1.2fr]">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative aspect-[3/4] overflow-hidden rounded-3xl gold-border">
            <img src={coachImg} alt="Suleman Mustafa" className="h-full w-full object-cover" loading="lazy" />
            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-background via-background/70 to-transparent p-5">
              <p className="text-xs uppercase tracking-[0.3em] text-gold">Fitness Expert</p>
              <p className="text-xl font-black uppercase">Suleman Mustafa</p>
            </div>
          </div>
        </motion.div>

        <div className="relative">
          <span className="absolute left-5 top-2 bottom-2 hidden w-px bg-gradient-to-b from-gold via-gold/40 to-transparent sm:block" />
          <div className="space-y-4">
            {awards.map((a, i) => {
              const Ic = a.icon;
              return (
                <motion.div
                  key={a.title}
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="glass-strong group relative flex items-center gap-4 rounded-2xl p-4 sm:pl-16 transition-all hover:border-gold/50 hover:translate-x-1"
                >
                  <span className="absolute left-0 hidden h-11 w-11 -translate-x-1/2 place-items-center rounded-full bg-background sm:grid" style={{ left: "1.25rem" }}>
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gold-gradient text-black shadow-[0_0_20px_oklch(0.82_0.15_85/0.5)]">
                      <Ic className="h-5 w-5" />
                    </span>
                  </span>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gold/15 text-gold sm:hidden">
                    <Ic className="h-5 w-5" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-black uppercase tracking-wide sm:text-base">{a.title}</p>
                    <p className="text-[10px] uppercase tracking-[0.25em] text-gold">{a.year}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- certifications ---------- */

function Certifications() {
  const certs = [
    {
      title: "Nutrition Science & Diet Planning",
      started: "18 June 2026",
      completed: "29 June 2026",
      icon: Apple,
    },
    {
      title: "Exercise Science & Workout Planning",
      started: "03 July 2026",
      completed: "13 July 2026",
      icon: Activity,
    },
  ];
  return (
    <section id="certifications" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionTitle
        eyebrow="Credentials"
        title={
          <>
            Professional <span className="text-gold-gradient">Certifications</span>
          </>
        }
        subtitle="Formal accreditation behind every training and diet plan we prescribe."
      />
      <div className="mx-auto grid max-w-5xl gap-6 sm:grid-cols-2">
        {certs.map((c, i) => {
          const Ic = c.icon;
          return (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="glass-strong group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1 hover:border-gold/50"
            >
              <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold to-transparent" />
              <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-gold/10 blur-3xl transition-opacity group-hover:opacity-100" />
              <div className="flex items-center justify-between">
                <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gold-gradient text-black shadow-[0_10px_30px_-10px_oklch(0.82_0.15_85/0.7)]">
                  <Ic className="h-7 w-7" />
                </span>
                <Award className="h-8 w-8 text-gold/50" />
              </div>
              <h3 className="mt-6 text-2xl font-black uppercase leading-tight">{c.title}</h3>
              <div className="mt-6 space-y-2 border-t border-gold/10 pt-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Started</span>
                  <span className="font-semibold">{c.started}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Completed</span>
                  <span className="font-semibold text-gold">{c.completed}</span>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}

/* ---------- gallery ---------- */

function Gallery() {
  const imgs = [
    { src: g1, alt: "Premium cardio floor" },
    { src: g2, alt: "Championship trophy" },
    { src: g3, alt: "Barbell training" },
    { src: g4, alt: "Dumbbell rack" },
    { src: g5, alt: "Personal training session" },
    { src: g6, alt: "Competition poster" },
  ];
  const [active, setActive] = useState<number | null>(null);
  return (
    <section id="gallery" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionTitle
        eyebrow="Gallery"
        title={
          <>
            Inside <span className="text-gold-gradient">Sahara</span>
          </>
        }
        subtitle="Training floors, champion moments, and the community that makes it home."
      />
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
        {imgs.map((img, i) => (
          <motion.button
            key={i}
            type="button"
            onClick={() => setActive(i)}
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className={`group relative overflow-hidden rounded-2xl gold-border ${
              i === 0 || i === 3 ? "sm:col-span-2 sm:row-span-2" : ""
            }`}
            style={{ aspectRatio: i === 0 || i === 3 ? "1 / 1" : "3 / 4" }}
          >
            <img
              src={img.src}
              alt={img.alt}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-70 transition-opacity group-hover:opacity-40" />
            <div className="absolute inset-x-0 bottom-0 p-3 text-left">
              <p className="text-xs font-semibold uppercase tracking-widest text-gold">
                {img.alt}
              </p>
            </div>
          </motion.button>
        ))}
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setActive(null)}
            className="fixed inset-0 z-[70] grid place-items-center bg-background/95 p-4 backdrop-blur-xl"
          >
            <motion.img
              key={active}
              src={imgs[active].src}
              alt={imgs[active].alt}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              className="max-h-[85vh] w-auto rounded-2xl gold-border"
              onClick={(e) => e.stopPropagation()}
            />
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 grid h-11 w-11 place-items-center rounded-full border border-gold/30 bg-background/70 text-gold"
            >
              <X className="h-5 w-5" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

/* ---------- social ---------- */

function Social() {
  const cards = [
    {
      title: "Sahara Multi Fitness",
      handle: "@sahara_multi_fitness",
      followers: "98.1K+",
      posts: "836+",
      href: IG_GYM,
      btn: "Follow Gym",
      badges: null as string[] | null,
    },
    {
      title: "Suleman Mustafa",
      handle: "@sulemansalman",
      followers: "39.7K+",
      posts: "828+",
      href: IG_COACH,
      btn: "Follow Coach",
      badges: [
        "Mr. World Overall Champion",
        "Mr. India Overall Champion",
        "Mr. Karnataka",
        "Mr. State Karnataka",
        "Mr. Hyderabad Karnataka Overall Champion",
      ],
    },
  ];
  return (
    <section className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <SectionTitle
        eyebrow="Social"
        title={
          <>
            Follow the <span className="text-gold-gradient">Movement</span>
          </>
        }
      />
      <div className="mx-auto grid max-w-5xl gap-6 lg:grid-cols-2">
        {cards.map((c, i) => (
          <motion.a
            key={c.title}
            href={c.href}
            target="_blank"
            rel="noreferrer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            className="glass-strong group relative overflow-hidden rounded-3xl p-8 transition-all hover:-translate-y-1 hover:border-gold/50"
          >
            <div className="pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-gold/15 blur-3xl" />
            <div className="flex items-center gap-4">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-fuchsia-500 via-orange-500 to-yellow-400 text-white shadow-lg">
                <Instagram className="h-7 w-7" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-lg font-black uppercase">{c.title}</p>
                <p className="truncate text-sm text-gold">{c.handle}</p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl border border-gold/15 bg-gold/5 p-4 text-center">
                <p className="text-2xl font-black text-gold-gradient">{c.followers}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  Followers
                </p>
              </div>
              <div className="rounded-xl border border-gold/15 bg-gold/5 p-4 text-center">
                <p className="text-2xl font-black text-gold-gradient">{c.posts}</p>
                <p className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  Posts
                </p>
              </div>
            </div>
            {c.badges && (
              <ul className="mt-6 space-y-2">
                {c.badges.map((b) => (
                  <li key={b} className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Trophy className="h-3.5 w-3.5 shrink-0 text-gold" />
                    <span className="truncate">{b}</span>
                  </li>
                ))}
              </ul>
            )}
            <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-5 py-2.5 text-xs font-bold uppercase tracking-widest text-black">
              {c.btn} <ChevronRight className="h-3.5 w-3.5" />
            </span>
          </motion.a>
        ))}
      </div>
    </section>
  );
}

/* ---------- contact / footer ---------- */

function Contact() {
  return (
    <section id="contact" className="relative px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
      <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl gold-border p-8 sm:p-12 text-center relative">
        <div className="absolute inset-0 bg-gold-gradient opacity-10" />
        <div className="relative">
          <p className="text-xs font-semibold uppercase tracking-[0.35em] text-gold">Get Started</p>
          <h2 className="mt-4 text-4xl font-black uppercase leading-[0.95] sm:text-5xl md:text-6xl">
            Ready to <span className="text-gold-gradient">Train Like a Champion?</span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-muted-foreground">
            Walk in, meet the team, tour the floor. Or message us — we'll design a plan around your
            goals.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <GoldButton href={WA_URL} target="_blank" rel="noreferrer">
              <MessageCircle className="h-4 w-4" /> Chat on WhatsApp
            </GoldButton>
            <GoldButton href="tel:+919743231514" variant="outline">
              <Phone className="h-4 w-4" /> +91 97432 31514
            </GoldButton>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="relative border-t border-gold/10 px-4 py-14 sm:px-6 lg:px-8">
      <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-4">
        <div>
          <a href="#home" className="flex items-center gap-2.5">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-gold-gradient text-black">
              <Dumbbell className="h-5 w-5" strokeWidth={2.5} />
            </span>
            <span className="flex flex-col leading-none">
              <span className="text-base font-black uppercase tracking-widest text-gold-gradient">
                Sahara
              </span>
              <span className="text-[10px] uppercase tracking-[0.3em] text-muted-foreground">
                Multi Fitness
              </span>
            </span>
          </a>
          <p className="mt-4 text-sm text-muted-foreground">
            Train Like a Champion. Gangavathi's premier fitness destination.
          </p>
          <div className="mt-5 flex gap-2">
            <a
              href={IG_GYM}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-all hover:bg-gold hover:text-black"
              aria-label="Gym Instagram"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={IG_COACH}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-all hover:bg-gold hover:text-black"
              aria-label="Coach Instagram"
            >
              <Instagram className="h-4.5 w-4.5" />
            </a>
            <a
              href={WA_URL}
              target="_blank"
              rel="noreferrer"
              className="grid h-10 w-10 place-items-center rounded-full border border-gold/25 text-gold transition-all hover:bg-gold hover:text-black"
              aria-label="WhatsApp"
            >
              <MessageCircle className="h-4.5 w-4.5" />
            </a>
          </div>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">
            Quick Links
          </h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            {NAV.map((n) => (
              <li key={n.href}>
                <a href={n.href} className="hover:text-gold">
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">Programs</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>Gym & Strength</li>
            <li>Personal Training</li>
            <li>Fat Loss / Weight Gain</li>
            <li>Body Transformation</li>
            <li>CrossFit</li>
            <li>Diet Plans · Cardio</li>
          </ul>
        </div>

        <div>
          <h4 className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-gold">Contact</h4>
          <address className="not-italic space-y-2 text-sm text-muted-foreground">
            <p>
              1st Floor, Malleshwara Complex (Samartha Comforts), Opposite Musti Petrol Pump, Above
              Federal Bank, Koppal Road, Prashant Nagar, Gangavathi, Karnataka – 583227.
            </p>
            <p>
              <a href="tel:+919743231514" className="hover:text-gold">
                +91 97432 31514
              </a>{" "}
              ·{" "}
              <a href="tel:+917019767877" className="hover:text-gold">
                +91 70197 67877
              </a>
            </p>
          </address>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-gold/10 pt-6 text-center text-xs text-muted-foreground">
        © 2026 Sahara Multi Fitness. All rights reserved.
      </div>
    </footer>
  );
}

function FloatingWA() {
  return (
    <a
      href={WA_URL}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp Chat"
      className="fixed bottom-5 right-5 z-40 grid h-14 w-14 place-items-center rounded-full bg-[#25D366] text-white shadow-[0_10px_40px_-10px_rgba(37,211,102,0.8)] transition-transform hover:scale-110 animate-pulse-gold sm:h-16 sm:w-16"
    >
      <MessageCircle className="h-7 w-7" />
    </a>
  );
}

/* ---------- page ---------- */

function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-background">
      <Navbar />
      <main>
        <Hero />
        <QuickInfo />
        <About />
        <Programs />
        <Membership />
        <Achievements />
        <Certifications />
        <Gallery />
        <Social />
        <Contact />
      </main>
      <Footer />
      <FloatingWA />
    </div>
  );
}
