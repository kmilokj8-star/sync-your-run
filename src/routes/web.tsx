import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity, ArrowRight, Check, ChevronDown, CircleCheck, Download, Dumbbell,
  Footprints, Map, Menu, ShieldCheck, Smartphone, Trophy, Users, Watch, X,
  Route as RouteIcon, Zap, Bike, Radio, Target
} from "lucide-react";
import logo from "@/assets/logo-mark.png.asset.json";

export const Route = createFileRoute("/web")({
  head: () => ({
    meta: [
      { title: "RUN — Entrena. Progresa. Conecta." },
      { name: "description", content: "RUN es una plataforma para corredores: registra actividades, conecta dispositivos, organiza entrenamientos, alcanza objetivos y conecta con entrenadores." },
      { property: "og:title", content: "RUN — Entrena. Progresa. Conecta." },
      { property: "og:description", content: "Todo lo que necesitas para llevar tu running al siguiente nivel." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PublicWebsite,
});

const features = [
  [Activity, "Registra tus actividades", "Guarda tus carreras y consulta distancia, tiempo, ritmo y otros datos de cada sesión."],
  [Dumbbell, "Entrenamiento", "Organiza tus sesiones y trabaja con planes para diferentes objetivos y distancias."],
  [Map, "Rutas y recorridos", "Registra tus recorridos y conserva tu historial de entrenamiento."],
  [Watch, "Conecta tus dispositivos", "RUN ya contempla conexiones con Garmin, Strava, Apple Health y Coros."],
  [Trophy, "Retos y puntos", "Convierte la constancia en motivación con retos, logros y puntos."],
  [Users, "Entrenadores", "Conecta con profesionales y lleva tu entrenamiento acompañado."],
];

const faqs = [
  ["¿Qué es RUN?", "RUN es una plataforma deportiva pensada para corredores que quieren registrar sus actividades, organizar su entrenamiento, seguir su progreso y conectar con una comunidad y entrenadores."],
  ["¿Necesito experiencia para utilizar RUN?", "No. RUN está pensado tanto para quienes empiezan a correr como para corredores con experiencia."],
  ["¿Puedo utilizar RUN sin entrenador?", "Sí. Puedes utilizar las funciones de registro, actividades, rutas, retos y otras herramientas de RUN sin tener un entrenador."],
  ["¿Qué dispositivos puedo conectar?", "El proyecto actual contempla conexiones con Garmin Connect, Strava, Apple Health y Coros. La disponibilidad concreta puede depender del dispositivo y del flujo de conexión."],
  ["¿RUN tendrá ciclismo?", "Sí. El ciclismo forma parte de la evolución prevista de RUN y se presentará como una futura expansión de la plataforma."],
  ["¿Mis datos están protegidos?", "RUN incorpora controles de privacidad y gestión de preferencias dentro de la aplicación. Consulta las políticas oficiales antes de utilizar el servicio."],
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
}

function Reveal({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const { ref, visible } = useReveal<HTMLDivElement>();
  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out motion-reduce:transition-none ${visible ? "translate-y-0 opacity-100" : "translate-y-6 opacity-0"} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function RunnerIllustration() {
  return (
    <svg viewBox="0 0 520 460" className="h-full w-full" aria-label="Ilustración de corredor en movimiento" role="img">
      <defs>
        <linearGradient id="runGlow" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".05" />
          <stop offset=".7" stopColor="currentColor" stopOpacity=".22" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".02" />
        </linearGradient>
      </defs>
      <path d="M52 330 C145 270 184 382 278 314 S405 252 486 308" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 12" opacity=".22" />
      <path d="M40 368 C145 302 190 408 286 340 S410 278 495 335" fill="none" stroke="currentColor" strokeWidth="26" strokeLinecap="round" opacity=".07" />
      <circle cx="408" cy="91" r="58" fill="url(#runGlow)" />
      <circle cx="410" cy="91" r="32" fill="currentColor" opacity=".08" />
      <path d="M267 94c26 0 46 20 46 45s-20 45-46 45-46-20-46-45 20-45 46-45Z" fill="currentColor" opacity=".95" />
      <path d="M254 184c-6 26-20 54-44 76l-54 49 26 27 73-52 41-54 35 69 52 79 31-19-47-98-39-75c-11-20-30-31-54-32l-20-1Z" fill="currentColor" opacity=".88" />
      <path d="M214 226 157 207l-70 27-11-23 77-42c9-5 20-6 29-2l58 25-26 34Z" fill="currentColor" opacity=".72" />
      <path d="M167 281 108 331 57 338l-2 24 68 4 80-48-36-37Z" fill="currentColor" opacity=".88" />
      <path d="M320 301 382 336l58 3 2 24-78 4-70-34 26-32Z" fill="currentColor" opacity=".92" />
      <circle cx="90" cy="146" r="6" fill="currentColor" />
      <circle cx="117" cy="121" r="3.5" fill="currentColor" opacity=".6" />
      <circle cx="448" cy="190" r="5" fill="currentColor" opacity=".6" />
      <path d="M71 174h83M50 199h58M383 226h87" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".3" />
    </svg>
  );
}

function CommunityIllustration() {
  return (
    <svg viewBox="0 0 520 260" className="h-full w-full" aria-label="Ilustración de comunidad de corredores" role="img">
      <path d="M70 198 C155 90 224 226 298 135 S410 86 474 158" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="7 10" opacity=".28" />
      {[{x:86,y:156,r:23},{x:218,y:104,r:28},{x:333,y:157,r:24},{x:446,y:112,r:26}].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r={p.r + 10} fill="currentColor" opacity=".06" />
          <circle r={p.r} fill="currentColor" opacity=".13" />
          <circle cy="-5" r={p.r * .28} fill="currentColor" />
          <path d={`M-${p.r*.52} ${p.r*.62} Q0 ${p.r*.12} ${p.r*.52} ${p.r*.62}`} fill="currentColor" />
        </g>
      ))}
      <circle cx="154" cy="70" r="5" fill="currentColor" opacity=".55" />
      <circle cx="382" cy="68" r="4" fill="currentColor" opacity=".45" />
    </svg>
  );
}

function CyclingIllustration() {
  return (
    <svg viewBox="0 0 520 250" className="h-full w-full" aria-label="Ilustración de ciclismo" role="img">
      <path d="M45 194h430" stroke="currentColor" strokeWidth="3" opacity=".18" />
      <path d="M56 168 C150 102 224 194 316 124 S416 92 482 144" fill="none" stroke="currentColor" strokeWidth="4" strokeDasharray="9 12" opacity=".24" />
      <circle cx="171" cy="171" r="48" fill="none" stroke="currentColor" strokeWidth="7" opacity=".9" />
      <circle cx="364" cy="171" r="48" fill="none" stroke="currentColor" strokeWidth="7" opacity=".9" />
      <path d="M171 171 234 105 286 171 171 171 364 171 303 106 286 171" fill="none" stroke="currentColor" strokeWidth="7" strokeLinejoin="round" />
      <path d="M234 105 263 92h31M303 106l21-31h27" fill="none" stroke="currentColor" strokeWidth="7" strokeLinecap="round" />
      <circle cx="264" cy="171" r="12" fill="currentColor" opacity=".9" />
      <path d="M258 171 232 196M270 171l28 25" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

function FeatureIllustration({ index }: { index: number }) {
  const common = "size-10";
  const icons = [
    <Activity className={common} />,
    <Dumbbell className={common} />,
    <RouteIcon className={common} />,
    <Watch className={common} />,
    <Trophy className={common} />,
    <Users className={common} />,
  ];
  return (
    <div className="relative flex h-28 items-center justify-center overflow-hidden rounded-2xl bg-primary/5 text-primary">
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,currentColor_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-3">{icons[index]}</div>
      <span className="absolute right-5 top-4 size-2 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
      <span className="absolute bottom-4 left-6 h-px w-16 bg-primary/20" />
    </div>
  );
}

export function PublicWebsite() {
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);

  const nav = [
    ["Funciones", "#funciones"],
    ["Deportistas", "#deportistas"],
    ["Entrenadores", "#entrenadores"],
    ["Comunidad", "#comunidad"],
    ["Planes", "#planes"],
    ["Ayuda", "#faq"],
  ];

  return (
    <main className="min-h-screen overflow-x-hidden bg-background text-foreground">
      <style>{`
        html { scroll-behavior: smooth; }
        @keyframes runFloat { 0%,100% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(0,-9px,0) rotate(1deg); } }
        @keyframes runPulse { 0%,100% { opacity:.35; transform:scale(1); } 50% { opacity:.75; transform:scale(1.12); } }
        @keyframes runDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -70; } }
        .run-float { animation: runFloat 5s ease-in-out infinite; }
        .run-pulse { animation: runPulse 3.5s ease-in-out infinite; }
        .run-dash { animation: runDash 8s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .run-float, .run-pulse, .run-dash { animation: none !important; }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2.5" aria-label="RUN inicio">
            <span className="size-9 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} />
            <span className="font-display text-2xl uppercase tracking-tight">run</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, href]) => <a key={label} href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{label}</a>)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <button className="rounded-lg px-4 py-2.5 text-sm font-semibold text-muted-foreground hover:text-foreground">ES ▾</button>
            <Link to="/app" className="rounded-lg px-4 py-2.5 text-sm font-semibold">Iniciar sesión</Link>
            <a href="#descarga" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">Crear cuenta</a>
          </div>
          <button className="flex size-11 items-center justify-center rounded-lg border lg:hidden" onClick={() => setMenu(!menu)} aria-label="Abrir menú" aria-expanded={menu}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && <div className="border-t bg-background px-5 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)} className="rounded-lg px-3 py-3 font-semibold hover:bg-muted">{label}</a>)}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/app" className="rounded-lg border px-4 py-3 text-center font-semibold">Iniciar sesión</Link>
              <a href="#descarga" onClick={() => setMenu(false)} className="rounded-lg bg-primary px-4 py-3 text-center font-bold text-primary-foreground">Crear cuenta</a>
            </div>
          </nav>
        </div>}
      </header>

      <section id="inicio" className="relative isolate overflow-hidden">
        <div className="pointer-events-none absolute -left-32 top-16 size-72 rounded-full bg-primary/10 blur-3xl" />
        <div className="pointer-events-none absolute right-0 top-10 size-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:pb-28 lg:pt-24">
          <Reveal>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary shadow-sm">
              <CircleCheck className="size-4" /> Para corredores
            </div>
            <h1 className="max-w-3xl font-display text-5xl uppercase leading-[.95] tracking-tight sm:text-6xl lg:text-7xl">
              Tu entrenamiento.<br /><span className="text-primary">Tu progreso.</span><br />Tu camino.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              RUN reúne tus actividades, entrenamiento, objetivos, rutas, dispositivos y comunidad en una experiencia creada para corredores.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#descarga" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-xl">Crear cuenta gratis <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
              <a href="#funciones" className="rounded-xl border bg-card px-6 py-3.5 font-bold transition-all hover:-translate-y-0.5 hover:bg-muted">Conocer RUN</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Privacidad y control</span>
              <span className="flex items-center gap-2"><Smartphone className="size-4 text-primary" /> Web + móvil</span>
            </div>
          </Reveal>

          <Reveal delay={120} className="relative mx-auto w-full max-w-lg">
            <div className="run-pulse absolute -inset-10 rounded-full bg-primary/10 blur-3xl" />
            <div className="run-float relative">
              <div className="absolute -right-5 -top-8 z-10 rounded-2xl border bg-card/95 p-3 shadow-xl backdrop-blur">
                <div className="flex items-center gap-2 text-xs font-bold"><Target className="size-4 text-primary" /> Objetivo en progreso</div>
                <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-muted"><div className="h-full w-3/4 rounded-full bg-primary" /></div>
              </div>
              <div className="relative rounded-[2.2rem] border bg-card p-3 shadow-2xl shadow-foreground/10">
                <div className="overflow-hidden rounded-[1.7rem] border bg-background">
                  <div className="flex items-center justify-between border-b px-5 py-4">
                    <span className="font-display text-lg uppercase">run</span>
                    <span className="size-2.5 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
                  </div>
                  <div className="space-y-4 p-5">
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">Tu entrenamiento</p>
                    <div className="rounded-2xl border p-5">
                      <div className="flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-3"><Footprints className="text-primary" /></div><div><p className="font-bold">Carrera</p><p className="text-xs text-muted-foreground">Actividad registrada</p></div></div>
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <div><p className="text-[10px] uppercase text-muted-foreground">Distancia</p><p className="mt-1 font-display text-xl">8.4 km</p></div>
                        <div><p className="text-[10px] uppercase text-muted-foreground">Tiempo</p><p className="mt-1 font-display text-xl">42:18</p></div>
                        <div><p className="text-[10px] uppercase text-muted-foreground">Ritmo</p><p className="mt-1 font-display text-xl">5:02</p></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border p-4 transition-transform hover:-translate-y-1"><Map className="mb-4 size-5 text-primary" /><p className="font-bold">Rutas</p><p className="mt-1 text-xs text-muted-foreground">Tus recorridos</p></div>
                      <div className="rounded-2xl border p-4 transition-transform hover:-translate-y-1"><Trophy className="mb-4 size-5 text-primary" /><p className="font-bold">Retos</p><p className="mt-1 text-xs text-muted-foreground">Sigue avanzando</p></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
        <div className="pointer-events-none absolute bottom-0 left-1/2 hidden h-48 w-[900px] -translate-x-1/2 lg:block">
          <RunnerIllustration />
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {([["Entrena", "Organiza tu camino", Dumbbell], ["Registra", "Conserva cada sesión", Activity], ["Progresa", "Mide tu evolución", Zap], ["Conecta", "Corre acompañado", Users]] as const).map(([title, text, Icon]) => (
            <div key={title as string} className="group flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110"><Icon className="size-4" /></span>
              <div><p className="font-bold">{title as string}</p><p className="text-sm text-muted-foreground">{text as string}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="funciones" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">Todo en un solo lugar</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Herramientas para correr mejor</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">La plataforma crece contigo, desde tu primera carrera hasta tus próximos grandes objetivos.</p></div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, text], i) => (
            <Reveal key={title as string} delay={i * 60}>
              <article className="group h-full rounded-2xl border bg-card p-5 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <FeatureIllustration index={i} />
                <div className="mb-3 mt-6 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground group-hover:rotate-3"><Icon className="size-5" /></div>
                <h3 className="font-display text-xl uppercase">{title as string}</h3><p className="mt-3 leading-7 text-muted-foreground">{text as string}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="deportistas" className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Para deportistas</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Empieza donde estás. Avanza hacia donde quieres llegar.</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 opacity-70">RUN está pensado para acompañarte sin importar si estás empezando, entrenando por salud o preparando una nueva marca.</p>
            <a href="#descarga" className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-all hover:-translate-y-1">Empezar con RUN <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative mx-auto w-full max-w-xl text-primary">
              <div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-background/10 bg-background/5 p-4">
                <div className="h-72 sm:h-80"><RunnerIllustration /></div>
                <div className="grid grid-cols-2 gap-3">
                  {["Principiantes", "Corredores recreativos", "Corredores competitivos", "Preparación de carreras"].map((x) => <div key={x} className="rounded-xl border border-background/10 bg-background/5 p-4 text-sm font-semibold transition-transform hover:-translate-y-1"><Check className="mb-3 size-4 text-primary" />{x}</div>)}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="entrenadores" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Para entrenadores</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Entrena. Acompaña. Haz crecer a tus atletas.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">RUN también está pensado para profesionales que quieren centralizar su relación con sus deportistas.</p><a href="#descarga" className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-all hover:-translate-y-1">Soy entrenador <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
            <div className="mt-10 h-44 max-w-md text-primary opacity-80"><svg viewBox="0 0 520 220" className="h-full w-full"><path d="M30 184h460" stroke="currentColor" strokeWidth="2" opacity=".15" /><path d="M55 158 145 116l76 31 91-75 104 34" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="145" cy="116" r="7" fill="currentColor" /><circle cx="221" cy="147" r="7" fill="currentColor" /><circle cx="312" cy="72" r="7" fill="currentColor" /><circle cx="416" cy="106" r="7" fill="currentColor" /><path d="M55 158 145 116 221 147 312 72 416 106" fill="none" stroke="currentColor" strokeWidth="14" opacity=".07" /></svg></div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Planes y sesiones", "Seguimiento de atletas", "Comunicación", "Perfil profesional"].map((x, i) => (
              <Reveal key={x} delay={i * 70}>
                <div className="group h-full rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-7 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">{i === 0 ? <Dumbbell className="size-5" /> : i === 1 ? <Activity className="size-5" /> : i === 2 ? <Radio className="size-5" /> : <ShieldCheck className="size-5" />}</div>
                  <h3 className="font-display text-xl uppercase">{x}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{["Organiza el trabajo de tus atletas.", "Ten la información de entrenamiento centralizada.", "Mantén el contacto con tus deportistas.", "Presenta tu experiencia y especialidades."][i]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><ShieldCheck /></div><p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">Confianza</p><h2 className="mt-2 font-display text-4xl uppercase">Entrenadores verificados</h2><p className="mt-4 leading-7 text-muted-foreground">La insignia identifica los perfiles que han pasado por el proceso de revisión de RUN.</p></div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-md rounded-2xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4"><div className="flex size-14 items-center justify-center rounded-full bg-muted font-display text-lg">CR</div><div><p className="font-bold">Carlos Rodríguez</p><p className="flex items-center gap-1 text-xs font-semibold text-primary"><ShieldCheck className="size-3.5" /> Entrenador verificado</p></div></div>
              <div className="mt-6 flex flex-wrap gap-2">{["Running", "Maratón", "Trail"].map(x => <span key={x} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{x}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="comunidad" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 rounded-3xl border bg-card p-8 shadow-sm sm:p-12 lg:grid-cols-[1fr_.9fr] lg:p-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Comunidad</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Corre acompañado.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Participa en retos, consigue logros, acumula puntos y encuentra nuevas razones para mantenerte en movimiento.</p>
            <div className="mt-8 grid grid-cols-3 gap-3">{[["Retos", Trophy], ["Logros", Target], ["Puntos", Zap]].map(([x, Icon]) => <div key={x as string} className="rounded-2xl bg-muted/50 p-4 text-center"><Icon className="mx-auto mb-4 size-5 text-primary" /><p className="font-display text-lg uppercase">{x as string}</p></div>)}</div>
          </Reveal>
          <Reveal delay={120} className="text-primary">
            <div className="h-56 sm:h-64"><CommunityIllustration /></div>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 lg:grid-cols-[1fr_.8fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">Próximamente</p><h2 className="mt-2 font-display text-4xl uppercase">RUN también llegará al ciclismo.</h2><p className="mt-3 max-w-2xl opacity-80">Estamos preparando la próxima evolución de RUN para ampliar la experiencia deportiva.</p>
            <button className="mt-7 rounded-xl bg-foreground px-6 py-3.5 font-bold text-background transition-all hover:-translate-y-1">Avísame cuando esté disponible</button>
          </Reveal>
          <Reveal delay={100} className="text-primary-foreground">
            <div className="run-float h-48"><CyclingIllustration /></div>
          </Reveal>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-widest text-primary">Planes</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Empieza gratis. Crece cuando quieras.</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Una experiencia clara para comenzar, con opciones adicionales para quienes quieren profundizar en su entrenamiento.</p></div>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {[["Gratis", "RUN Free", ["Registro de actividades", "Estadísticas básicas", "Planes y objetivos", "Metas y logros", "Funciones de comunidad"], false], ["Premium", "RUN+", ["Todo lo incluido en Free", "Funciones avanzadas", "Planes personalizados", "Analíticas ampliadas", "Experiencia sin anuncios*"], true]].map(([eyebrow, title, items, featured], i) => (
            <Reveal key={title as string} delay={i * 100}>
              <div className={`relative h-full rounded-2xl border ${featured ? "border-2 border-primary shadow-xl shadow-primary/10" : "bg-card"} p-7 transition-transform hover:-translate-y-2`}>
                {featured && <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground">Recomendado</span>}
                <p className={`text-sm font-bold uppercase tracking-wider ${featured ? "text-primary" : "text-muted-foreground"}`}>{eyebrow as string}</p><h3 className="mt-3 font-display text-3xl uppercase">{title as string}</h3>
                <ul className="mt-7 space-y-3 text-sm">{(items as string[]).map(x => <li key={x} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{x}</li>)}</ul>
                <a href="#descarga" className={`mt-8 block rounded-xl px-5 py-3 text-center font-bold transition-all hover:-translate-y-0.5 ${featured ? "bg-primary text-primary-foreground" : "border"}`}>{featured ? "Conocer RUN+" : "Comenzar gratis"}</a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-muted-foreground">* Las funciones concretas y precios de suscripción quedan sujetos a la configuración comercial vigente.</p>
      </section>

      <section id="descarga" className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">Descarga RUN</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Lleva RUN contigo.</h2><p className="mt-5 max-w-xl text-lg leading-8 opacity-70">Empieza a registrar tus carreras y a construir tu camino desde donde estés.</p><div className="mt-8 flex flex-wrap gap-3"><button className="transition-all hover:-translate-y-1 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground"><Download className="mr-2 inline size-4" /> Google Play</button><button className="transition-all hover:-translate-y-1 rounded-xl border border-background/20 px-6 py-3.5 font-bold"><Download className="mr-2 inline size-4" /> App Store</button></div>
          </Reveal>
          <Reveal delay={100}>
            <div className="relative mx-auto flex size-44 items-center justify-center">
              <div className="run-pulse absolute inset-0 rounded-full border border-primary/30" />
              <div className="absolute -inset-4 rounded-full border border-background/10" />
              <div className="flex size-40 items-center justify-center rounded-2xl bg-background p-3 text-foreground shadow-2xl"><div className="grid size-full place-items-center rounded-xl border-2 border-dashed"><Smartphone className="size-12 text-primary" /><span className="mt-1 text-[9px] font-bold uppercase">QR</span></div></div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 lg:py-24">
        <Reveal>
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-widest text-primary">Ayuda</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Preguntas frecuentes</h2></div>
        </Reveal>
        <div className="mt-10 divide-y rounded-2xl border bg-card">
          {faqs.map(([q, a], i) => <div key={q}><button className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-bold" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}><span>{q}</span><ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${faq === i ? "rotate-180 text-primary" : ""}`} /></button>{faq === i && <div className="px-5 pb-5 leading-7 text-muted-foreground">{a}</div>}</div>)}
        </div>
      </section>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
          <div><div className="flex items-center gap-2"><span className="size-7 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} /><span className="font-display text-xl uppercase">run</span></div><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">Entrena. Progresa. Conecta.</p></div>
          <div><p className="font-bold">Producto</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#funciones" className="block hover:text-foreground">Funciones</a><a href="#planes" className="block hover:text-foreground">Planes</a><a href="#entrenadores" className="block hover:text-foreground">Entrenadores</a><a href="#comunidad" className="block hover:text-foreground">Comunidad</a></div></div>
          <div><p className="font-bold">Ayuda</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#faq" className="block hover:text-foreground">Preguntas frecuentes</a><a href="mailto:soporte@run.app" className="block hover:text-foreground">Contacto</a></div></div>
          <div><p className="font-bold">Legal</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#" className="block hover:text-foreground">Términos</a><a href="#" className="block hover:text-foreground">Privacidad</a><a href="#" className="block hover:text-foreground">Cookies</a></div></div>
        </div>
        <div className="border-t px-5 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} RUN. Todos los derechos reservados.</div>
      </footer>
    </main>
  );
}
