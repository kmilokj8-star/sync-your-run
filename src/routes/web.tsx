import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  Activity, ArrowRight, Check, ChevronDown, CircleCheck, Download, Dumbbell,
  Footprints, Map, Menu, ShieldCheck, Smartphone, Trophy, Users, Watch, X,
  Route as RouteIcon, Zap, Bike, Radio, Target, type LucideIcon,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FunctionVisual, PerformanceVisual } from "@/components/public-visuals";
import heroPhoto from "@/assets/run-public-hero.jpg";
import communityPhoto from "@/assets/run-public-community.jpg";
import coachingPhoto from "@/assets/run-public-coaching.jpg";
import logo from "@/assets/logo-mark.png.asset.json";

export const Route = createFileRoute("/web")({
  head: () => ({
    meta: [
      { title: "RUN — Train. Progress. Connect." },
      { name: "description", content: "RUN brings running activities, training, routes and progress together in one athletic experience." },
      { property: "og:title", content: "RUN — Train. Progress. Connect." },
      { property: "og:description", content: "Your running. Your training. Your progress. Together with RUN." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicWebsite,
});

const EN: Record<string,string> = {"Menú":"Menu","Entrena. Progresa. Conecta.":"Train. Progress. Connect.","Registra tus actividades":"Track your activities","Rutas y recorridos":"Routes","Conecta tus dispositivos":"Connect your devices","Retos y puntos":"Challenges & points","Privacidad y control":"Privacy and control","Objetivo en progreso":"Goal in progress","Funciones":"Features","Deportistas":"Athletes","Entrenadores":"Coaches","Comunidad":"Community","Planes":"Plans","Ayuda":"Help","Iniciar sesión":"Sign in","Crear cuenta":"Create account","Crear cuenta gratis":"Create your free account","Conocer RUN":"Explore RUN","Para corredores":"For runners","Tu entrenamiento.":"Your training.","Tu progreso.":"Your progress.","Tu camino.":"Your journey.","Todo en un solo lugar":"Everything in one place","Herramientas para correr mejor":"Tools to help you run better","Para deportistas":"For athletes","Para entrenadores":"For coaches","Confianza":"Trust","Entrenadores verificados":"Verified coaches","Próximamente":"Coming soon","Descarga RUN":"Download RUN","Lleva RUN contigo.":"Take RUN with you.","Preguntas frecuentes":"Frequently asked questions","Producto":"Product","Legal":"Legal","Términos":"Terms","Privacidad":"Privacy","Cookies":"Cookies","Contacto":"Contact","Todos los derechos reservados.":"All rights reserved.","Entrena":"Train","Registra":"Record","Progresa":"Progress","Conecta":"Connect","Retos":"Challenges","Logros":"Achievements","Puntos":"Points","Rutas":"Routes","Entrenamiento":"Training","Maratón":"Marathon","Gratis":"Free","Premium":"Premium","Recomendado":"Recommended","Comenzar gratis":"Start free","Conocer RUN+":"Explore RUN+","Principiantes":"Beginners","Corredores recreativos":"Recreational runners","Corredores competitivos":"Competitive runners","Preparación de carreras":"Race preparation","Soy entrenador":"I'm a coach","Empezar con RUN":"Get started with RUN","Avísame cuando esté disponible":"Notify me when available","RUN reúne tus actividades, entrenamiento, objetivos, rutas, dispositivos y comunidad en una experiencia creada para corredores.":"RUN brings your activities, training, goals, routes, devices and community together in one experience built for runners.","La plataforma crece contigo, desde tu primera carrera hasta tus próximos grandes objetivos.":"The platform grows with you, from your first run to your next big goals.","Guarda tus carreras y consulta distancia, tiempo, ritmo y otros datos de cada sesión.":"Save your runs and review distance, time, pace and other data from every session.","Organiza tus sesiones y trabaja con planes para diferentes objetivos y distancias.":"Organize your sessions and work with plans for different goals and distances.","Registra tus recorridos y conserva tu historial de entrenamiento.":"Record your routes and keep your training history.","Explora las integraciones Garmin Connect, Strava, Apple Health y Coros. Las conexiones actuales son simuladas.":"Explore Garmin Connect, Strava, Apple Health and Coros integrations. Connections are currently simulated.","Convierte la constancia en motivación con retos, logros y puntos.":"Turn consistency into motivation with challenges, achievements and points.","Conecta con profesionales y lleva tu entrenamiento acompañado.":"Connect with professionals and train with guidance.","RUN está pensado para acompañarte sin importar si estás empezando, entrenando por salud o preparando una nueva marca.":"RUN is designed to support you whether you are just starting, training for health or preparing for a new personal best.","RUN también está pensado para profesionales que quieren centralizar su relación con sus deportistas.":"RUN is also designed for professionals who want to centralize their relationship with athletes.","Organiza el trabajo de tus atletas.":"Organize your athletes' training.","Ten la información de entrenamiento centralizada.":"Keep training information centralized.","Mantén el contacto con tus deportistas.":"Stay connected with your athletes.","Presenta tu experiencia y especialidades.":"Showcase your experience and specialties.","La insignia identifica los perfiles que han pasado por el proceso de revisión de RUN.":"The badge identifies profiles that have completed RUN's review process.","Participa en retos, consigue logros, acumula puntos y encuentra nuevas razones para mantenerte en movimiento.":"Join challenges, earn achievements, collect points and find new reasons to keep moving.","Estamos preparando la próxima evolución de RUN para ampliar la experiencia deportiva.":"We are preparing the next evolution of RUN to expand your sports experience.","Una experiencia clara para comenzar, con opciones adicionales para quienes quieren profundizar en su entrenamiento.":"A clear experience to get started, with additional options for those who want to go deeper into their training.","Empieza a registrar tus carreras y a construir tu camino desde donde estés.":"Start recording your runs and building your journey wherever you are.","Empieza donde estás. Avanza hacia donde quieres llegar.":"Start where you are. Move toward where you want to go.","Entrena. Acompaña. Haz crecer a tus atletas.":"Train. Guide. Grow your athletes.","Planes y sesiones":"Plans & sessions","Seguimiento de atletas":"Athlete tracking","Comunicación":"Communication","Perfil profesional":"Professional profile","Entrenador verificado":"Verified coach","Corre acompañado.":"Run together.","RUN también llegará al ciclismo.":"RUN is coming to cycling.","Empieza gratis. Crece cuando quieras.":"Start free. Grow when you want.","Registro de actividades":"Activity tracking","Estadísticas básicas":"Basic statistics","Planes y objetivos":"Plans & goals","Metas y logros":"Goals & achievements","Funciones de comunidad":"Community features","Todo lo incluido en Free":"Everything in Free","Funciones avanzadas":"Advanced features","Planes personalizados":"Personalized plans","Analíticas ampliadas":"Advanced analytics","Experiencia sin anuncios*":"Ad-free experience*","Las funciones concretas y precios de suscripción quedan sujetos a la configuración comercial vigente.":"Specific features and subscription pricing are subject to the current commercial configuration.","Carrera":"Run","Actividad registrada":"Activity recorded","Distancia":"Distance","Tiempo":"Time","Ritmo":"Pace","Tus recorridos":"Your routes","Sigue avanzando":"Keep going","Organiza tu camino":"Organize your journey","Conserva cada sesión":"Keep every session","Mide tu evolución":"Track your progress","Corre acompañado":"Run together","Web + móvil":"Web + mobile","¿Qué es RUN?":"What is RUN?","RUN es una plataforma deportiva pensada para corredores que quieren registrar sus actividades, organizar su entrenamiento, seguir su progreso y conectar con una comunidad y entrenadores.":"RUN is a sports platform for runners who want to record activities, organize training, track progress, and connect with a community and coaches.","¿Necesito experiencia para utilizar RUN?":"Do I need experience to use RUN?","No. RUN está pensado tanto para quienes empiezan a correr como para corredores con experiencia.":"No. RUN is designed for both new and experienced runners.","¿Puedo utilizar RUN sin entrenador?":"Can I use RUN without a coach?","Sí. Puedes utilizar las funciones de registro, actividades, rutas, retos y otras herramientas de RUN sin tener un entrenador.":"Yes. You can use activity tracking, routes, challenges, and other RUN tools without a coach.","¿Qué dispositivos puedo conectar?":"Which devices can I connect?","Garmin Connect, Strava, Apple Health y Coros están presentes en la experiencia actual de integración. Las conexiones son simuladas hasta disponer de autorización real.":"Garmin Connect, Strava, Apple Health and Coros are represented in the current integration experience. Connections are simulated until live authorization is available.","¿RUN tendrá ciclismo?":"Will RUN support cycling?","Sí. El ciclismo forma parte de la evolución prevista de RUN y se presentará como una futura expansión de la plataforma.":"Yes. Cycling is part of RUN's planned evolution and will be introduced as a future platform expansion.","¿Mis datos están protegidos?":"Is my data protected?","RUN incorpora controles de privacidad y gestión de preferencias dentro de la aplicación. Consulta las políticas oficiales antes de utilizar el servicio.":"RUN includes privacy controls and preference management within the app. Review the official policies before using the service."};
const features: [LucideIcon, string, string][] = [
  [Activity, "Registra tus actividades", "Guarda tus carreras y consulta distancia, tiempo, ritmo y otros datos de cada sesión."],
  [Dumbbell, "Entrenamiento", "Organiza tus sesiones y trabaja con planes para diferentes objetivos y distancias."],
  [Map, "Rutas y recorridos", "Registra tus recorridos y conserva tu historial de entrenamiento."],
  [Watch, "Conecta tus dispositivos", "Explora las integraciones Garmin Connect, Strava, Apple Health y Coros. Las conexiones actuales son simuladas."],
  [Trophy, "Retos y puntos", "Convierte la constancia en motivación con retos, logros y puntos."],
  [Users, "Entrenadores", "Conecta con profesionales y lleva tu entrenamiento acompañado."],
];

const faqs: [string, string][] = [
  ["What is RUN?", "RUN is a sports platform for runners who want to record activities, organize training, track progress, and connect with a community and coaches."],
  ["Do I need experience to use RUN?", "No. RUN is designed for both new and experienced runners."],
  ["Can I use RUN without a coach?", "Yes. You can use activity tracking, routes, challenges, and other RUN tools without a coach."],
  ["Which devices can I connect?", "Garmin Connect, Strava, Apple Health and Coros are represented in the current integration experience. Connections are simulated until live authorization is available."],
  ["Will RUN support cycling?", "Yes. Cycling is part of RUN's planned evolution and will be introduced as a future platform expansion."],
  ["Is my data protected?", "RUN includes privacy controls and preference management within the app. Review the official policies before using the service."],
];

function useReveal<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
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

function CyclingIllustration({ language }: { language: "en" | "es" }) {
  return (
    <svg viewBox="0 0 760 360" className="h-full w-full" aria-label={language === "en" ? "RUN road bicycle illustration" : "Ilustración de bicicleta de carretera RUN"} role="img">
      <defs>
        <linearGradient id="cyclingTrail" x1="0" x2="1">
          <stop stopColor="currentColor" stopOpacity="0"/>
          <stop offset=".5" stopColor="currentColor" stopOpacity=".32"/>
          <stop offset="1" stopColor="currentColor" stopOpacity="0"/>
        </linearGradient>
        <linearGradient id="bikeFrame" x1="0" y1="0" x2="1" y2="1">
          <stop stopColor="currentColor" stopOpacity=".95"/>
          <stop offset="1" stopColor="currentColor" stopOpacity=".58"/>
        </linearGradient>
      </defs>

      <path d="M35 292h690" stroke="currentColor" strokeWidth="3" opacity=".18"/>
      <path d="M28 250 C145 152 248 286 370 178 S565 138 732 210" fill="none" stroke="url(#cyclingTrail)" strokeWidth="42" strokeLinecap="round"/>
      <path d="M28 250 C145 152 248 286 370 178 S565 138 732 210" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="10 15" opacity=".34" className="run-dash"/>

      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="205" cy="270" r="68" strokeWidth="6"/>
        <circle cx="555" cy="270" r="68" strokeWidth="6"/>

        <path d="M205 270 L315 145 L405 270 L205 270 Z" stroke="url(#bikeFrame)" strokeWidth="8"/>
        <path d="M315 145 L370 112 L438 145 L405 270" strokeWidth="8"/>
        <path d="M438 145 L492 130" strokeWidth="8"/>
        <path d="M492 130 L520 143 L535 128 L521 111" strokeWidth="7"/>
        <path d="M370 112 L348 86" strokeWidth="7"/>
        <path d="M348 86 L382 78 L412 88" strokeWidth="7"/>

        <path d="M405 270 L438 145" strokeWidth="6"/>
        <path d="M315 145 L292 183" strokeWidth="6"/>
        <path d="M292 183 L268 183" strokeWidth="6"/>
        <path d="M405 270 L455 270" strokeWidth="6"/>
        <path d="M455 270 L475 291" strokeWidth="5"/>
        <path d="M455 270 L438 296" strokeWidth="5"/>

        <path d="M370 112 L338 104" strokeWidth="7"/>
        <path d="M338 104 L315 114" strokeWidth="5"/>
        <path d="M492 130 L505 105" strokeWidth="6"/>
        <path d="M505 105 L528 104" strokeWidth="6"/>

        <circle cx="405" cy="270" r="13" fill="currentColor" stroke="none"/>
        <circle cx="405" cy="270" r="28" strokeWidth="3" opacity=".55"/>
        <circle cx="205" cy="270" r="7" fill="currentColor" stroke="none"/>
        <circle cx="555" cy="270" r="7" fill="currentColor" stroke="none"/>
      </g>

      <g stroke="currentColor" strokeWidth="2" opacity=".28">
        <path d="M205 202v136M137 270h136M157 222l96 96M157 318l96-96"/>
        <path d="M555 202v136M487 270h136M507 222l96 96M507 318l96-96"/>
      </g>

      <g transform="translate(535 34)">
        <rect width="175" height="70" rx="19" fill="currentColor" opacity=".10" stroke="currentColor" strokeOpacity=".15"/>
        <text x="18" y="27" fontSize="9" fontWeight="700" fill="currentColor" opacity=".52">{language === "en" ? "COMING NEXT" : "PRÓXIMAMENTE"}</text>
        <text x="18" y="52" fontSize="20" fontWeight="800" fill="currentColor">{language === "en" ? "CYCLING" : "CICLISMO"}</text>
      </g>
    </svg>
  );
}

export function PublicWebsite() {
  const [language,setLanguage]=useState<"en"|"es">("en");
  const tr=(s:string)=>{if(language==="en")return EN[s]??s; const hit=Object.entries(EN).find(([,en])=>en===s); return hit?.[0]??s;};
  const changeLanguage=(v:"en"|"es")=>{setLanguage(v);try{localStorage.setItem("run-language",v)}catch{}};
  useEffect(()=>{try{const v=localStorage.getItem("run-language");if(v==="en"||v==="es")setLanguage(v)}catch{}},[]);
  const [menu, setMenu] = useState(false);
  const [faq, setFaq] = useState<number | null>(null);

  const nav: [string, string][] = [
    ["Funciones", "#funciones"],
    ["Deportistas", "#deportistas"],
    ["Entrenadores", "#entrenadores"],
    ["Comunidad", "#comunidad"],
    ["Planes", "#planes"],
    ["Ayuda", "#faq"],
  ];

  return (
    <main lang={language} className="run-public min-h-screen overflow-x-hidden bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2.5" aria-label="RUN inicio">
            <span className="run-logo-entrance size-12 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} />
            <span className="font-display text-2xl uppercase tracking-normal">run</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, href]) => <a key={label} href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{tr(label)}</a>)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <select aria-label="Language" value={language} onChange={e=>changeLanguage(e.target.value as "en"|"es")} className="rounded-lg bg-transparent px-3 py-2.5 text-sm font-semibold text-muted-foreground outline-none"><option value="en">EN</option><option value="es">ES</option></select>
            <a href={`${import.meta.env.BASE_URL}app`} className="rounded-lg px-4 py-2.5 text-sm font-semibold">{tr("Iniciar sesión")}</a>
            <Button asChild className="h-auto p-0"><a href={`${import.meta.env.BASE_URL}app`} className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">{tr("Crear cuenta")}</a></Button>
          </div>
          <div className="flex items-center gap-2 lg:hidden"><select aria-label="Language" value={language} onChange={e=>changeLanguage(e.target.value as "en"|"es")} className="min-h-11 rounded-md border bg-background px-2 text-sm"><option value="en">EN</option><option value="es">ES</option></select><Button variant="ghost" className="flex size-11 items-center justify-center rounded-lg border lg:hidden" onClick={() => setMenu(!menu)} aria-label={tr("Menú")} aria-expanded={menu}>
            {menu ? <X /> : <Menu />}
          </Button></div>
        </div>
        {menu && <div className="border-t bg-background px-5 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)} className="rounded-lg px-3 py-3 font-semibold hover:bg-muted">{tr(label)}</a>)}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={`${import.meta.env.BASE_URL}app`} className="rounded-lg border px-4 py-3 text-center font-semibold">{tr("Iniciar sesión")}</a>
              <Button asChild className="h-auto p-0"><a href={`${import.meta.env.BASE_URL}app`} onClick={() => setMenu(false)} className="rounded-lg bg-primary px-4 py-3 text-center font-bold text-primary-foreground">{tr("Crear cuenta")}</a></Button>
            </div>
          </nav>
        </div>}
      </header>

      <section id="inicio" className="run-public-hero relative isolate overflow-hidden">
        <img src={heroPhoto} width={1536} height={1024} fetchPriority="high" alt={language === "en" ? "Runner with a sports watch moving forward on a track" : "Corredor con reloj deportivo avanzando en una pista"} className="run-hero-photo absolute inset-0 h-full w-full object-cover" />
        <div className="run-hero-shade absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-5 py-14 lg:px-8 lg:py-20">
          <Reveal className="run-hero-copy max-w-2xl">
            <p className="mb-5 flex items-center gap-2 text-xs font-bold uppercase text-primary"><Activity className="size-4" /> RUN / {tr("Para corredores")}</p>
            <h1 className="font-display text-5xl uppercase leading-[1.05] sm:text-6xl lg:text-7xl">RUN.<br />{tr("Tu entrenamiento.")}<br /><span className="text-primary">{tr("Tu progreso.")}</span></h1>
            <p className="mt-6 max-w-lg text-lg leading-7 text-muted-foreground">{tr("RUN reúne tus actividades, entrenamiento, objetivos, rutas, dispositivos y comunidad en una experiencia creada para corredores.")}</p>
            <div className="mt-7 flex flex-wrap gap-3"><Button asChild size="lg" className="h-auto min-h-12 px-6 py-3 font-bold"><a href={`${import.meta.env.BASE_URL}app`}>{tr("Empezar con RUN")}<ArrowRight /></a></Button><Button asChild variant="outline" size="lg" className="h-auto min-h-12 px-6 py-3"><a href="#funciones">{tr("Conocer RUN")}</a></Button></div>
            <div className="mt-6 flex flex-wrap gap-5 text-sm text-muted-foreground"><span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" />{tr("Privacidad y control")}</span><span className="flex items-center gap-2"><Watch className="size-4 shrink-0 text-primary" /> Garmin Connect · Strava · Apple Health · Coros</span></div>
          </Reveal>
          <div className="run-hero-telemetry run-card-float border bg-card/90 p-4 backdrop-blur" role="img" aria-label={language === "en" ? "Illustrative running metrics" : "Métricas ilustrativas de running"}>
            <div className="flex items-center justify-between gap-6"><span className="flex items-center gap-2 text-xs font-bold"><Activity className="size-4 text-primary" />{tr("Actividad registrada")}</span><span className="text-[10px] text-muted-foreground">{language === "en" ? "ILLUSTRATIVE" : "ILUSTRATIVO"}</span></div>
            <div className="mt-3 grid grid-cols-3 gap-4">{[["10.2 km",tr("Distancia")],["56:26",tr("Tiempo")],["5:32 /km",tr("Ritmo")]].map(([v,label])=><div key={label}><p className="font-mono text-lg font-bold">{v}</p><p className="text-xs text-muted-foreground">{label}</p></div>)}</div>
            <div className="run-signal mt-3 h-1 overflow-hidden bg-muted"><div className="h-full w-3/4 bg-primary"/></div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {([["Entrena", "Organize your journey", Dumbbell], ["Registra", "Keep every session", Activity], ["Progresa", "Track your progress", Zap], ["Conecta", "Run together", Users]] as const).map(([title, text, Icon]) => (
            <div key={tr(title as string)} className="group flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:-translate-y-0.5"><Icon className="size-4" /></span>
              <div><p className="font-bold">{tr(title as string)}</p><p className="text-sm text-muted-foreground">{tr(text as string)}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="funciones" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-normal text-primary">{tr("Everything in one place")}</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Tools to help you run better")}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{tr("The platform grows with you, from your first run to your next big goals.")}</p></div>
        </Reveal>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, text], i) => (
            <Reveal key={title as string} delay={i * 60}>
              <article className="group h-full rounded-lg border bg-card p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                <FunctionVisual index={i} language={language} />
                <div className="mb-3 mt-6 flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all duration-300 group-hover:bg-primary group-hover:text-primary-foreground "><Icon className="size-5" /></div>
                <h3 className="font-display text-xl uppercase">{tr(title as string)}</h3><p className="mt-3 leading-7 text-muted-foreground">{tr(text as string)}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="deportistas" className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute -right-24 top-0 size-96 rounded-full bg-primary/15 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-[1.05fr_.95fr] lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-normal text-primary">{tr("Para deportistas")}</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Empieza donde estás. Avanza hacia donde quieres llegar.")}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 opacity-70">{tr("RUN is designed to support you whether you are just starting, training for health or preparing for a new personal best.")}</p>
            <Button asChild className="h-auto p-0"><a href={`${import.meta.env.BASE_URL}app`} className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-all hover:-translate-y-1">{tr("Empezar con RUN")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a></Button>
          </Reveal>
                     <Reveal delay={120}>
             <PerformanceVisual language={language} />
             <div className="mt-6 grid grid-cols-2 gap-3">{[tr("Principiantes"),tr("Corredores recreativos"),tr("Corredores competitivos"),tr("Preparación de carreras")].map(x=><p key={x} className="flex items-start gap-2 text-sm"><Check className="size-4 shrink-0 text-primary"/>{x}</p>)}</div>
           </Reveal>
        </div>
      </section>

      <section id="entrenadores" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-normal text-primary">{tr("Para entrenadores")}</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Entrena. Acompaña. Haz crecer a tus atletas.")}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{tr("RUN también está pensado para profesionales que quieren centralizar su relación con sus deportistas.")}</p><Button asChild className="h-auto p-0"><a href={`${import.meta.env.BASE_URL}app`} className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-all hover:-translate-y-1">{tr("Soy entrenador")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a></Button>
                         <div className="mt-8 overflow-hidden rounded-lg"><img src={coachingPhoto} width={1024} height={1024} loading="lazy" alt={language === "en" ? "Coach and runner reviewing a training plan together" : "Entrenador y corredora revisando juntos un plan de entrenamiento"} className="aspect-[4/3] w-full object-cover" /></div>
</Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Planes y sesiones", "Seguimiento de atletas", "Comunicación", "Perfil profesional"].map((x, i) => (
              <Reveal key={x} delay={i * 70}>
                <div className="group h-full rounded-lg border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:border-primary/40">
                  <div className="mb-7 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">{i === 0 ? <Dumbbell className="size-5" /> : i === 1 ? <Activity className="size-5" /> : i === 2 ? <Radio className="size-5" /> : <ShieldCheck className="size-5" />}</div>
                  <h3 className="font-display text-xl uppercase">{tr(x)}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{tr(["Organiza el trabajo de tus atletas.", "Ten la información de entrenamiento centralizada.", "Mantén el contacto con tus deportistas.", "Presenta tu experiencia y especialidades."][i] ?? "")}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

             <section className="border-y bg-muted/30"><Reveal className="mx-auto max-w-7xl px-5 py-14 lg:px-8"><div className="grid gap-6 sm:grid-cols-[auto_1fr]"><ShieldCheck className="size-10 text-primary"/><div><h2 className="font-display text-2xl uppercase">{tr("Privacidad y control")}</h2><p className="mt-3 max-w-3xl leading-7 text-muted-foreground">{tr("RUN includes privacy controls and preference management within the app. Review the official policies before using the service.")}</p></div></div></Reveal></section>

