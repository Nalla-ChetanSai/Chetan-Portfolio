import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import emailjs from "@emailjs/browser";
import { z } from "zod";
import { toast } from "sonner";
import {
  Github,
  Linkedin,
  Instagram,
  Mail,
  Phone,
  Download,
  ArrowUpRight,
  ArrowRight,
  Code2,
  Layers,
  Database,
  Cpu,
  Sparkles,
  ExternalLink,
  Copy,
  Check,
  GraduationCap,
  Zap,
  Rocket,
  Activity,
  ChevronUp,
  Menu,
  X,
} from "lucide-react";
import profileImg from "@/assets/profile.jpg";

/* ---------- Fonts ---------- */
function Fonts() {
  useEffect(() => {
    const id = "google-fonts-portfolio";
    if (document.getElementById(id)) return;
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href =
      "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@300;400;500;600&family=JetBrains+Mono:wght@400;500&display=swap";
    document.head.appendChild(link);
  }, []);
  return null;
}

/* ---------- Cursor glow ---------- */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!ref.current) return;
      ref.current.style.transform = `translate(${e.clientX - 200}px, ${e.clientY - 200}px)`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);
  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-0 h-[400px] w-[400px] rounded-full opacity-40 blur-3xl transition-transform duration-300 ease-out"
      style={{
        background:
          "radial-gradient(circle, oklch(0.74 0.22 40 / 0.4), transparent 70%)",
      }}
    />
  );
}

/* ---------- Particles ---------- */
function Particles() {
  const dots = Array.from({ length: 30 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {dots.map((_, i) => (
        <motion.span
          key={i}
          className="absolute h-1 w-1 rounded-full bg-[var(--neon-orange)]"
          style={{
            left: `${(i * 37) % 100}%`,
            top: `${(i * 53) % 100}%`,
            opacity: 0.4,
          }}
          animate={{ y: [0, -30, 0], opacity: [0.2, 0.8, 0.2] }}
          transition={{ duration: 4 + (i % 5), repeat: Infinity, delay: i * 0.2 }}
        />
      ))}
    </div>
  );
}

/* ---------- Nav ---------- */
const NAV = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Services", href: "#services" },
  { label: "Projects", href: "#projects" },
  { label: "GitHub", href: "#github" },
  { label: "Contact", href: "#contact" },
];

