import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import {
  Activity, ArrowRight, Check, ChevronDown, CircleCheck, Download, Dumbbell,
  Footprints, HeartPulse, Map, Menu, ShieldCheck, Smartphone, Trophy, Users, Watch, X
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

function PublicWebsite() {
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
            <Link to="/" className="rounded-lg px-4 py-2.5 text-sm font-semibold">Iniciar sesión</Link>
            <a href="#descarga" className="rounded-lg bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground shadow-sm transition-transform hover:-translate-y-0.5">Crear cuenta</a>
          </div>
          <button className="flex size-11 items-center justify-center rounded-lg border lg:hidden" onClick={() => setMenu(!menu)} aria-label="Abrir menú" aria-expanded={menu}>
            {menu ? <X /> : <Menu />}
          </button>
        </div>
        {menu && <div className="border-t bg-background px-5 py-4 lg:hidden">
          <nav className="mx-auto flex max-w-7xl flex-col gap-1">
            {nav.map(([label, href]) => <a key={label} href={href} onClick={() => setMenu(false)} className="rounded-lg px-3 py-3 font-semibold hover:bg-muted">{label}</a>)}
            <div className="mt-2 grid grid-cols-2 gap-2">
              <Link to="/" className="rounded-lg border px-4 py-3 text-center font-semibold">Iniciar sesión</Link>
              <a href="#descarga" onClick={() => setMenu(false)} className="rounded-lg bg-primary px-4 py-3 text-center font-bold text-primary-foreground">Crear cuenta</a>
            </div>
          </nav>
        </div>}
      </header>

      <section id="inicio" className="relative">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-20 pt-16 lg:grid-cols-[1fr_.9fr] lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border bg-card px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-primary">
              <CircleCheck className="size-4" /> Para corredores
            </div>
            <h1 className="max-w-3xl font-display text-5xl uppercase leading-[.95] tracking-tight sm:text-6xl lg:text-7xl">
              Tu entrenamiento.<br /><span className="text-primary">Tu progreso.</span><br />Tu camino.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-muted-foreground">
              RUN reúne tus actividades, entrenamiento, objetivos, rutas, dispositivos y comunidad en una experiencia creada para corredores.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="#descarga" className="inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground shadow-lg shadow-primary/20 transition-transform hover:-translate-y-0.5">Crear cuenta gratis <ArrowRight className="size-4" /></a>
              <a href="#funciones" className="rounded-xl border bg-card px-6 py-3.5 font-bold transition-colors hover:bg-muted">Conocer RUN</a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-5 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><ShieldCheck className="size-4 text-primary" /> Privacidad y control</span>
              <span className="flex items-center gap-2"><Smartphone className="size-4 text-primary" /> Web + móvil</span>
            </div>
          </div>
          <div className="relative mx-auto w-full max-w-lg">
            <div className="absolute -inset-8 rounded-full bg-primary/10 blur-3xl" />
            <div className="relative rounded-[2.2rem] border bg-card p-3 shadow-2xl shadow-foreground/10">
              <div className="overflow-hidden rounded-[1.7rem] border bg-background">
                <div className="flex items-center justify-between border-b px-5 py-4">
                  <span className="font-display text-lg uppercase">run</span>
                  <span className="size-2.5 rounded-full bg-primary" />
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
                    <div className="rounded-2xl border p-4"><Map className="mb-4 size-5 text-primary" /><p className="font-bold">Rutas</p><p className="mt-1 text-xs text-muted-foreground">Tus recorridos</p></div>
                    <div className="rounded-2xl border p-4"><Trophy className="mb-4 size-5 text-primary" /><p className="font-bold">Retos</p><p className="mt-1 text-xs text-muted-foreground">Sigue avanzando</p></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y bg-muted/30">
        <div className="mx-auto grid max-w-7xl gap-4 px-5 py-7 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {[
            ["Entrena", "Organiza tu camino"],
            ["Registra", "Conserva cada sesión"],
            ["Progresa", "Mide tu evolución"],
            ["Conecta", "Corre acompañado"],
          ].map(([title, text]) => <div key={title} className="flex items-center gap-3"><span className="size-2.5 rounded-full bg-primary" /><div><p className="font-bold">{title}</p><p className="text-sm text-muted-foreground">{text}</p></div></div>)}
        </div>
      </section>

      <section id="funciones" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">Todo en un solo lugar</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Herramientas para correr mejor</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">La plataforma crece contigo, desde tu primera carrera hasta tus próximos grandes objetivos.</p></div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {features.map(([Icon, title, text]) => <article key={title as string} className="group rounded-2xl border bg-card p-6 transition-all hover:-translate-y-1 hover:shadow-lg">
            <div className="mb-8 flex size-12 items-center justify-center rounded-xl bg-primary/10 text-primary transition-colors group-hover:bg-primary group-hover:text-primary-foreground"><Icon className="size-6" /></div>
            <h3 className="font-display text-xl uppercase">{title as string}</h3><p className="mt-3 leading-7 text-muted-foreground">{text as string}</p>
          </article>)}
        </div>
      </section>

      <section id="deportistas" className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-20 lg:grid-cols-2 lg:px-8 lg:py-24">
          <div><p className="text-xs font-bold uppercase tracking-widest text-primary">Para deportistas</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Empieza donde estás. Avanza hacia donde quieres llegar.</h2><p className="mt-5 max-w-xl text-lg leading-8 opacity-70">RUN está pensado para acompañarte sin importar si estás empezando, entrenando por salud o preparando una nueva marca.</p><a href="#descarga" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground">Empezar con RUN <ArrowRight className="size-4" /></a></div>
          <div className="grid gap-3 sm:grid-cols-2">
            {["Principiantes", "Corredores recreativos", "Corredores competitivos", "Preparación de carreras"].map((x) => <div key={x} className="rounded-2xl border border-background/15 bg-background/5 p-5"><Check className="mb-8 size-5 text-primary" /><p className="font-bold">{x}</p></div>)}
          </div>
        </div>
      </section>

      <section id="entrenadores" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
          <div><p className="text-xs font-bold uppercase tracking-widest text-primary">Para entrenadores</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Entrena. Acompaña. Haz crecer a tus atletas.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">RUN también está pensado para profesionales que quieren centralizar su relación con sus deportistas.</p><a href="#descarga" className="mt-8 inline-flex items-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground">Soy entrenador <ArrowRight className="size-4" /></a></div>
          <div className="grid gap-4 sm:grid-cols-2">
            {["Planes y sesiones", "Seguimiento de atletas", "Comunicación", "Perfil profesional"].map((x, i) => <div key={x} className="rounded-2xl border bg-card p-6"><div className="mb-7 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary"><Dumbbell className="size-5" /></div><h3 className="font-display text-xl uppercase">{x}</h3><p className="mt-2 text-sm leading-6 text-muted-foreground">{["Organiza el trabajo de tus atletas.", "Ten la información de entrenamiento centralizada.", "Mantén el contacto con tus deportistas.", "Presenta tu experiencia y especialidades."][i]}</p></div>)}
          </div>
        </div>
      </section>

      <section className="bg-muted/30">
        <div className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center"><div className="mx-auto flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary"><ShieldCheck /></div><p className="mt-5 text-xs font-bold uppercase tracking-widest text-primary">Confianza</p><h2 className="mt-2 font-display text-4xl uppercase">Entrenadores verificados</h2><p className="mt-4 leading-7 text-muted-foreground">La insignia identifica los perfiles que han pasado por el proceso de revisión de RUN.</p></div>
          <div className="mx-auto mt-10 max-w-md rounded-2xl border bg-card p-6 shadow-sm">
            <div className="flex items-center gap-4"><div className="flex size-14 items-center justify-center rounded-full bg-muted font-display text-lg">CR</div><div><p className="font-bold">Carlos Rodríguez</p><p className="flex items-center gap-1 text-xs font-semibold text-primary"><ShieldCheck className="size-3.5" /> Entrenador verificado</p></div></div>
            <div className="mt-6 flex flex-wrap gap-2">{["Running", "Maratón", "Trail"].map(x => <span key={x} className="rounded-full bg-muted px-3 py-1 text-xs font-semibold">{x}</span>)}</div>
          </div>
        </div>
      </section>

      <section id="comunidad" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-24">
        <div className="rounded-3xl border bg-card p-8 shadow-sm sm:p-12 lg:p-16">
          <div className="max-w-2xl"><p className="text-xs font-bold uppercase tracking-widest text-primary">Comunidad</p><h2 className="mt-3 font-display text-4xl uppercase leading-tight sm:text-5xl">Corre acompañado.</h2><p className="mt-5 text-lg leading-8 text-muted-foreground">Participa en retos, consigue logros, acumula puntos y encuentra nuevas razones para mantenerte en movimiento.</p></div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">{["Retos", "Logros", "Puntos"].map((x, i) => <div key={x} className="rounded-2xl bg-muted/50 p-5"><Trophy className="mb-6 text-primary" /><p className="font-display text-xl uppercase">{x}</p><p className="mt-2 text-sm text-muted-foreground">{["Nuevos objetivos para mantener la motivación.", "Celebra los hitos que alcanzas.", "Convierte tu constancia en progreso visible."][i]}</p></div>)}</div>
        </div>
      </section>

      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-8 px-5 py-16 sm:flex-row sm:items-center lg:px-8">
          <div><p className="text-xs font-bold uppercase tracking-widest opacity-70">Próximamente</p><h2 className="mt-2 font-display text-4xl uppercase">RUN también llegará al ciclismo.</h2><p className="mt-3 max-w-2xl opacity-80">Estamos preparando la próxima evolución de RUN para ampliar la experiencia deportiva.</p></div>
          <button className="shrink-0 rounded-xl bg-foreground px-6 py-3.5 font-bold text-background transition-transform hover:-translate-y-0.5">Avísame cuando esté disponible</button>
        </div>
      </section>

      <section id="planes" className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="text-center"><p className="text-xs font-bold uppercase tracking-widest text-primary">Planes</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Empieza gratis. Crece cuando quieras.</h2><p className="mx-auto mt-4 max-w-2xl text-muted-foreground">Una experiencia clara para comenzar, con opciones adicionales para quienes quieren profundizar en su entrenamiento.</p></div>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4 md:grid-cols-2">
          <div className="rounded-2xl border bg-card p-7"><p className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Gratis</p><h3 className="mt-3 font-display text-3xl uppercase">RUN Free</h3><ul className="mt-7 space-y-3 text-sm">{["Registro de actividades", "Estadísticas básicas", "Planes y objetivos", "Metas y logros", "Funciones de comunidad"].map(x => <li key={x} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{x}</li>)}</ul><a href="#descarga" className="mt-8 block rounded-xl border px-5 py-3 text-center font-bold">Comenzar gratis</a></div>
          <div className="relative rounded-2xl border-2 border-primary bg-card p-7 shadow-xl shadow-primary/10"><span className="absolute right-5 top-5 rounded-full bg-primary px-3 py-1 text-[10px] font-bold uppercase text-primary-foreground">Recomendado</span><p className="text-sm font-bold uppercase tracking-wider text-primary">Premium</p><h3 className="mt-3 font-display text-3xl uppercase">RUN+</h3><ul className="mt-7 space-y-3 text-sm">{["Todo lo incluido en Free", "Funciones avanzadas", "Planes personalizados", "Analíticas ampliadas", "Experiencia sin anuncios*"].map(x => <li key={x} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{x}</li>)}</ul><a href="#descarga" className="mt-8 block rounded-xl bg-primary px-5 py-3 text-center font-bold text-primary-foreground">Conocer RUN+</a></div>
        </div>
        <p className="mx-auto mt-4 max-w-4xl text-center text-xs text-muted-foreground">* Las funciones concretas y precios de suscripción quedan sujetos a la configuración comercial vigente.</p>
      </section>

      <section id="descarga" className="bg-foreground text-background">
        <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 py-20 lg:grid-cols-[1fr_auto] lg:px-8 lg:py-24">
          <div><p className="text-xs font-bold uppercase tracking-widest text-primary">Descarga RUN</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Lleva RUN contigo.</h2><p className="mt-5 max-w-xl text-lg leading-8 opacity-70">Empieza a registrar tus carreras y a construir tu camino desde donde estés.</p><div className="mt-8 flex flex-wrap gap-3"><button className="rounded-xl bg-primary px-6 py-3.5 font-bold text-primary-foreground"><Download className="mr-2 inline size-4" /> Google Play</button><button className="rounded-xl border border-background/20 px-6 py-3.5 font-bold"><Download className="mr-2 inline size-4" /> App Store</button></div></div>
          <div className="flex size-40 items-center justify-center rounded-2xl bg-background p-3 text-foreground"><div className="grid size-full place-items-center rounded-xl border-2 border-dashed"><Smartphone className="size-12 text-primary" /><span className="mt-1 text-[9px] font-bold uppercase">QR</span></div></div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-4xl px-5 py-20 lg:py-24">
        <div className="text-center"><p className="text-xs font-bold uppercase tracking-widest text-primary">Ayuda</p><h2 className="mt-3 font-display text-4xl uppercase sm:text-5xl">Preguntas frecuentes</h2></div>
        <div className="mt-10 divide-y rounded-2xl border bg-card">
          {faqs.map(([q, a], i) => <div key={q}><button className="flex w-full items-center justify-between gap-5 px-5 py-5 text-left font-bold" onClick={() => setFaq(faq === i ? null : i)} aria-expanded={faq === i}><span>{q}</span><ChevronDown className={`size-5 shrink-0 transition-transform ${faq === i ? "rotate-180 text-primary" : ""}`} /></button>{faq === i && <div className="px-5 pb-5 leading-7 text-muted-foreground">{a}</div>}</div>)}
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