<section id="comunidad" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_.9fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-normal text-primary">{tr("Comunidad")}</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Corre acompañado.")}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{tr("Participa en retos, consigue logros, acumula puntos y encuentra nuevas razones para mantenerte en movimiento.")}</p>
            <div className="mt-8 grid grid-cols-3 gap-3">{([["Retos", Trophy], ["Logros", Target], ["Puntos", Zap]] as const).map(([x, Icon]) => <div key={tr(x as string)} className="min-w-0 border-t border-primary/30 py-4 text-center"><Icon className="mx-auto mb-4 size-5 text-primary" /><p className="font-display text-sm uppercase">{tr(x as string)}</p></div>)}</div>
          </Reveal>
          <Reveal delay={120} className="text-primary">
            <div className="overflow-hidden rounded-lg"><img src={communityPhoto} width={1536} height={1024} loading="lazy" alt={language === "en" ? "Four runners training together on a shared route" : "Cuatro corredores entrenando juntos en una ruta compartida"} className="aspect-[3/2] w-full object-cover" /></div>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 lg:grid-cols-[1fr_.8fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-normal opacity-70">{tr("Próximamente")}</p><h2 className="mt-2 font-display text-4xl uppercase">{tr("RUN también llegará al ciclismo.")}</h2><p className="mt-3 max-w-2xl opacity-80">{tr("Estamos preparando la próxima evolución de RUN para ampliar la experiencia deportiva.")}</p>
            <Button variant="ghost" disabled className="mt-7 rounded-xl bg-foreground px-6 py-3.5 font-bold text-background transition-all hover:-translate-y-1">{tr("Próximamente")}</Button>
          </Reveal>
          <Reveal delay={100} className="text-primary-foreground">
            <div className="run-float h-48"><CyclingIllustration language={language} /></div>
          </Reveal>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-normal text-primary">{tr("Planes")}</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">{tr("Empieza gratis. Crece cuando quieras.")}</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{tr("A clear experience to get started, with additional options for those who want to go deeper into their training.")}</p></div>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {[["Free", "RUN Free", ["Activity tracking", "Basic statistics", "Plans & goals", "Goals & achievements", "Community features"], false], ["Premium", "RUN+", ["Everything in Free", "Advanced features", "Personalized plans", "Advanced analytics", "Ad-free experience*"], true]].map(([eyebrow, title, items, featured], i) => (
            <Reveal key={title as string} delay={i * 100}>
              <div className={`relative h-full rounded-2xl border ${featured ? "border-2 border-primary shadow-xl shadow-primary/10" : "bg-card"} p-7 transition-transform hover:-translate-y-2`}>
                {featured && <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground">{tr("Recomendado")}</span>}
                <p className={`text-sm font-bold uppercase tracking-normal ${featured ? "text-primary" : "text-muted-foreground"}`}>{tr(eyebrow === "Free" ? "Gratis" : eyebrow as string)}</p><h3 className="mt-3 font-display text-3xl uppercase">{title as string}</h3>
                <ul className="mt-7 space-y-3 text-sm">{(items as string[]).map(x => <li key={x} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{tr(x)}</li>)}</ul>
                <a href={`${import.meta.env.BASE_URL}app`} className={`mt-8 block rounded-xl px-5 py-3 text-center font-bold transition-all hover:-translate-y-0.5 ${featured ? "bg-primary text-primary-foreground" : "border"}`}>{tr(featured ? "Explore RUN+" : "Start free")}</a>
              </div>
            </Reveal>
          ))}
        </div>
        <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-muted-foreground">* {tr("Las funciones concretas y precios de suscripción quedan sujetos a la configuración comercial vigente.")}</p>
      </section>

      <section id="descarga" className="relative overflow-hidden bg-foreground text-background">
        <div className="pointer-events-none absolute right-0 top-0 size-96 rounded-full bg-primary/10 blur-3xl" />
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-24">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-normal text-primary">{tr("Descarga RUN")}</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">{tr("Lleva RUN contigo.")}</h2><p className="mt-5 max-w-xl text-lg leading-8 opacity-70">{tr("Start recording your runs and building your journey wherever you are.")}</p><div className="mt-8 flex flex-wrap gap-3"><Button variant="ghost" disabled className="transition-all hover:-translate-y-1 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground"><Download className="mr-2 inline size-4" /> Google Play · {tr("Próximamente")}</Button><Button variant="ghost" disabled className="transition-all hover:-translate-y-1 rounded-xl border border-background/20 px-6 py-3.5 font-bold"><Download className="mr-2 inline size-4" /> App Store · {tr("Próximamente")}</Button></div>
          </Reveal>
                     <Reveal delay={100}><Button asChild size="lg" className="h-auto min-h-12 px-6 py-4"><a href={`${import.meta.env.BASE_URL}app`}><Smartphone />{language === "en" ? "Open RUN web" : "Abrir RUN web"}<ArrowRight /></a></Button></Reveal>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 lg:py-24">
        <Reveal>
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-normal text-primary">{tr("Ayuda")}</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">{tr("Preguntas frecuentes")}</h2></div>
        </Reveal>
        <div className="mt-10 divide-y rounded-2xl border bg-card">
          {faqs.map(([q, a], i) => <div key={q}><Button variant="ghost" className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-bold" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}><span>{tr(q)}</span><ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${faq === i ? "rotate-180 text-primary" : ""}`} /></Button>{faq === i && <div className="px-5 pb-5 leading-7 text-muted-foreground">{tr(a)}</div>}</div>)}
        </div>
      </section>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
          <div><div className="flex items-center gap-2"><span className="run-logo-entrance size-8 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} /><span className="font-display text-xl uppercase">run</span></div><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{tr("Entrena. Progresa. Conecta.")}</p></div>
          <div><p className="font-bold">{tr("Producto")}</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#funciones" className="block hover:text-foreground">{tr("Funciones")}</a><a href="#planes" className="block hover:text-foreground">{tr("Planes")}</a><a href="#entrenadores" className="block hover:text-foreground">{tr("Entrenadores")}</a><a href="#comunidad" className="block hover:text-foreground">{tr("Comunidad")}</a></div></div>
          <div><p className="font-bold">{tr("Ayuda")}</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#faq" className="block hover:text-foreground">{tr("Preguntas frecuentes")}</a><a href="#faq" className="block hover:text-foreground">{tr("Contacto")}</a></div></div>
          <div><p className="font-bold">{tr("Legal")}</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><p>{language === "en" ? "Official policies coming soon" : "Políticas oficiales próximamente"}</p></div></div>
        </div>
        <div className="border-t px-5 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} RUN. {tr("Todos los derechos reservados.")}</div>
      </footer>
    </main>
  );
}
