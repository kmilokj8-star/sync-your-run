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
      { title: "RUN — Train. Progress. Connect." },
      { name: "description", content: "RUN es una plataforma para corredores: registra actividades, conecta dispositivos, organiza entrenamientos, alcanza objetivos y conecta con entrenadores." },
      { property: "og:title", content: "RUN — Train. Progress. Connect." },
      { property: "og:description", content: "Todo lo que necesitas para llevar tu running al siguiente nivel." },
      { property: "og:type", content: "website" },
    ],
  }),
  component: PublicWebsite,
});

const EN: Record<string,string> = {"Funciones":"Features","Deportistas":"Athletes","Entrenadores":"Coaches","Comunidad":"Community","Planes":"Plans","Ayuda":"Help","Iniciar sesión":"Sign in","Crear cuenta":"Create account","Create your free account":"Create your free account","Conocer RUN":"Explore RUN","For runners":"For runners","Your training.":"Your training.","Tu progreso.":"Your progress.","Your journey.":"Your journey.","Everything in one place":"Everything in one place","Tools to help you run better":"Tools to help you run better","Para deportistas":"For athletes","Para entrenadores":"For coaches","Confianza":"Trust","Entrenadores verificados":"Verified coaches","Próximamente":"Coming soon","Descarga RUN":"Download RUN","Lleva RUN contigo.":"Take RUN with you.","Preguntas frecuentes":"Frequently asked questions","Producto":"Product","Legal":"Legal","Términos":"Terms","Privacidad":"Privacy","Cookies":"Cookies","Contacto":"Contact","Todos los derechos reservados.":"All rights reserved.","Entrena":"Train","Registra":"Record","Progresa":"Progress","Conecta":"Connect","Challenges":"Challenges","Logros":"Achievements","Puntos":"Points","Rutas":"Routes","Entrenamiento":"Training","Marathon":"Marathon","Free":"Free","Premium":"Premium","Recomendado":"Recommended","Start free":"Start free","Explore RUN+":"Explore RUN+","Principiantes":"Beginners","Corredores recreativos":"Recreational runners","Corredores competitivos":"Competitive runners","Preparación de carreras":"Race preparation","I'm a coach":"I'm a coach","Empezar con RUN":"Get started with RUN","Avísame cuando esté disponible":"Notify me when available","RUN brings your activities, training, goals, routes, devices and community together in one experience built for runners.":"RUN brings your activities, training, goals, routes, devices and community together in one experience built for runners.","The platform grows with you, from your first run to your next big goals.":"The platform grows with you, from your first run to your next big goals.","Save your runs and review distance, time, pace and other data from every session.":"Save your runs and review distance, time, pace and other data from every session.","Organize your sessions and work with plans for different goals and distances.":"Organize your sessions and work with plans for different goals and distances.","Record your routes and keep your training history.":"Record your routes and keep your training history.","RUN supports connections with Garmin, Strava, Apple Health and Coros.":"RUN supports connections with Garmin, Strava, Apple Health and Coros.","Turn consistency into motivation with challenges, achievements and points.":"Turn consistency into motivation with challenges, achievements and points.","Connect with professionals and train with guidance.":"Connect with professionals and train with guidance.","RUN is designed to support you whether you are just starting, training for health or preparing for a new personal best.":"RUN is designed to support you whether you are just starting, training for health or preparing for a new personal best.","RUN is also designed for professionals who want to centralize their relationship with athletes.":"RUN is also designed for professionals who want to centralize their relationship with athletes.","Organize your athletes' training.":"Organize your athletes' training.","Keep training information centralized.":"Keep training information centralized.","Stay connected with your athletes.":"Stay connected with your athletes.","Showcase your experience and specialties.":"Showcase your experience and specialties.","The badge identifies profiles that have completed RUN's review process.":"The badge identifies profiles that have completed RUN's review process.","Join challenges, earn achievements, collect points and find new reasons to keep moving.":"Join challenges, earn achievements, collect points and find new reasons to keep moving.","We are preparing the next evolution of RUN to expand your sports experience.":"We are preparing the next evolution of RUN to expand your sports experience.","A clear experience to get started, with additional options for those who want to go deeper into their training.":"A clear experience to get started, with additional options for those who want to go deeper into their training.","Start recording your runs and building your journey wherever you are.":"Start recording your runs and building your journey wherever you are.","Tu entrenamiento.":"Your training.","Tu camino.":"Your journey.","Para corredores":"For runners","Crear cuenta gratis":"Create your free account","Web + móvil":"Web + mobile","Tu entrenamiento":"Your training","Sigue avanzando":"Keep going","Organiza tu camino":"Organize your journey","Conserva cada sesión":"Keep every session","Mide tu evolución":"Track your progress","Corre acompañado":"Run together","Empieza donde estás. Avanza hacia donde quieres llegar.":"Start where you are. Move toward where you want to go.","Entrena. Acompaña. Haz crecer a tus atletas.":"Train. Guide. Grow your athletes.","Soy entrenador":"I'm a coach","Planes y sesiones":"Plans & sessions","Seguimiento de atletas":"Athlete tracking","Comunicación":"Communication","Perfil profesional":"Professional profile","Entrenador verificado":"Verified coach","Maratón":"Marathon","Corre acompañado.":"Run together.","RUN también llegará al ciclismo.":"RUN is coming to cycling.","Empieza gratis. Crece cuando quieras.":"Start free. Grow when you want.","Gratis":"Free","Registro de actividades":"Activity tracking","Estadísticas básicas":"Basic statistics","Planes y objetivos":"Plans & goals","Metas y logros":"Goals & achievements","Funciones de comunidad":"Community features","Premium":"Premium","Todo lo incluido en Free":"Everything in Free","Funciones avanzadas":"Advanced features","Planes personalizados":"Personalized plans","Analíticas ampliadas":"Advanced analytics","Experiencia sin anuncios*":"Ad-free experience*","Conocer RUN+":"Explore RUN+","Comenzar gratis":"Start free","Empieza a registrar tus carreras y a construir tu camino desde donde estés.":"Start recording your runs and building your journey wherever you are.","Las funciones concretas y precios de suscripción quedan sujetos a la configuración comercial vigente.":"Specific features and subscription pricing are subject to the current commercial configuration.","Entrena. Progresa. Conecta.":"Train. Progress. Connect.","Carrera":"Run","Actividad registrada":"Activity recorded","Distancia":"Distance","Tiempo":"Time","Ritmo":"Pace","Tus recorridos":"Your routes","Retos":"Challenges","Todo en un solo lugar":"Everything in one place","Herramientas para correr mejor":"Tools to help you run better","La plataforma crece contigo, desde tu primera carrera hasta tus próximos grandes objetivos.":"The platform grows with you, from your first run to your next big goals.","RUN reúne tus actividades, entrenamiento, objetivos, rutas, dispositivos y comunidad en una experiencia creada para corredores.":"RUN brings your activities, training, goals, routes, devices and community together in one experience built for runners.","Guarda tus carreras y consulta distancia, tiempo, ritmo y otros datos de cada sesión.":"Save your runs and review distance, time, pace and other data from every session.","Organiza tus sesiones y trabaja con planes para diferentes objetivos y distancias.":"Organize your sessions and work with plans for different goals and distances.","Registra tus recorridos y conserva tu historial de entrenamiento.":"Record your routes and keep your training history.","RUN ya contempla conexiones con Garmin, Strava, Apple Health y Coros.":"RUN supports connections with Garmin, Strava, Apple Health and Coros.","Convierte la constancia en motivación con retos, logros y puntos.":"Turn consistency into motivation with challenges, achievements and points.","Conecta con profesionales y lleva tu entrenamiento acompañado.":"Connect with professionals and train with guidance.","RUN está pensado para acompañarte sin importar si estás empezando, entrenando por salud o preparando una nueva marca.":"RUN is designed to support you whether you are just starting, training for health or preparing for a new personal best.","RUN también está pensado para profesionales que quieren centralizar su relación con sus deportistas.":"RUN is also designed for professionals who want to centralize their relationship with athletes.","Organiza el trabajo de tus atletas.":"Organize your athletes' training.","Ten la información de entrenamiento centralizada.":"Keep training information centralized.","Mantén el contacto con tus deportistas.":"Stay connected with your athletes.","Presenta tu experiencia y especialidades.":"Showcase your experience and specialties.","La insignia identifica los perfiles que han pasado por el proceso de revisión de RUN.":"The badge identifies profiles that have completed RUN's review process.","Participa en retos, consigue logros, acumula puntos y encuentra nuevas razones para mantenerte en movimiento.":"Join challenges, earn achievements, collect points and find new reasons to keep moving.","Estamos preparando la próxima evolución de RUN para ampliar la experiencia deportiva.":"We are preparing the next evolution of RUN to expand your sports experience.","Una experiencia clara para comenzar, con opciones adicionales para quienes quieren profundizar en su entrenamiento.":"A clear experience to get started, with additional options for those who want to go deeper into their training.","¿Qué es RUN?":"What is RUN?","RUN es una plataforma deportiva pensada para corredores que quieren registrar sus actividades, organizar su entrenamiento, seguir su progreso y conectar con una comunidad y entrenadores.":"RUN is a sports platform for runners who want to record activities, organize training, track progress, and connect with a community and coaches.","¿Necesito experiencia para utilizar RUN?":"Do I need experience to use RUN?","No. RUN está pensado tanto para quienes empiezan a correr como para corredores con experiencia.":"No. RUN is designed for both new and experienced runners.","¿Puedo utilizar RUN sin entrenador?":"Can I use RUN without a coach?","Sí. Puedes utilizar las funciones de registro, actividades, rutas, retos y otras herramientas de RUN sin tener un entrenador.":"Yes. You can use activity tracking, routes, challenges, and other RUN tools without a coach.","¿Qué dispositivos puedo conectar?":"Which devices can I connect?","El proyecto actual contempla conexiones con Garmin Connect, Strava, Apple Health y Coros. La disponibilidad concreta puede depender del dispositivo y del flujo de conexión.":"The current project supports Garmin Connect, Strava, Apple Health, and Coros. Availability may depend on the device and connection flow.","¿RUN tendrá ciclismo?":"Will RUN support cycling?","Sí. El ciclismo forma parte de la evolución prevista de RUN y se presentará como una futura expansión de la plataforma.":"Yes. Cycling is part of RUN's planned evolution and will be introduced as a future platform expansion.","¿Mis datos están protegidos?":"Is my data protected?","RUN incorpora controles de privacidad y gestión de preferencias dentro de la aplicación. Consulta las políticas oficiales antes de utilizar el servicio.":"RUN includes privacy controls and preference management within the app. Review the official policies before using the service."};
const features = [
  [Activity, "Registra tus actividades", "Save your runs and review distance, time, pace and other data from every session."],
  [Dumbbell, "Entrenamiento", "Organize your sessions and work with plans for different goals and distances."],
  [Map, "Rutas y recorridos", "Record your routes and keep your training history."],
  [Watch, "Conecta tus dispositivos", "RUN supports connections with Garmin, Strava, Apple Health and Coros."],
  [Trophy, "Retos y puntos", "Turn consistency into motivation with challenges, achievements and points."],
  [Users, "Entrenadores", "Connect with professionals and train with guidance."],
];

