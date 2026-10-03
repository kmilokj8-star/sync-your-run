import { Link } from "@tanstack/react-router";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, Crosshair, Loader2, Lock, MapPin, Route as RouteIcon, Sparkles, Star } from "lucide-react";
import { toast } from "sonner";
import { AppShell, TopBar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences";
import { useStored } from "@/lib/run-store";
import { useSubscription } from "@/lib/subscription";
import "leaflet/dist/leaflet.css";

type LatLng = [number, number];
type Loop = { coords: LatLng[]; km: number };
type SavedLoop = { start: LatLng; loop: Loop; savedAt: string };
const FIRST_USE_KEY = "run_distance_first_use_v1";
const START_KEY = "run_distance_start_v1";
const FAVORITE_KEY = "run_distance_favorite_v1";
const FREE_DAYS = 30;
const PRESETS = [3, 5, 8, 10, 15, 21.1];
const COLORS = ["var(--primary)", "#38bdf8", "#f97316"];

function offset([lat, lng]: LatLng, dxKm: number, dyKm: number): LatLng {
  return [lat + dyKm / 111, lng + dxKm / (111 * Math.cos((lat * Math.PI) / 180))];
}
function hav(a: LatLng, b: LatLng) {
  const R = 6371, r = Math.PI / 180;
  const dLat = (b[0] - a[0]) * r, dLng = (b[1] - a[1]) * r;
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(a[0] * r) * Math.cos(b[0] * r) * Math.sin(dLng / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}
function waypoints(start: LatLng, radius: number, bearing: number): LatLng[] {
  const b = (bearing * Math.PI) / 180;
  const center = offset(start, radius * Math.sin(b), radius * Math.cos(b));
  const base = b + Math.PI; // angle from center back to start
  return [start, ...[1, 2, 3].map((k) => { const a = base + (k * Math.PI) / 2; return offset(center, radius * Math.sin(a), radius * Math.cos(a)); }), start];
}
async function routeLoop(start: LatLng, radius: number, bearing: number): Promise<Loop> {
  const wps = waypoints(start, radius, bearing);
  try {
    const q = wps.map(([la, ln]) => `${ln.toFixed(6)},${la.toFixed(6)}`).join(";");
    const res = await fetch(`https://routing.openstreetmap.de/routed-foot/route/v1/foot/${q}?overview=full&geometries=geojson`);
    if (!res.ok) throw new Error(String(res.status));
    const json = await res.json();
    const r = json.routes?.[0];
    if (!r) throw new Error("no route");
    return { coords: r.geometry.coordinates.map(([ln, la]: number[]) => [la, ln] as LatLng), km: r.distance / 1000 };
  } catch {
    const coords: LatLng[] = [];
    for (let i = 0; i < wps.length - 1; i++) for (let s = 0; s < 6; s++) {
      const a = wps[i]!, c = wps[i + 1]!;
      coords.push([a[0] + ((c[0] - a[0]) * s) / 6, a[1] + ((c[1] - a[1]) * s) / 6]);
    }
    coords.push(start);
    return { coords, km: coords.slice(1).reduce((s, p, i) => s + hav(coords[i]!, p), 0) };
  }
}
async function buildLoop(start: LatLng, km: number, bearing: number) {
  let radius = km / (2 * Math.PI) / 1.3;
  let loop = await routeLoop(start, radius, bearing);
  if (Math.abs(loop.km - km) / km > 0.12) { radius *= km / loop.km; loop = await routeLoop(start, radius, bearing); }
  return loop;
}

export function useDistanceAccess() {
  const { can } = useSubscription();
  const [firstUse, setFirstUse, loaded] = useStored<string>(FIRST_USE_KEY, "");
  const daysUsed = firstUse ? Math.floor((Date.now() - new Date(firstUse).getTime()) / 86400000) : 0;
  const daysLeft = firstUse ? Math.max(0, FREE_DAYS - daysUsed) : FREE_DAYS;
  const premium = can("routeGenerator");
  const allowed = premium || !firstUse || daysLeft > 0;
  const markUsed = () => {
    if (!firstUse) setFirstUse(new Date().toISOString());
  };
  return { loaded, premium, daysLeft, allowed, markUsed };
}
export function DistancePlannerPage() {
  const { locale, distance } = usePreferences();
  const L = (es: string, en: string) => (locale === "es" ? es : en);
  const access = useDistanceAccess();
  const mapEl = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<import("leaflet").Map | null>(null);
  const libRef = useRef<typeof import("leaflet") | null>(null);
  const layerRef = useRef<import("leaflet").LayerGroup | null>(null);
  const [ready, setReady] = useState(false);
  const [start, setStart] = useState<LatLng | null>(null);
  const [savedStart, setSavedStart, savedStartLoaded] = useStored<LatLng | null>(START_KEY, null);
  const [favorite, setFavorite] = useStored<SavedLoop | null>(FAVORITE_KEY, null);
  const [km, setKm] = useState(5);
  const [loops, setLoops] = useState<Loop[]>([]);
  const [selected, setSelected] = useState(0);
  const [loading, setLoading] = useState(false);
  const [locating, setLocating] = useState(false);

  useEffect(() => {
    if (savedStartLoaded && savedStart && !start) setStart(savedStart);
  }, [savedStartLoaded, savedStart, start]);

  useEffect(() => {
    if (!access.allowed) return;
    let cancelled = false;
    void (async () => {
      const Lf = await import("leaflet");
      if (cancelled || !mapEl.current || mapRef.current) return;
      const map = Lf.map(mapEl.current).setView(savedStart ?? [28.60, -81.30], savedStart ? 14 : 10);
      Lf.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap contributors", maxZoom: 19 }).addTo(map);
      map.on("click", (e) => { const s: LatLng = [e.latlng.lat, e.latlng.lng]; setStart(s); setSavedStart(s); setLoops([]); });
      libRef.current = Lf; mapRef.current = map; layerRef.current = Lf.layerGroup().addTo(map);
      setReady(true);
    })();
    return () => { cancelled = true; mapRef.current?.remove(); mapRef.current = null; setReady(false); };
  }, [access.allowed]);

  useEffect(() => {
    if (savedStartLoaded && savedStart && mapRef.current) {
      mapRef.current.setView(savedStart, 14);
    }
  }, [savedStartLoaded, savedStart]);

  useEffect(() => {
    const Lf = libRef.current, layer = layerRef.current, map = mapRef.current;
    if (!Lf || !layer || !map) return;
    layer.clearLayers();
    loops.forEach((l, i) => {
      if (i === selected) return;
      Lf.polyline(l.coords, { color: COLORS[i]!, weight: 3, opacity: 0.45 }).on("click", () => setSelected(i)).addTo(layer);
    });
    const sel = loops[selected];
    if (sel) {
      const line = Lf.polyline(sel.coords, { color: getComputedStyle(document.documentElement).getPropertyValue("--primary") || "#a8f000", weight: 5 }).addTo(layer);
      map.fitBounds(line.getBounds(), { padding: [24, 24] });
    }
    if (start) Lf.circleMarker(start, { radius: 8, color: "#000", weight: 2, fillColor: "#a8f000", fillOpacity: 1 }).addTo(layer);
  }, [loops, selected, start, ready]);

  const useGps = () => {
    if (!navigator.geolocation) { toast.error(L("GPS no disponible", "GPS unavailable")); return; }
    setLocating(true);
    navigator.geolocation.getCurrentPosition(
      (p) => { const s: LatLng = [p.coords.latitude, p.coords.longitude]; setStart(s); setSavedStart(s); setLoops([]); mapRef.current?.setView(s, 15); setLocating(false); },
      () => { setLocating(false); toast.error(L("No se pudo obtener tu ubicación", "Could not get your location")); },
      { enableHighAccuracy: true, timeout: 10000 },
    );
  };

  const generate = async () => {
    if (!start) { toast.error(L("Marca un punto de partida", "Set a starting point")); return; }
    access.markUsed();
    setLoading(true);
    const seed = Math.random() * 120;
    const res = await Promise.all([0, 120, 240].map((b) => buildLoop(start, km, b + seed)));
    setLoops(res); setSelected(0); setLoading(false);
  };

  const saveFavorite = () => {
    if (!start || !loops[selected]) return;
    const next = { start, loop: loops[selected]!, savedAt: new Date().toISOString() };
    setFavorite(next);
    setSavedStart(start);
    toast.success(L("Recorrido guardado como preferido", "Route saved as favorite"));
  };

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-4 md:space-y-6">
        <TopBar />
        <header className="border-b pb-3 md:pb-5">
          <Button asChild variant="ghost" size="sm" className="mb-2 -ml-3"><Link to="/mas"><ChevronLeft />{L("Volver", "Back")}</Link></Button>
          <h1 className="font-display text-2xl uppercase md:text-4xl">{L("Distancia", "Distance")}</h1>
          <p className="mt-1 text-xs text-muted-foreground md:text-sm">{L("Elige un punto de partida y una distancia: te proponemos recorridos circulares que vuelven al mismo punto.", "Pick a start and a distance: we suggest loops that return to the same point.")}</p>
          {access.loaded && !access.premium && access.allowed && (
            <p className="mt-2 inline-flex items-center gap-1.5 rounded-md border border-primary/30 bg-primary/10 px-2 py-1 text-xs font-semibold text-primary"><Sparkles className="size-3.5" />{L(`Gratis: te quedan ${access.daysLeft} días`, `Free: ${access.daysLeft} days left`)}</p>
          )}
        </header>

        {access.loaded && !access.allowed ? (
          <section className="rounded-md border border-primary/30 bg-primary/5 p-6 text-center">
            <Lock className="mx-auto size-8 text-primary" />
            <h2 className="mt-3 font-display text-lg uppercase">{L("Tu mes gratis terminó", "Your free month ended")}</h2>
            <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">{L("El generador de recorridos por distancia está incluido en RUN+.", "The distance route generator is included in RUN+.")}</p>
            <Button asChild className="mt-4 min-h-11"><Link to="/mas/suscripcion"><Sparkles />{L("Ver RUN+", "See RUN+")}</Link></Button>
          </section>
        ) : (
          <section className="grid gap-4 lg:grid-cols-[1.4fr_.6fr]">
            <div className="overflow-hidden rounded-md border bg-card">
              <div className="relative aspect-[4/5] sm:aspect-[16/10]"><div ref={mapEl} className="absolute inset-0 z-0" /></div>
              <p className="flex items-center gap-1.5 border-t px-3 py-2 text-xs text-muted-foreground"><MapPin className="size-3.5 text-primary" />{start ? `${start[0].toFixed(4)}, ${start[1].toFixed(4)}` : L("Toca el mapa para marcar la salida", "Tap the map to set the start")}</p>
            </div>
            <aside className="space-y-3">
              <section className="space-y-3 rounded-md border bg-card p-3">
                <Button variant="outline" className="min-h-11 w-full" onClick={useGps} disabled={locating}>{locating ? <Loader2 className="animate-spin" /> : <Crosshair />}{L("Usar mi ubicación GPS", "Use my GPS location")}</Button>
                <div>
                  <p className="mb-1.5 text-[10px] font-bold uppercase text-muted-foreground">{L("Distancia objetivo", "Target distance")}</p>
                  <div className="grid grid-cols-3 gap-2">
                    {PRESETS.map((v) => <button key={v} type="button" onClick={() => setKm(v)} className={`min-h-11 rounded-md border text-xs font-semibold ${km === v ? "border-primary bg-primary/15 text-primary" : "text-muted-foreground"}`}>{distance(v).value.toFixed(v % 1 ? 1 : 0)} {distance(v).unit}</button>)}
                  </div>
                  <input type="range" min={1} max={42} step={0.5} value={km} onChange={(e) => setKm(Number(e.target.value))} className="mt-3 w-full accent-[var(--primary)]" aria-label={L("Distancia", "Distance")} />
                  <p className="text-center font-mono text-xl font-semibold text-primary">{distance(km).value.toFixed(1)} {distance(km).unit}</p>
                </div>
                <Button className="min-h-11 w-full" onClick={generate} disabled={loading || !start}>{loading ? <Loader2 className="animate-spin" /> : <RouteIcon />}{L("Generar recorridos", "Generate routes")}</Button>
              </section>
              {loops.length > 0 && (
                <section className="rounded-md border bg-card p-3">
                  <p className="mb-2 text-[10px] font-bold uppercase text-muted-foreground">{L("Opciones", "Options")}</p>
                  <div className="space-y-2">
                    {loops.map((l, i) => (
                      <button key={i} type="button" onClick={() => setSelected(i)} className={`flex min-h-12 w-full items-center gap-3 rounded-md border p-3 text-left ${selected === i ? "border-primary bg-primary/5" : ""}`}>
                        <span className="size-3 rounded-full" style={{ background: COLORS[i] }} />
                        <span className="flex-1 text-sm font-semibold">{L("Recorrido", "Route")} {i + 1}</span>
                        <span className="font-mono text-xs">{distance(l.km).value.toFixed(2)} {distance(l.km).unit}</span>
                      </button>
                    ))}
                  </div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    <Button variant="outline" className="min-h-11" onClick={saveFavorite} disabled={loading || !loops[selected]}>
                      <Star className={favorite && favorite.loop === loops[selected] ? "fill-current" : ""} />{L("Preferida", "Favorite")}
                    </Button>
                    <Button variant="ghost" className="min-h-11" onClick={generate} disabled={loading}>{L("Otras opciones", "Other options")}</Button>
                  </div>
                  {favorite && (
                    <p className="mt-2 flex items-center gap-1.5 text-[10px] text-primary"><Star className="size-3 fill-current" />{L("Tienes un recorrido preferido guardado.", "You have a saved favorite route.")}</p>
                  )}
                </section>
              )}
            </aside>
          </section>
        )}
      </div>
    </AppShell>
  );
}
