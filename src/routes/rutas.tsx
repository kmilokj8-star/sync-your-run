import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Navigation, Route as RouteIcon, Trophy, Plus, Flame, Layers3 } from "lucide-react";
import { AppShell, TopBar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences";
import "leaflet/dist/leaflet.css";

export const Route = createFileRoute("/rutas")({
  head: () => ({ meta: [{ title: "Mapas y recorridos — RUN" }, { name: "description", content: "Explora tus trayectos, crea rutas y juega con el territorio de RUN." }] }),
  component: RoutesPage,
});

type Point = { x: number; y: number };
const samples = [
  { name: "Parque y lago", distance: "6.8 km", points: [{x:12,y:64},{x:22,y:54},{x:30,y:58},{x:42,y:38},{x:56,y:43},{x:68,y:30},{x:82,y:39},{x:76,y:58},{x:60,y:67},{x:42,y:62},{x:25,y:72},{x:12,y:64}] },
  { name: "Rodaje barrio", distance: "5.2 km", points: [{x:18,y:30},{x:30,y:24},{x:46,y:28},{x:54,y:45},{x:70,y:50},{x:78,y:67},{x:62,y:76},{x:45,y:68},{x:30,y:78},{x:18,y:62},{x:18,y:30}] },
];

function RoutesPage() {
  const { locale } = usePreferences();
  const mapRef = useRef<HTMLDivElement | null>(null);
  const es = locale === "es";
  const [selected, setSelected] = useState(0);
  const [builder, setBuilder] = useState(false);
  const [route, setRoute] = useState<Point[]>([]);
  const [territory, setTerritory] = useState(42);
  const selectedRoute = samples[selected]!;

  useEffect(() => {
    let map: import("leaflet").Map | undefined;
    let cancelled = false;
    const init = async () => {
      if (!mapRef.current) return;
      const L = await import("leaflet");
      if (cancelled || !mapRef.current) return;
      map = L.map(mapRef.current, { zoomControl: true, attributionControl: true }).setView([28.60, -81.30], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors", maxZoom: 19 }).addTo(map);
      const bounds = L.latLngBounds([[28.55, -81.38], [28.66, -81.22]]);
      map.fitBounds(bounds, { padding: [12, 12] });
    };
    void init();
    return () => { cancelled = true; map?.remove(); };
  }, []);
  const path = useMemo(() => selectedRoute.points.map((p) => `${p.x},${p.y}`).join(" "), [selectedRoute]);

  const addPoint = (e: React.MouseEvent<SVGSVGElement>) => {
    if (!builder) return;
    const rect = e.currentTarget.getBoundingClientRect();
    setRoute((r) => [...r, { x: ((e.clientX - rect.left) / rect.width) * 100, y: ((e.clientY - rect.top) / rect.height) * 100 }]);
  };

  return <AppShell>
    <div className="mx-auto max-w-6xl space-y-4 md:space-y-6">
      <TopBar />
      <header className="flex flex-wrap items-end justify-between gap-3 border-b pb-4">
        <div><p className="text-xs font-bold uppercase text-primary">RUN / MAP</p><h1 className="mt-1 font-display text-2xl uppercase md:text-4xl">{es ? "Mapas y recorridos" : "Maps & routes"}</h1><p className="mt-2 text-sm text-muted-foreground">{es ? "Convierte tus carreras en rutas, territorio y nuevos objetivos." : "Turn your runs into routes, territory and new goals."}</p></div>
        <Button onClick={() => { setBuilder(!builder); if (builder) setRoute([]); }}><Plus />{builder ? (es ? "Cerrar creador" : "Close builder") : (es ? "Crear recorrido" : "Create route")}</Button>
      </header>
      <section className="grid gap-3 md:grid-cols-4">
        <Stat icon={<RouteIcon />} label={es ? "Recorridos" : "Routes"} value="28" />
        <Stat icon={<Navigation />} label={es ? "Distancia" : "Distance"} value="184 km" />
        <Stat icon={<Layers3 />} label={es ? "Territorio" : "Territory"} value={`${territory}%`} />
        <Stat icon={<Flame />} label={es ? "Racha" : "Streak"} value="9 días" />
      </section>
      <section className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
        <div className="overflow-hidden rounded-md border bg-card">
          <div className="flex items-center justify-between border-b px-3 py-3"><div><p className="text-xs font-bold uppercase text-primary">{builder ? (es ? "Creador de recorrido" : "Route builder") : (es ? "Mapa de actividad" : "Activity map")}</p><h2 className="font-display uppercase">{builder ? (es ? "Dibuja tu próximo recorrido" : "Draw your next route") : selectedRoute.name}</h2></div><span className="font-mono text-xs text-muted-foreground">{builder ? `${route.length} pts` : selectedRoute.distance}</span></div>
          <div className="relative aspect-[16/10] bg-muted/30"><div ref={mapRef} className="absolute inset-0 z-0" />
            <svg viewBox="0 0 100 100" className="relative z-10 h-full w-full opacity-0" onClick={addPoint}>
              <defs><pattern id="grid" width="8" height="8" patternUnits="userSpaceOnUse"><path d="M 8 0 L 0 0 0 8" fill="none" stroke="currentColor" strokeOpacity=".08" strokeWidth=".35"/></pattern></defs>
              <rect width="100" height="100" fill="url(#grid)" />
              <path d="M5 18 C20 8 28 20 40 12 S70 18 95 8 M4 82 C22 72 35 92 54 82 S80 90 96 74 M8 48 C30 40 44 54 62 43 S82 50 94 44" fill="none" stroke="currentColor" strokeOpacity=".12" strokeWidth="4"/>
              {!builder && <polyline points={path} fill="none" stroke="hsl(var(--primary))" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />}
              {builder && route.length > 1 && <polyline points={route.map((p)=>`${p.x},${p.y}`).join(" ")} fill="none" stroke="hsl(var(--primary))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />}
              {(builder ? route : selectedRoute.points).map((p,i)=><circle key={i} cx={p.x} cy={p.y} r={i===0||i===(builder?route.length:selectedRoute.points.length)-1 ? 2 : .8} fill="hsl(var(--primary))" />)}
            </svg>
            {builder && <div className="absolute bottom-3 left-3 right-3 rounded-md border bg-background/90 p-3 text-xs">{es ? "Haz clic en el mapa para añadir puntos. Después podrás convertir el recorrido en entrenamiento." : "Click the map to add points. Then you can turn the route into a workout."}</div>}
          </div>
        </div>
        <aside className="space-y-3">
          <section className="rounded-md border bg-card p-4"><h2 className="font-display uppercase">{es ? "Tus recorridos" : "Your routes"}</h2><div className="mt-3 space-y-2">{samples.map((r,i)=><button key={r.name} onClick={()=>setSelected(i)} className={`flex w-full items-center justify-between rounded-md border p-3 text-left ${selected===i && !builder ? "border-primary bg-primary/5" : "hover:bg-muted/50"}`}><span><span className="block text-sm font-semibold">{r.name}</span><span className="text-xs text-muted-foreground">{r.distance} · {i ? "14" : "21"} actividades</span></span><RouteIcon className="size-4 text-primary" /></button>)}</div></section>
          <section className="rounded-md border border-primary/30 bg-primary/5 p-4"><div className="flex gap-3"><Trophy className="size-5 text-primary" /><div><h2 className="font-display uppercase">{es ? "Modo territorio" : "Territory mode"}</h2><p className="mt-1 text-xs text-muted-foreground">{es ? "Inspirado en INTVL: tus recorridos pueden convertirse en territorio, retos y objetivos sociales. RUN lo integrará con tus actividades reales." : "Inspired by INTVL: routes can become territory, challenges and social goals tied to your real activities."}</p></div></div><div className="mt-3 h-2 overflow-hidden rounded-full bg-muted"><div className="h-full rounded-full bg-primary" style={{width:`${territory}%`}} /></div><p className="mt-2 text-xs font-semibold">{territory}% {es ? "de tu zona explorada" : "of your area explored"}</p></section>
          {builder && <Button className="w-full" disabled={route.length<2} onClick={()=>{ setTerritory((v)=>Math.min(100,v+3)); setBuilder(false); setRoute([]); }}>{es ? "Guardar recorrido" : "Save route"}</Button>}
        </aside>
      </section>
    </div>
  </AppShell>;
}
function Stat({icon,label,value}:{icon:ReactNode;label:string;value:string}) {
  return <div className="rounded-md border bg-card p-3"><div className="flex items-center gap-2 text-primary">{icon}<span className="text-[10px] font-bold uppercase text-muted-foreground">{label}</span></div><p className="mt-1 font-mono text-xl font-semibold">{value}</p></div>;
}