function Nav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <header
      className={`fixed left-0 right-0 top-0 z-50 transition-all duration-500 ${
        scrolled ? "py-3" : "py-6"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#top" className="flex items-center gap-2 font-mono text-sm">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-primary text-primary-foreground font-bold">
            N
          </span>
          <span className="hidden text-foreground sm:inline">chetansai<span className="text-primary">.dev</span></span>
        </a>
        <nav
          className={`hidden items-center gap-1 rounded-full glass-strong px-2 py-2 text-sm md:flex`}
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              className="rounded-full px-4 py-1.5 text-muted-foreground transition hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </nav>
        <div className="hidden md:block">
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition hover:scale-105"
          >
            Let's talk <ArrowUpRight className="h-4 w-4" />
          </a>
        </div>
        <button
          className="grid h-10 w-10 place-items-center rounded-full glass md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>
      {open && (
        <motion.div
          initial={false}
          animate={{ opacity: 1, y: 0 }}
          className="mx-6 mt-3 rounded-2xl glass-strong p-4 md:hidden"
        >
          {NAV.map((n) => (
            <a
              key={n.href}
              href={n.href}
              onClick={() => setOpen(false)}
              className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-white/5 hover:text-foreground"
            >
              {n.label}
            </a>
          ))}
        </motion.div>
      )}
    </header>
  );
}

/* ---------- Typing ---------- */
const ROLES = [
  "Frontend Developer",
  "React Developer",
  "Java Backend Developer",
  "Problem Solver",
  "Future Software Engineer",
];
function Typewriter() {
  const [i, setI] = useState(0);
  const [text, setText] = useState("");
  const [del, setDel] = useState(false);
  useEffect(() => {
    const word = ROLES[i];
    const t = setTimeout(
      () => {
        if (!del) {
          if (text.length < word.length) setText(word.slice(0, text.length + 1));
          else setTimeout(() => setDel(true), 1400);
        } else {
          if (text.length > 0) setText(word.slice(0, text.length - 1));
          else {
            setDel(false);
            setI((i + 1) % ROLES.length);
          }
        }
      },
      del ? 40 : 90,
    );
    return () => clearTimeout(t);
  }, [text, del, i]);
  return (
    <span className="font-mono text-primary">
      {text}
      <span className="caret">_</span>
    </span>
  );
}

/* ---------- Hero ---------- */
function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const onMove = (e: React.MouseEvent) => {
    const r = e.currentTarget.getBoundingClientRect();
    setMouse({ x: (e.clientX - r.left - r.width / 2) / 40, y: (e.clientY - r.top - r.height / 2) / 40 });
  };

  return (
    <section
      id="top"
      ref={ref}
      onMouseMove={onMove}
      className="relative grid-bg noise overflow-hidden pt-32 pb-24"
      style={{ background: "var(--gradient-hero)" }}
    >
      <Particles />
      <motion.div style={{ y }} className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_auto]">
          {/* Left */}
          <div>
            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-mono text-muted-foreground"
            >
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
              </span>
              Available for opportunities · 2028 Grad
            </motion.div>

            <motion.h1
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.1 }}
              className="text-5xl font-bold leading-[0.95] tracking-tighter sm:text-7xl lg:text-8xl"
            >
              NALLA <br />
              <span className="text-gradient">CHETAN SAI</span>
            </motion.h1>

            <motion.p
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-6 text-xl text-muted-foreground sm:text-2xl"
            >
              Full Stack Web Developer
            </motion.p>

            <motion.div
              initial={false}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-2 text-lg sm:text-xl"
            >
              <span className="text-muted-foreground">&gt; </span>
              <Typewriter />
            </motion.div>

            <motion.div
              initial={false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:scale-105 glow-orange"
              >
                View Projects <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 font-medium hover:border-primary/50"
              >
                Contact Me
              </a>
              <a
                href="/resume.pdf"
                download="Resume.pdf"
                className="inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 font-medium text-muted-foreground hover:text-foreground"
              >
                <Download className="h-4 w-4" /> Resume
              </a>
            </motion.div>
          </div>

          {/* Right - profile card */}
          <motion.div
            initial={false}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            style={{
              transform: `perspective(1000px) rotateY(${mouse.x}deg) rotateX(${-mouse.y}deg)`,
            }}
            className="relative mx-auto"
          >
            {/* Outer glow */}
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-white/30 via-white/10 to-white/20 blur-3xl" />

            {/* Frame */}
            <div className="relative w-72 overflow-hidden rounded-[1.75rem] glass-strong p-2 sm:w-[22rem]">
              {/* Corner brackets */}
              <span className="pointer-events-none absolute left-3 top-3 h-4 w-4 border-l border-t border-white/60" />
              <span className="pointer-events-none absolute right-3 top-3 h-4 w-4 border-r border-t border-white/60" />
              <span className="pointer-events-none absolute bottom-3 left-3 h-4 w-4 border-b border-l border-white/60" />
              <span className="pointer-events-none absolute bottom-3 right-3 h-4 w-4 border-b border-r border-white/60" />

              <div className="relative overflow-hidden rounded-[1.25rem]">
                <img
                  src={profileImg}
                  alt="Nalla Chetan Sai"
                  width={1200}
                  height={1200}
                  className="aspect-[4/5] w-full object-cover object-top grayscale contrast-110 brightness-95 transition duration-700 hover:grayscale-0"
                />
                {/* Vignette + grain overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black via-black/10 to-transparent" />
                <div className="pointer-events-none absolute inset-0 mix-blend-overlay opacity-30 [background-image:radial-gradient(circle_at_50%_50%,transparent_50%,black_100%)]" />

                {/* Scan line */}
                <motion.div
                  aria-hidden
                  initial={{ y: "-100%" }}
                  animate={{ y: "200%" }}
                  transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                  className="pointer-events-none absolute inset-x-0 h-[2px] bg-gradient-to-r from-transparent via-white/60 to-transparent"
                />

                {/* ID badge */}
                <div className="absolute left-4 top-4 rounded-full border border-white/30 bg-black/40 px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-white/80 backdrop-blur-md">
                  ID · 2028
                </div>

                {/* Bottom info bar */}
                <div className="absolute bottom-0 left-0 right-0 flex items-end justify-between p-4 text-xs font-mono text-white/90">
                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Developer</div>
                    <div className="text-sm font-semibold">Chetan Sai</div>
                  </div>
                  <div className="text-right">
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/50">Location</div>
                    <div className="text-sm">India · IN</div>
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-center justify-between px-3 pb-1 text-[11px] font-mono">
                <span className="text-muted-foreground">@chetansai</span>
                <span className="flex items-center gap-1.5 text-foreground">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-60" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-white" />
                  </span>
                  ONLINE
                </span>
              </div>
            </div>

            {/* Floating chips */}
            <FloatingChip label="React" className="-left-12 top-10" delay={0} />
            <FloatingChip label="Java" className="-right-10 top-32" delay={0.5} />
            <FloatingChip label="Spring Boot" className="-left-16 bottom-32" delay={1} />
            <FloatingChip label="Python" className="-right-8 bottom-12" delay={1.5} />
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}

function FloatingChip({ label, className, delay }: { label: string; className: string; delay: number }) {
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 1 + delay, type: "spring" }}
      className={`absolute hidden md:block ${className}`}
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay }}
        className="rounded-full glass-strong px-4 py-2 text-xs font-mono text-foreground"
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

/* ---------- Section header ---------- */
function SectionLabel({ num, title, kicker }: { num: string; title: string; kicker: string }) {
  return (
    <div className="mb-12">
      <div className="mb-3 flex items-center gap-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
        <span className="text-primary">{num}</span>
        <span className="h-px w-12 bg-border" />
        {kicker}
      </div>
      <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">{title}</h2>
    </div>
  );
}

/* ---------- About ---------- */
function Counter({ to, label }: { to: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    let r = 0;
    const step = Math.max(1, Math.ceil(to / 40));
    const id = setInterval(() => {
      r += step;
      if (r >= to) {
        setN(to);
        clearInterval(id);
      } else setN(r);
    }, 30);
    return () => clearInterval(id);
  }, [inView, to]);
  return (
    <div ref={ref} className="rounded-2xl glass p-6">
      <div className="text-4xl font-bold text-gradient">{n}+</div>
      <div className="mt-2 text-sm text-muted-foreground">{label}</div>
    </div>
  );
}

function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel num="01" kicker="About" title="A developer who builds for the long run." />
      <div className="grid gap-8 lg:grid-cols-5">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-3 rounded-3xl glass-strong p-8 sm:p-10"
        >
          <p className="text-lg leading-relaxed text-foreground/90 sm:text-xl">
            <span className="text-primary font-medium">NALLA CHETAN SAI</span> is a Computer Science
            Engineering student passionate about Full Stack Web Development and modern digital
            experiences. Currently pursuing <span className="text-foreground">B.Tech (3rd Year)</span>,
            he focuses on building scalable web applications using modern frontend and backend
            technologies while continuously sharpening his DSA and software engineering fundamentals.
          </p>

          <div className="mt-8 rounded-2xl border border-border/60 bg-background/30 p-6">
            <div className="mb-3 flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
              <GraduationCap className="h-4 w-4 text-primary" /> Education
            </div>
            <div className="text-lg font-semibold">B.Tech in Computer Science & Engineering</div>
            <div className="mt-1 text-muted-foreground">
              Koneru Lakshmaiah Educational Foundation
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm">
              <span className="rounded-full bg-primary/10 px-3 py-1 text-primary font-mono">2024 — 2028</span>
              <span className="rounded-full glass px-3 py-1 font-mono">3rd Year</span>
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.15 }}
          className="grid grid-cols-2 gap-4 lg:col-span-2"
        >
          <Counter to={3} label="Projects Completed" />
          <Counter to={12} label="Technologies Learned" />
          <Counter to={150} label="GitHub Contributions" />
          <Counter to={75} label="Learning Progress %" />
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Skills ---------- */
const SKILL_GROUPS = [
  {
    title: "Programming",
    icon: Code2,
    color: "var(--neon-orange)",
    skills: [
      { name: "C", level: 80 },
      { name: "Python", level: 85 },
      { name: "DSA in Python", level: 75 },
    ],
  },
  {
    title: "Frontend",
    icon: Layers,
    color: "var(--neon-blue)",
    skills: [
      { name: "HTML", level: 95 },
      { name: "CSS", level: 90 },
      { name: "JavaScript", level: 85 },
      { name: "React", level: 88 },
    ],
  },
  {
    title: "Backend",
    icon: Cpu,
    color: "var(--neon-purple)",
    skills: [
      { name: "Java", level: 80 },
      { name: "Spring Boot", level: 75 },
    ],
  },
  {
    title: "Database & Tools",
    icon: Database,
    color: "var(--neon-orange)",
    skills: [
      { name: "MySQL", level: 80 },
      { name: "GitHub", level: 90 },
      { name: "Vercel", level: 85 },
      { name: "Railway", level: 75 },
    ],
  },
];

const TECH_MARQUEE = [
  "React", "JavaScript", "TypeScript", "Java", "Spring Boot", "Python",
  "MySQL", "HTML5", "CSS3", "Node.js", "GitHub", "Vercel", "Railway", "C",
];

function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel num="02" kicker="Capabilities" title="Skills & toolset." />
      <div className="grid gap-5 md:grid-cols-2">
        {SKILL_GROUPS.map((g, idx) => (
          <motion.div
            key={g.title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.08 }}
            whileHover={{ y: -4 }}
            className="group relative overflow-hidden rounded-3xl glass-strong p-7"
          >
            <div
              className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full opacity-30 blur-3xl transition group-hover:opacity-60"
              style={{ background: g.color }}
            />
            <div className="mb-6 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-xl glass">
                <g.icon className="h-5 w-5" style={{ color: g.color }} />
              </div>
              <h3 className="text-xl font-semibold">{g.title}</h3>
            </div>
            <div className="space-y-4">
              {g.skills.map((s) => (
                <div key={s.name}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <span className="font-mono">{s.name}</span>
                    <span className="font-mono text-muted-foreground">{s.level}%</span>
                  </div>
                  <div className="h-1.5 overflow-hidden rounded-full bg-white/5">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${s.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, ease: "easeOut" }}
                      className="h-full rounded-full"
                      style={{
                        background: `linear-gradient(90deg, ${g.color}, oklch(0.95 0.05 60))`,
                        boxShadow: `0 0 12px ${g.color}`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Marquee */}
      <div className="relative mt-16 overflow-hidden rounded-2xl glass py-6">
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-background to-transparent" />
        <div className="marquee flex gap-12 whitespace-nowrap font-mono text-2xl text-muted-foreground">
          {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
            <span key={i} className="flex items-center gap-12">
              {t}
              <span className="text-primary">◆</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Services ---------- */
const SERVICES = [
  {
    title: "Full Stack Web Development",
    desc: "End-to-end web apps with React on the frontend and Java/Spring Boot APIs powering data, auth, and business logic.",
    icon: Layers,
    color: "var(--neon-orange)",
  },
  {
    title: "Frontend Development",
    desc: "Pixel-precise, responsive interfaces built with React, modern CSS, and considered motion that feels effortless.",
    icon: Sparkles,
    color: "var(--neon-blue)",
  },
];

function Services() {
  return (
    <section id="services" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel num="03" kicker="Services" title="What I build." />
      <div className="grid gap-6 md:grid-cols-2">
        {SERVICES.map((s, i) => (
          <motion.div
            key={s.title}
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1 }}
            whileHover={{ y: -6 }}
            className="group relative overflow-hidden rounded-3xl p-[1px]"
            style={{
              background: `linear-gradient(135deg, ${s.color}, transparent 60%)`,
            }}
          >
            <div className="relative h-full rounded-3xl glass-strong p-8">
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 4, repeat: Infinity }}
                className="grid h-14 w-14 place-items-center rounded-2xl glass"
              >
                <s.icon className="h-6 w-6" style={{ color: s.color }} />
              </motion.div>
              <h3 className="mt-6 text-2xl font-semibold">{s.title}</h3>
              <p className="mt-3 text-muted-foreground">{s.desc}</p>
              <div className="mt-6 inline-flex items-center gap-2 text-sm font-mono text-foreground/70 transition group-hover:text-primary">
                Discuss a project <ArrowUpRight className="h-4 w-4" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

/* ---------- Projects ---------- */
const PROJECTS = [
  {
    name: "Constitution Awareness Platform",
    blurb:
      "A web platform promoting awareness of the Indian Constitution — helping citizens understand their rights, duties, and the framework that guides the nation.",
    tech: ["React", "HTML", "CSS"],
    roles: ["Admin", "Educator", "Citizen", "Legal Expert"],
    accent: "var(--neon-orange)",
    span: "lg:col-span-2 lg:row-span-2",
    status: "Shipped",
  },
  {
    name: "Student Feedback Management System",
    blurb:
      "Web app to collect and analyze student feedback on courses, instructors, and services with admin dashboards and live analytics.",
    tech: ["Spring Boot", "MySQL", "HTML", "CSS", "Railway"],
    accent: "var(--neon-blue)",
    span: "lg:col-span-2",
    status: "Shipped",
  },
  {
    name: "Personal Health Monitoring Dashboard",
    blurb:
      "An advanced health-focused dashboard tracking metrics, trends, and goals — currently in active development.",
    tech: ["React", "Spring Boot", "MySQL"],
    accent: "var(--neon-purple)",
    span: "lg:col-span-2",
    status: "Building",
  },
];

function ProjectCard({ p }: { p: (typeof PROJECTS)[number] }) {
  const isBuilding = p.status === "Building";
  return (
    <motion.article
      initial={false}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      whileHover={{ y: -6 }}
      className={`group relative flex flex-col overflow-hidden rounded-3xl glass-strong p-7 ${p.span}`}
    >
      <div
        className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full opacity-25 blur-3xl transition group-hover:opacity-60"
        style={{ background: p.accent }}
      />
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2 font-mono text-xs">
          {isBuilding ? (
            <span className="inline-flex items-center gap-1.5 rounded-full bg-[var(--neon-purple)]/15 px-3 py-1 text-[var(--neon-purple)]">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[var(--neon-purple)] opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[var(--neon-purple)]" />
              </span>
              Currently Building
            </span>
          ) : (
            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">{p.status}</span>
          )}
        </div>
        <ArrowUpRight className="h-5 w-5 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
      </div>

      <h3 className="mt-6 text-2xl font-semibold leading-tight sm:text-3xl">{p.name}</h3>
      <p className="mt-3 text-muted-foreground">{p.blurb}</p>

      {p.roles && (
        <div className="mt-5">
          <div className="mb-2 text-xs font-mono uppercase tracking-widest text-muted-foreground">
            User Roles
          </div>
          <div className="flex flex-wrap gap-2">
            {p.roles.map((r) => (
              <span key={r} className="rounded-md border border-border/70 px-2 py-1 text-xs font-mono">
                {r}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-6 flex flex-wrap gap-2">
        {p.tech.map((t) => (
          <span
            key={t}
            className="rounded-full glass px-3 py-1 text-xs font-mono"
            style={{ borderColor: `${p.accent}40` }}
          >
            {t}
          </span>
        ))}
      </div>

      <div className="mt-auto pt-7 flex gap-2">
        <button className="inline-flex items-center gap-1.5 rounded-full bg-foreground/10 px-4 py-2 text-sm hover:bg-foreground/15">
          <ExternalLink className="h-3.5 w-3.5" /> Live Demo
        </button>
        <button className="inline-flex items-center gap-1.5 rounded-full glass px-4 py-2 text-sm hover:border-primary/50">
          <Github className="h-3.5 w-3.5" /> Code
        </button>
      </div>
    </motion.article>
  );
}

function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel num="04" kicker="Selected Work" title="Projects in motion." />
      <div className="grid gap-5 lg:grid-cols-4 lg:auto-rows-[1fr]">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.name} p={p} />
        ))}
      </div>
    </section>
  );
}

/* ---------- GitHub ---------- */
function GitHubSection() {
  // fake contribution graph
  const cells = Array.from({ length: 7 * 30 });
  return (
    <section id="github" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel num="05" kicker="Open Source" title="Code in the open." />
      <div className="grid gap-5 lg:grid-cols-3">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 overflow-hidden rounded-3xl glass-strong p-7"
        >
          <div className="mb-5 flex items-center justify-between">
            <div className="flex items-center gap-2 font-mono text-sm">
              <Github className="h-4 w-4" />
              <span className="text-muted-foreground">@</span>Nalla-ChetanSai
            </div>
            <span className="font-mono text-xs text-muted-foreground">Last 30 weeks</span>
          </div>
          <div className="grid grid-flow-col grid-rows-7 gap-1">
            {cells.map((_, i) => {
              const seed = (Math.sin(i * 12.9898) * 43758.5453) % 1;
              const v = Math.abs(seed);
              const lvl = v > 0.85 ? 4 : v > 0.65 ? 3 : v > 0.4 ? 2 : v > 0.2 ? 1 : 0;
              const bg =
                lvl === 0
                  ? "oklch(0.22 0.02 260 / 0.6)"
                  : lvl === 1
                  ? "oklch(0.4 0.12 40 / 0.5)"
                  : lvl === 2
                  ? "oklch(0.55 0.18 40 / 0.7)"
                  : lvl === 3
                  ? "oklch(0.68 0.22 40 / 0.85)"
                  : "oklch(0.78 0.22 40)";
              return (
                <motion.div
                  key={i}
                  initial={false}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.002 }}
                  className="aspect-square rounded-[3px]"
                  style={{ background: bg }}
                />
              );
            })}
          </div>
          <div className="mt-4 flex items-center justify-end gap-2 text-xs text-muted-foreground">
            Less
            {[0, 1, 2, 3, 4].map((l) => (
              <span
                key={l}
                className="h-3 w-3 rounded-[3px]"
                style={{
                  background:
                    l === 0
                      ? "oklch(0.22 0.02 260 / 0.6)"
                      : l === 1
                      ? "oklch(0.4 0.12 40 / 0.5)"
                      : l === 2
                      ? "oklch(0.55 0.18 40 / 0.7)"
                      : l === 3
                      ? "oklch(0.68 0.22 40 / 0.85)"
                      : "oklch(0.78 0.22 40)",
                }}
              />
            ))}
            More
          </div>
        </motion.div>

        <div className="grid gap-5">
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="rounded-3xl glass-strong p-6">
            <div className="flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Zap className="h-4 w-4 text-primary" /> Streak
            </div>
            <div className="mt-3 text-4xl font-bold text-gradient">17 days</div>
            <div className="mt-1 text-sm text-muted-foreground">Current contribution streak</div>
          </motion.div>
          <motion.div initial={false} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }} className="rounded-3xl glass-strong p-6">
            <div className="mb-3 flex items-center gap-2 text-sm font-mono text-muted-foreground">
              <Activity className="h-4 w-4 text-[var(--neon-blue)]" /> Most Used Languages
            </div>
            {[
              { l: "Java", v: 38, c: "var(--neon-orange)" },
              { l: "JavaScript", v: 30, c: "var(--neon-blue)" },
              { l: "Python", v: 18, c: "var(--neon-purple)" },
              { l: "CSS", v: 14, c: "oklch(0.85 0.15 180)" },
            ].map((x) => (
              <div key={x.l} className="mb-2">
                <div className="mb-1 flex justify-between text-xs font-mono">
                  <span>{x.l}</span>
                  <span className="text-muted-foreground">{x.v}%</span>
                </div>
                <div className="h-1.5 rounded-full bg-white/5">
                  <div className="h-full rounded-full" style={{ width: `${x.v}%`, background: x.c }} />
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* recent repos */}
      <div className="mt-5 grid gap-4 md:grid-cols-3">
        {[
          { n: "constitution-awareness", d: "React platform for civic awareness." },
          { n: "feedback-management", d: "Spring Boot + MySQL feedback app." },
          { n: "health-dashboard", d: "Personal health monitoring (WIP)." },
        ].map((r) => (
          <a key={r.n} href="#" className="group rounded-2xl glass p-5 transition hover:border-primary/40">
            <div className="flex items-center justify-between">
              <span className="font-mono text-sm">{r.n}</span>
              <ArrowUpRight className="h-4 w-4 text-muted-foreground transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{r.d}</p>
          </a>
        ))}
      </div>
    </section>
  );
}

/* ---------- Contact ---------- */
function CopyChip({ value, children }: { value: string; children: React.ReactNode }) {
  const [done, setDone] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(value);
    setDone(true);
    setTimeout(() => setDone(false), 1500);
  };
  return (
    <button
      onClick={copy}
      className="group flex w-full items-center justify-between rounded-2xl glass p-4 text-left transition hover:border-primary/40"
    >
      <div className="flex items-center gap-3">{children}</div>
      <span className="text-muted-foreground transition group-hover:text-primary">
        {done ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
      </span>
    </button>
  );
}

const EMAILJS_SERVICE_ID = "service_qp5q6xc";
const EMAILJS_TEMPLATE_ID = "template_o04hyzr";
const EMAILJS_PUBLIC_KEY = "ddoxMcG873hkXt5H2";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be under 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be under 255 characters"),
  message: z.string().trim().min(1, "Message is required").max(2000, "Message must be under 2000 characters"),
});

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = contactSchema.safeParse(form);
    if (!parsed.success) {
      toast.error(parsed.error.issues[0]?.message ?? "Invalid form data");
      return;
    }
    setSending(true);
    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: parsed.data.name,
          from_email: parsed.data.email,
          reply_to: parsed.data.email,
          message: parsed.data.message,
        },
        { publicKey: EMAILJS_PUBLIC_KEY }
      );
      setSent(true);
      toast.success("Message sent! I'll reply soon.");
      setForm({ name: "", email: "", message: "" });
      setTimeout(() => setSent(false), 3000);
    } catch (err) {
      toast.error("Failed to send. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  return (
    <section id="contact" className="relative mx-auto max-w-7xl px-6 py-32">
      <SectionLabel num="06" kicker="Contact" title="Let's build something." />
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Form */}
        <motion.form
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          onSubmit={handleSubmit}
          className="lg:col-span-3 rounded-3xl glass-strong p-8"
        >
          <div className="space-y-5">
            {[
              { k: "name", label: "Your name", type: "text" },
              { k: "email", label: "Email address", type: "email" },
            ].map((f) => (
              <div key={f.k} className="group">
                <label className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                  {f.label}
                </label>
                <input
                  type={f.type}
                  required
                  value={(form as any)[f.k]}
                  onChange={(e) => setForm({ ...form, [f.k]: e.target.value })}
                  className="w-full rounded-xl border border-border bg-background/40 px-4 py-3 text-foreground outline-none transition focus:border-primary/60 focus:bg-background/60 focus:shadow-[0_0_0_4px_oklch(0.74_0.22_40/0.12)]"
                />
              </div>
            ))}
            <div>
              <label className="mb-2 block text-xs font-mono uppercase tracking-widest text-muted-foreground">
                Message
              </label>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full resize-none rounded-xl border border-border bg-background/40 px-4 py-3 text-foreground outline-none transition focus:border-primary/60 focus:bg-background/60 focus:shadow-[0_0_0_4px_oklch(0.74_0.22_40/0.12)]"
              />
            </div>
            <button
              type="submit"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:scale-105 glow-orange"
            >
              {sent ? (
                <>
                  Sent <Check className="h-4 w-4" />
                </>
              ) : (
                <>
                  Send Message <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </>
              )}
            </button>
          </div>
        </motion.form>

        {/* Details */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="lg:col-span-2 space-y-3"
        >
          <CopyChip value="nallachetansai@gmail.com">
            <Mail className="h-5 w-5 text-primary" />
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Email</div>
              <div className="text-sm">nallachetansai@gmail.com</div>
            </div>
          </CopyChip>
          <CopyChip value="8121452829">
            <Phone className="h-5 w-5 text-[var(--neon-blue)]" />
            <div>
              <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">Phone</div>
              <div className="text-sm">+91 8121 452 829</div>
            </div>
          </CopyChip>

          <div className="rounded-3xl glass-strong p-5">
            <div className="mb-3 text-xs font-mono uppercase tracking-widest text-muted-foreground">Find me online</div>
            <div className="grid grid-cols-3 gap-2">
              {[
                { Icon: Github, href: "https://github.com/Nalla-ChetanSai", label: "GitHub" },
                { Icon: Linkedin, href: "https://linkedin.com/in/nalla-chetan-sai-0812n", label: "LinkedIn" },
                { Icon: Instagram, href: "https://instagram.com/chetansai_nalla", label: "Instagram" },
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group grid place-items-center gap-1 rounded-2xl glass p-4 text-center transition hover:border-primary/40 hover:text-primary"
                >
                  <Icon className="h-5 w-5" />
                  <span className="text-xs font-mono">{label}</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */
function Footer() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <footer className="relative border-t border-border/60 py-12">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <p className="max-w-xl text-balance text-lg text-muted-foreground">
            "Building modern digital experiences with{" "}
            <span className="text-primary">creativity</span> and{" "}
            <span className="text-gradient-cool">code</span>."
          </p>
          <div className="flex items-center gap-3">
            {[
              { Icon: Github, href: "https://github.com/Nalla-ChetanSai" },
              { Icon: Linkedin, href: "https://linkedin.com/in/nalla-chetan-sai-0812n" },
              { Icon: Instagram, href: "https://instagram.com/chetansai_nalla" },
              { Icon: Mail, href: "mailto:nallachetansai@gmail.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="grid h-10 w-10 place-items-center rounded-full glass transition hover:scale-110 hover:border-primary/50 hover:text-primary"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div className="font-mono text-xs text-muted-foreground">
            © {new Date().getFullYear()} Nalla Chetan Sai · Crafted with <Rocket className="inline h-3 w-3 text-primary" />
          </div>
        </div>
      </div>
      {show && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="fixed bottom-6 right-6 z-40 grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground shadow-lg glow-orange transition hover:scale-110"
          aria-label="back to top"
        >
          <ChevronUp className="h-5 w-5" />
        </button>
      )}
    </footer>
  );
}

/* ---------- Page ---------- */
export default function Portfolio() {
  return (
    <div className="relative min-h-screen overflow-x-hidden text-foreground">
      <Fonts />
      <CursorGlow />
      <Nav />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Services />
        <Projects />
        <GitHubSection />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