const faqs = [
  ["What is RUN?", "RUN is a sports platform for runners who want to record activities, organize training, track progress, and connect with a community and coaches."],
  ["Do I need experience to use RUN?", "No. RUN is designed for both new and experienced runners."],
  ["Can I use RUN without a coach?", "Yes. You can use activity tracking, routes, challenges, and other RUN tools without a coach."],
  ["Which devices can I connect?", "The current project supports Garmin Connect, Strava, Apple Health, and Coros. Availability may depend on the device and connection flow."],
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
    <svg viewBox="0 0 620 500" className="h-full w-full" aria-label="RUN athlete illustration" role="img">
      <defs>
        <linearGradient id="runnerSurface" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".20" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".02" />
        </linearGradient>
        <linearGradient id="runnerTrail" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".04" />
          <stop offset=".55" stopColor="currentColor" stopOpacity=".22" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
        <filter id="runnerBlur"><feGaussianBlur stdDeviation="18" /></filter>
      </defs>
      <ellipse cx="330" cy="415" rx="235" ry="34" fill="currentColor" opacity=".08" />
      <circle cx="458" cy="120" r="96" fill="currentColor" opacity=".055" filter="url(#runnerBlur)" />
      <circle cx="458" cy="120" r="62" fill="url(#runnerSurface)" stroke="currentColor" strokeOpacity=".10" />
      <path d="M60 374 C155 304 205 426 296 351 S466 270 570 332" fill="none" stroke="url(#runnerTrail)" strokeWidth="42" strokeLinecap="round" />
      <path d="M54 374 C152 307 203 421 294 350 S465 270 574 330" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="8 13" opacity=".26" className="run-dash" />
      <path d="M96 410h150M410 405h108" stroke="currentColor" strokeWidth="2" opacity=".13" />
      <g transform="translate(185 72)">
        <circle cx="116" cy="38" r="35" fill="currentColor" />
        <path d="M112 77c-7 29-26 56-54 82l-55 48 27 32 76-49 49-57 27 67 49 86 35-18-39-99-35-72c-11-23-31-35-57-36Z" fill="currentColor" opacity=".92" />
        <path d="M65 116 2 101l-68 30-12-25 79-45c10-6 22-6 32-2l61 24-29 33Z" fill="currentColor" opacity=".78" />
        <path d="M83 203 23 256l-62 10-2 25 80 2 81-50-37-40Z" fill="currentColor" />
        <path d="M184 224 243 263l67 2 1 25-83 3-78-36 34-33Z" fill="currentColor" opacity=".96" />
        <path d="M82 88c20 8 47 10 70 4" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity=".35" />
      </g>
      <g transform="translate(432 278)">
        <rect width="128" height="72" rx="18" fill="currentColor" opacity=".09" stroke="currentColor" strokeOpacity=".15" />
        <circle cx="24" cy="36" r="10" fill="currentColor" opacity=".18" />
        <path d="M20 39 24 28l4 11" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
        <text x="44" y="31" fontSize="10" fontWeight="700" fill="currentColor" opacity=".52">PACE</text>
        <text x="44" y="50" fontSize="18" fontWeight="800" fill="currentColor">5:02</text>
      </g>
      <circle cx="93" cy="130" r="6" fill="currentColor" opacity=".35" />
      <circle cx="119" cy="108" r="3.5" fill="currentColor" opacity=".25" />
      <circle cx="548" cy="178" r="5" fill="currentColor" opacity=".3" />
      <path d="M70 164h72M42 190h47M493 214h82" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".18" />
    </svg>
  );
}

function CommunityIllustration() {
  return (
    <svg viewBox="0 0 620 330" className="h-full w-full" aria-label="RUN community illustration" role="img">
      <defs>
        <linearGradient id="communityLine" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity=".05" />
          <stop offset=".5" stopColor="currentColor" stopOpacity=".35" />
          <stop offset="1" stopColor="currentColor" stopOpacity=".06" />
        </linearGradient>
      </defs>
      <path d="M52 260 C140 152 220 280 300 174 S465 116 570 205" fill="none" stroke="url(#communityLine)" strokeWidth="26" strokeLinecap="round" />
      <path d="M52 260 C140 152 220 280 300 174 S465 116 570 205" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="7 11" opacity=".34" className="run-dash" />
      {[{x:96,y:208,r:35},{x:238,y:126,r:43},{x:366,y:214,r:38},{x:506,y:150,r:42}].map((p, i) => (
        <g key={i} transform={`translate(${p.x} ${p.y})`}>
          <circle r={p.r + 18} fill="currentColor" opacity=".035" />
          <circle r={p.r} fill="currentColor" opacity=".09" stroke="currentColor" strokeOpacity=".14" />
          <circle cy="-8" r={p.r * .25} fill="currentColor" />
          <path d={`M-${p.r*.56} ${p.r*.68} Q0 ${p.r*.10} ${p.r*.56} ${p.r*.68}`} fill="currentColor" opacity=".85" />
          {i === 1 && <path d="M-13 -31h26" stroke="currentColor" strokeWidth="5" strokeLinecap="round" opacity=".45" />}
        </g>
      ))}
      <g transform="translate(274 38)">
        <rect width="110" height="54" rx="16" fill="currentColor" opacity=".10" stroke="currentColor" strokeOpacity=".16" />
        <circle cx="22" cy="27" r="7" fill="currentColor" />
        <path d="M38 27h43" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".25" />
        <circle cx="88" cy="27" r="7" fill="currentColor" opacity=".3" />
      </g>
      <circle cx="166" cy="72" r="5" fill="currentColor" opacity=".35" />
      <circle cx="452" cy="78" r="4" fill="currentColor" opacity=".3" />
    </svg>
  );
}

function CyclingIllustration() {
  return (
    <svg viewBox="0 0 620 300" className="h-full w-full" aria-label="RUN cycling illustration" role="img">
      <defs>
        <linearGradient id="bikeTrail" x1="0" x2="1">
          <stop offset="0" stopColor="currentColor" stopOpacity="0" />
          <stop offset=".5" stopColor="currentColor" stopOpacity=".35" />
          <stop offset="1" stopColor="currentColor" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path d="M44 238h532" stroke="currentColor" strokeWidth="3" opacity=".18" />
      <path d="M40 202 C138 130 228 238 325 152 S486 112 580 176" fill="none" stroke="url(#bikeTrail)" strokeWidth="30" strokeLinecap="round" />
      <path d="M40 202 C138 130 228 238 325 152 S486 112 580 176" fill="none" stroke="currentColor" strokeWidth="2.5" strokeDasharray="9 13" opacity=".34" className="run-dash" />
      <g transform="translate(0 -2)" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="184" cy="214" r="57" strokeWidth="7" opacity=".9" />
        <circle cx="426" cy="214" r="57" strokeWidth="7" opacity=".9" />
        <path d="M184 214 260 126 329 214 184 214 426 214 354 128 329 214" strokeWidth="7" />
        <path d="M260 126 293 111h31M354 128l23-34h35" strokeWidth="7" />
        <path d="M276 93c15-20 38-30 62-24l24 7" strokeWidth="8" />
        <circle cx="329" cy="214" r="13" fill="currentColor" stroke="none" opacity=".92" />
        <path d="M329 214 298 244M329 214l34 28" strokeWidth="5" />
      </g>
      <g transform="translate(430 38)">
        <rect width="122" height="56" rx="16" fill="currentColor" opacity=".10" stroke="currentColor" strokeOpacity=".16" />
        <text x="18" y="23" fontSize="9" fontWeight="700" fill="currentColor" opacity=".55">NEXT SPORT</text>
        <text x="18" y="43" fontSize="16" fontWeight="800" fill="currentColor">CYCLING</text>
      </g>
    </svg>
  );
}

function FeatureIllustration({ index }: { index: number }) {
  const scenes = [
    <svg viewBox="0 0 240 120" className="h-full w-full"><path d="M18 91 C60 62 78 104 113 76 S175 52 221 77" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 8" opacity=".28" /><path d="M22 98h80" stroke="currentColor" strokeWidth="2" opacity=".13" /><rect x="142" y="22" width="70" height="54" rx="14" fill="currentColor" opacity=".08" stroke="currentColor" strokeOpacity=".14" /><text x="155" y="43" fontSize="8" fontWeight="700" fill="currentColor" opacity=".5">DISTANCE</text><text x="155" y="63" fontSize="15" fontWeight="800" fill="currentColor">8.4 KM</text><circle cx="54" cy="46" r="17" fill="currentColor" opacity=".13" /><path d="M49 48l5-10 6 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" /></svg>,
    <svg viewBox="0 0 240 120" className="h-full w-full"><path d="M24 92h192" stroke="currentColor" strokeWidth="2" opacity=".12" /><path d="M38 76 78 61l42 16 42-38 42 20" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" opacity=".7" /><circle cx="78" cy="61" r="5" fill="currentColor" /><circle cx="120" cy="77" r="5" fill="currentColor" /><circle cx="162" cy="39" r="5" fill="currentColor" /><rect x="29" y="25" width="54" height="24" rx="12" fill="currentColor" opacity=".08" /><text x="42" y="41" fontSize="8" fontWeight="700" fill="currentColor">PLAN</text></svg>,
    <svg viewBox="0 0 240 120" className="h-full w-full"><path d="M16 92 C48 48 74 108 106 62 S166 35 220 72" fill="none" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity=".08" /><path d="M16 92 C48 48 74 108 106 62 S166 35 220 72" fill="none" stroke="currentColor" strokeWidth="3" strokeDasharray="6 8" opacity=".7" className="run-dash" /><circle cx="48" cy="48" r="7" fill="currentColor" /><circle cx="166" cy="38" r="7" fill="currentColor" opacity=".45" /></svg>,
    <svg viewBox="0 0 240 120" className="h-full w-full"><rect x="42" y="23" width="76" height="76" rx="22" fill="currentColor" opacity=".08" stroke="currentColor" strokeOpacity=".15" /><circle cx="80" cy="61" r="24" fill="none" stroke="currentColor" strokeWidth="5" opacity=".75" /><path d="M80 39v22l14 8" stroke="currentColor" strokeWidth="4" strokeLinecap="round" /><path d="M139 62h67" stroke="currentColor" strokeWidth="3" strokeDasharray="6 8" opacity=".25" /></svg>,
    <svg viewBox="0 0 240 120" className="h-full w-full"><circle cx="66" cy="60" r="30" fill="currentColor" opacity=".08" stroke="currentColor" strokeOpacity=".16" /><path d="M66 38 73 53l17 2-13 11 4 17-15-9-15 9 4-17-13-11 17-2Z" fill="currentColor" opacity=".75" /><path d="M118 80 149 50l27 20 43-47" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".55" /><circle cx="149" cy="50" r="5" fill="currentColor" /></svg>,
    <svg viewBox="0 0 240 120" className="h-full w-full"><circle cx="64" cy="50" r="18" fill="currentColor" opacity=".14" /><circle cx="64" cy="46" r="7" fill="currentColor" /><path d="M47 74q17-22 34 0" fill="currentColor" /><circle cx="125" cy="61" r="25" fill="currentColor" opacity=".08" stroke="currentColor" strokeOpacity=".16" /><circle cx="125" cy="56" r="8" fill="currentColor" opacity=".7" /><path d="M102 83q23-29 46 0" fill="currentColor" opacity=".7" /><path d="M88 61h12M153 61h36" stroke="currentColor" strokeWidth="3" strokeLinecap="round" opacity=".3" /></svg>,
  ];
  return (
    <div className="relative h-28 overflow-hidden rounded-2xl bg-primary/5 text-primary">
      <div className="absolute inset-0 opacity-50 [background-image:radial-gradient(circle_at_20%_20%,currentColor_1px,transparent_1px)] [background-size:18px_18px]" />
      <div className="relative h-full transition-transform duration-500 group-hover:scale-[1.04]">{scenes[index]}</div>
      <span className="absolute right-5 top-4 size-2 rounded-full bg-primary animate-pulse motion-reduce:animate-none" />
    </div>
  );
}

export function PublicWebsite() {
  const [language,setLanguage]=useState<"en"|"es">("en");
  const tr=(s:string)=>language==="en"?(EN[s]??s):s;
  const changeLanguage=(v:"en"|"es")=>{setLanguage(v);try{localStorage.setItem("run-language",v)}catch{}};
  useEffect(()=>{try{const v=localStorage.getItem("run-language");if(v==="en"||v==="es")setLanguage(v)}catch{}},[]);
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
        @keyframes runLogoEntrance { 0% { opacity: 0; transform: scale(.45) rotate(-18deg); } 55% { opacity: 1; transform: scale(1.16) rotate(5deg); } 100% { opacity: 1; transform: scale(1) rotate(0deg); } }
        @keyframes runFloat { 0%,100% { transform: translate3d(0,0,0) rotate(0deg); } 50% { transform: translate3d(0,-9px,0) rotate(1deg); } }
        @keyframes runPulse { 0%,100% { opacity:.35; transform:scale(1); } 50% { opacity:.75; transform:scale(1.12); } }
        @keyframes runDash { from { stroke-dashoffset: 0; } to { stroke-dashoffset: -70; } }
        .run-logo-entrance { animation: runLogoEntrance 900ms cubic-bezier(.2,.8,.2,1) both; transform-origin: center; }
        .run-float { animation: runFloat 5s ease-in-out infinite; }
        .run-pulse { animation: runPulse 3.5s ease-in-out infinite; }
        .run-dash { animation: runDash 8s linear infinite; }
        @media (prefers-reduced-motion: reduce) {
          html { scroll-behavior: auto; }
          .run-logo-entrance, .run-float, .run-pulse, .run-dash { animation: none !important; }
        }
      `}</style>

      <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur-xl">
        <div className="mx-auto flex h-18 max-w-7xl items-center justify-between px-5 lg:px-8">
          <a href="#inicio" className="flex items-center gap-2.5" aria-label="RUN inicio">
            <span className="run-logo-entrance size-11 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} />
            <span className="font-display text-2xl uppercase tracking-tight">run</span>
          </a>
          <nav className="hidden items-center gap-7 lg:flex">
            {nav.map(([label, href]) => <a key={label} href={href} className="text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground">{tr(label)}</a>)}
          </nav>
          <div className="hidden items-center gap-2 lg:flex">
            <select aria-label="Language" value={language} onChange={e=>changeLanguage(e.target.value as "en"|"es")} className="rounded-lg bg-transparent px-3 py-2.5 text-sm font-semibold text-muted-foreground outline-none"><option value="en">EN</option><option value="es">ES</option></select>
            <Link to="/app" className="rounded-lg px-4 py-2.5 text-sm font-semibold">{tr("Iniciar sesión")}</Link>
            <a href="#descarga" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-lg">{tr("Crear cuenta")}</a>
          </div>
          <button className="flex size-11 items-center justify-center rounded-lg border lg:hidden" onClick={() => setMenu(!menu)} aria-label="Abrir menú" aria-expanded={menu}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && <div className="border-t bg-background px-5 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)} className="rounded-lg px-3 py-3 font-semibold hover:bg-muted">{tr(label)}</a>)}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/app" className="rounded-lg border px-4 py-3 text-center font-semibold">{tr("Iniciar sesión")}</Link>
              <a href="#descarga" onClick={() => setMenu(false)} className="rounded-lg bg-primary px-4 py-3 text-center font-bold text-primary-foreground">{tr("Crear cuenta")}</a>
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
              Tu entrenamiento.<br /><span className="text-primary">{tr("Tu progreso.")}</span><br />Tu camino.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              RUN reúne tus actividades, entrenamiento, objetivos, rutas, dispositivos y comunidad en una experiencia creada para corredores.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#descarga" className="group inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-all hover:-translate-y-1 hover:shadow-xl">{tr("Crear cuenta gratis")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
              <a href="#funciones" className="rounded-xl border bg-card px-6 py-3.5 font-bold transition-all hover:-translate-y-0.5 hover:bg-muted">{tr("Conocer RUN")}</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Privacidad y control</span>
              <span className="flex items-center gap-2"><Smartphone className="size-4 text-primary" /> {tr("Web + móvil")}</span>
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
                    <p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Tu entrenamiento")}</p>
                    <div className="rounded-2xl border p-5">
                      <div className="flex items-center gap-3"><div className="rounded-xl bg-primary/10 p-3"><Footprints className="text-primary" /></div><div><p className="font-bold">Carrera</p><p className="text-xs text-muted-foreground">Actividad registrada</p></div></div>
                      <div className="mt-5 grid grid-cols-3 gap-2">
                        <div><p className="text-[10px] uppercase text-muted-foreground">Distancia</p><p className="mt-1 font-display text-xl">8.4 km</p></div>
                        <div><p className="text-[10px] uppercase text-muted-foreground">Tiempo</p><p className="mt-1 font-display text-xl">42:18</p></div>
                        <div><p className="text-[10px] uppercase text-muted-foreground">Ritmo</p><p className="mt-1 font-display text-xl">5:02</p></div>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="rounded-2xl border p-4 transition-transform hover:-translate-y-1"><Map className="mb-4 size-5 text-primary" /><p className="font-bold">{tr("Rutas")}</p><p className="mt-1 text-xs text-muted-foreground">Tus recorridos</p></div>
                      <div className="rounded-2xl border p-4 transition-transform hover:-translate-y-1"><Trophy className="mb-4 size-5 text-primary" /><p className="font-bold">{tr("Challenges")}</p><p className="mt-1 text-xs text-muted-foreground">{tr("Sigue avanzando")}</p></div>
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
          {([["Entrena", "Organize your journey", Dumbbell], ["Registra", "Keep every session", Activity], ["Progresa", "Track your progress", Zap], ["Conecta", "Run together", Users]] as const).map(([title, text, Icon]) => (
            <div key={tr(title as string)} className="group flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-xl bg-primary/10 text-primary transition-transform group-hover:scale-110"><Icon className="size-4" /></span>
              <div><p className="font-bold">{title as string}</p><p className="text-sm text-muted-foreground">{tr(text as string)}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section id="funciones" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Everything in one place")}</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Tools to help you run better")}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{tr("The platform grows with you, from your first run to your next big goals.")}</p></div>
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
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Para deportistas")}</p>
            <h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Empieza donde estás. Avanza hacia donde quieres llegar.")}</h2>
            <p className="mt-5 max-w-xl text-lg leading-8 opacity-70">{tr("RUN is designed to support you whether you are just starting, training for health or preparing for a new personal best.")}</p>
            <a href="#descarga" className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-all hover:-translate-y-1">Empezar con RUN <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
          </Reveal>
          <Reveal delay={120}>
            <div className="relative mx-auto w-full max-w-xl text-primary">
              <div className="absolute inset-10 rounded-full bg-primary/10 blur-3xl" />
              <div className="relative rounded-[2rem] border border-background/10 bg-background/5 p-4">
                <div className="h-72 sm:h-80"><RunnerIllustration /></div>
                <div className="grid grid-cols-2 gap-3">
                  {[tr("Principiantes"), tr("Corredores recreativos"), tr("Corredores competitivos"), tr("Preparación de carreras")].map((x) => <div key={x} className="rounded-xl border border-background/10 bg-background/5 p-4 text-sm font-semibold transition-transform hover:-translate-y-1"><Check className="mb-3 size-4 text-primary" />{x}</div>)}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="entrenadores" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Para entrenadores")}</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Entrena. Acompaña. Haz crecer a tus atletas.")}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{tr("RUN is also designed for professionals who want to centralize their relationship with athletes.")}</p><a href="#descarga" className="group mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground transition-all hover:-translate-y-1">{tr("Soy entrenador")} <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" /></a>
            <div className="mt-10 h-44 max-w-md text-primary opacity-80"><svg viewBox="0 0 520 220" className="h-full w-full"><path d="M30 184h460" stroke="currentColor" strokeWidth="2" opacity=".15" /><path d="M55 158 145 116l76 31 91-75 104 34" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /><circle cx="145" cy="116" r="7" fill="currentColor" /><circle cx="221" cy="147" r="7" fill="currentColor" /><circle cx="312" cy="72" r="7" fill="currentColor" /><circle cx="416" cy="106" r="7" fill="currentColor" /><path d="M55 158 145 116 221 147 312 72 416 106" fill="none" stroke="currentColor" strokeWidth="14" opacity=".07" /></svg></div>
          </Reveal>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Plans & sessions", "Athlete tracking", "Communication", "Professional profile"].map((x, i) => (
              <Reveal key={x} delay={i * 70}>
                <div className="group h-full rounded-2xl border bg-card p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="mb-7 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary transition-all group-hover:bg-primary group-hover:text-primary-foreground">{i === 0 ? <Dumbbell className="size-5" /> : i === 1 ? <Activity className="size-5" /> : i === 2 ? <Radio className="size-5" /> : <ShieldCheck className="size-5" />}</div>
                  <h3 className="font-display text-xl uppercase">{x}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{["Organize your athletes' training.", "Keep training information centralized.", "Stay connected with your athletes.", "Showcase your experience and specialties."][i]}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <Reveal>
            <div className="mx-auto max-w-2xl text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><ShieldCheck /></div><p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">{tr("Confianza")}</p><h2 className="mt-2 font-display text-4xl uppercase">{tr("Entrenadores verificados")}</h2><p className="mt-4 leading-7 text-muted-foreground">{tr("The badge identifies profiles that have completed RUN's review process.")}</p></div>
          </Reveal>
          <Reveal delay={100}>
            <div className="mx-auto mt-10 max-w-md rounded-2xl border bg-card p-6 shadow-sm transition-transform hover:-translate-y-1 hover:shadow-xl">
              <div className="flex items-center gap-4"><div className="flex size-14 items-center justify-center rounded-full bg-muted font-display text-lg">CR</div><div><p className="font-bold">Carlos Rodríguez</p><p className="flex items-center gap-1 text-xs font-semibold text-primary"><ShieldCheck className="size-3.5" /> {tr("Entrenador verificado")}</p></div></div>
              <div className="mt-6 flex flex-wrap gap-2">{["Running", "Marathon", "Trail"].map(x => <span key={x} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{x}</span>)}</div>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="comunidad" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="grid items-center gap-10 rounded-3xl border bg-card p-8 shadow-sm sm:p-12 lg:grid-cols-[1fr_.9fr] lg:p-16">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Comunidad")}</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">{tr("Corre acompañado.")}</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">{tr("Join challenges, earn achievements, collect points and find new reasons to keep moving.")}</p>
            <div className="mt-8 grid grid-cols-3 gap-3">{[["Challenges", Trophy], ["Logros", Target], ["Puntos", Zap]].map(([x, Icon]) => <div key={tr(x as string)} className="rounded-2xl bg-muted/50 p-4 text-center"><Icon className="mx-auto mb-4 size-5 text-primary" /><p className="font-display text-lg uppercase">{x as string}</p></div>)}</div>
          </Reveal>
          <Reveal delay={120} className="text-primary">
            <div className="h-56 sm:h-64"><CommunityIllustration /></div>
          </Reveal>
        </div>
      </section>

      <section className="overflow-hidden bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl items-center gap-8 px-5 py-16 lg:grid-cols-[1fr_.8fr] lg:px-8">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-widest opacity-70">{tr("Próximamente")}</p><h2 className="mt-2 font-display text-4xl uppercase">{tr("RUN también llegará al ciclismo.")}</h2><p className="mt-3 max-w-2xl opacity-80">{tr("We are preparing the next evolution of RUN to expand your sports experience.")}</p>
            <button className="mt-7 rounded-xl bg-foreground px-6 py-3.5 font-bold text-background transition-all hover:-translate-y-1">{tr("Avísame cuando esté disponible")}</button>
          </Reveal>
          <Reveal delay={100} className="text-primary-foreground">
            <div className="run-float h-48"><CyclingIllustration /></div>
          </Reveal>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <Reveal>
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Planes")}</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">{tr("Empieza gratis. Crece cuando quieras.")}</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">{tr("A clear experience to get started, with additional options for those who want to go deeper into their training.")}</p></div>
        </Reveal>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          {[["Free", "RUN Free", ["Activity tracking", "Basic statistics", "Plans & goals", "Goals & achievements", "Community features"], false], ["Premium", "RUN+", ["Everything in Free", "Advanced features", "Personalized plans", "Advanced analytics", "Ad-free experience*"], true]].map(([eyebrow, title, items, featured], i) => (
            <Reveal key={title as string} delay={i * 100}>
              <div className={`relative h-full rounded-2xl border ${featured ? "border-2 border-primary shadow-xl shadow-primary/10" : "bg-card"} p-7 transition-transform hover:-translate-y-2`}>
                {featured && <span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground">{tr("Recomendado")}</span>}
                <p className={`text-sm font-bold uppercase tracking-wider ${featured ? "text-primary" : "text-muted-foreground"}`}>{eyebrow as string}</p><h3 className="mt-3 font-display text-3xl uppercase">{title as string}</h3>
                <ul className="mt-7 space-y-3 text-sm">{(items as string[]).map(x => <li key={x} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{x}</li>)}</ul>
                <a href="#descarga" className={`mt-8 block rounded-xl px-5 py-3 text-center font-bold transition-all hover:-translate-y-0.5 ${featured ? "bg-primary text-primary-foreground" : "border"}`}>{featured ? "Explore RUN+" : "Start free"}</a>
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
            <p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Descarga RUN")}</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">{tr("Lleva RUN contigo.")}</h2><p className="mt-5 max-w-xl text-lg leading-8 opacity-70">{tr("Start recording your runs and building your journey wherever you are.")}</p><div className="mt-8 flex flex-wrap gap-3"><button className="transition-all hover:-translate-y-1 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground"><Download className="mr-2 inline size-4" /> Google Play</button><button className="transition-all hover:-translate-y-1 rounded-xl border border-background/20 px-6 py-3.5 font-bold"><Download className="mr-2 inline size-4" /> App Store</button></div>
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
          <div className="text-center"><p className="text-xs font-bold uppercase tracking-widest text-primary">{tr("Ayuda")}</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">{tr("Preguntas frecuentes")}</h2></div>
        </Reveal>
        <div className="mt-10 divide-y rounded-2xl border bg-card">
          {faqs.map(([q, a], i) => <div key={q}><button className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-bold" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}><span>{tr(q)}</span><ChevronDown className={`size-5 shrink-0 transition-transform duration-300 ${faq === i ? "rotate-180 text-primary" : ""}`} /></button>{faq === i && <div className="px-5 pb-5 leading-7 text-muted-foreground">{tr(a)}</div>}</div>)}
        </div>
      </section>

      <footer className="border-t bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-12 sm:grid-cols-2 lg:grid-cols-[1.5fr_1fr_1fr_1fr] lg:px-8">
          <div><div className="flex items-center gap-2"><span className="run-logo-entrance size-8 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} /><span className="font-display text-xl uppercase">run</span></div><p className="mt-4 max-w-xs text-sm leading-6 text-muted-foreground">{tr("Entrena. Progresa. Conecta.")}</p></div>
          <div><p className="font-bold">{tr("Producto")}</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#funciones" className="block hover:text-foreground">{tr("Funciones")}</a><a href="#planes" className="block hover:text-foreground">{tr("Planes")}</a><a href="#entrenadores" className="block hover:text-foreground">{tr("Entrenadores")}</a><a href="#comunidad" className="block hover:text-foreground">{tr("Comunidad")}</a></div></div>
          <div><p className="font-bold">{tr("Ayuda")}</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#faq" className="block hover:text-foreground">{tr("Preguntas frecuentes")}</a><a href="mailto:soporte@run.app" className="block hover:text-foreground">{tr("Contacto")}</a></div></div>
          <div><p className="font-bold">{tr("Legal")}</p><div className="mt-4 space-y-2 text-sm text-muted-foreground"><a href="#" className="block hover:text-foreground">{tr("Términos")}</a><a href="#" className="block hover:text-foreground">{tr("Privacidad")}</a><a href="#" className="block hover:text-foreground">{tr("Cookies")}</a></div></div>
        </div>
        <div className="border-t px-5 py-5 text-center text-xs text-muted-foreground">© {new Date().getFullYear()} RUN. Todos los derechos reservados.</div>
      </footer>
    </main>
  );
}
