import { Link, useParams } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, Footprints, Gauge, Heart, Mountain, Timer, Zap } from "lucide-react";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { AppShell, TopBar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences";
import { IMPORTED_KEY, type RemoteActivity } from "@/lib/integrations";
import { KEYS, useAllActivities, useStored, type RunActivity, type Shoe } from "@/lib/run-store";
import "leaflet/dist/leaflet.css";

type Sample = { km: number; pace: number; ele: number; hr: number; cad: number; lat: number; lng: number };

function rng(seed: string) {
  let h = 2166136261;
  for (const c of seed) h = Math.imul(h ^ c.charCodeAt(0), 16777619);
  return () => { h = Math.imul(h ^ (h >>> 15), 2246822507); h = Math.imul(h ^ (h >>> 13), 3266489909); return ((h ^= h >>> 16) >>> 0) / 4294967296; };
}

/** Deterministic simulated GPS/sensor stream until real device files are imported. */
function buildStream(a: RunActivity): Sample[] {
  const r = rng(a.id);
  const n = Math.max(20, Math.round(a.distanceKm * 10));
  const avg = a.durationMin / Math.max(a.distanceKm, 0.01);
  const radius = a.distanceKm / (2 * Math.PI) / 111;
  const c = [28.6 + (r() - 0.5) * 0.04, -81.3 + (r() - 0.5) * 0.04];
  const phase = r() * 6;
  let ele = 30 + r() * 40;
  return Array.from({ length: n + 1 }, (_, i) => {
    const t = i / n;
    const ang = t * Math.PI * 2;
    const wob = 1 + 0.25 * Math.sin(ang * 3 + phase);
    ele += (r() - 0.5) * 3 + Math.sin(ang * 2 + phase) * 0.8;
    const p = avg * (1 + 0.06 * Math.sin(ang * 4 + phase) + (r() - 0.5) * 0.05 + (ele - 50) * 0.002);
    return {
      km: +(t * a.distanceKm).toFixed(2), pace: p, ele: Math.max(0, ele),
      hr: Math.round(128 + t * 22 + (avg - p) * 18 + r() * 4), cad: Math.round(168 + (avg - p) * 10 + r() * 4),
      lat: c[0]! + radius * wob * Math.cos(ang), lng: c[1]! + (radius * wob * Math.sin(ang)) / Math.cos((c[0]! * Math.PI) / 180),
    };
  });
}

const fmtPace = (m: number) => `${Math.floor(m)}:${String(Math.round((m % 1) * 60)).padStart(2, "0")}`;
const ZONES = [{ n: "Z1", max: 125 }, { n: "Z2", max: 140 }, { n: "Z3", max: 155 }, { n: "Z4", max: 168 }, { n: "Z5", max: 999 }];

export function ActivityViewerPage() {
  const { id } = useParams({ from: "/actividad/$id" });
  const { locale, distance, pace } = usePreferences();
  const L = (es: string, en: string) => (locale === "es" ? es : en);
  const { all, setManual } = useAllActivities();
  const [, setImported] = useStored<RemoteActivity[]>(IMPORTED_KEY, []);
  const [shoes] = useStored<Shoe[]>(KEYS.shoes, []);
  const a = all.find((x) => x.id === id);
  const stream = useMemo(() => (a ? buildStream(a) : []), [a?.id, a?.distanceKm, a?.durationMin]);
  const [metric, setMetric] = useState<"pace" | "ele" | "hr" | "cad">("pace");
  const mapEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!stream.length || !mapEl.current) return;
    let map: import("leaflet").Map | undefined; let off = false;
    void import("leaflet").then((Lf) => {
      if (off || !mapEl.current) return;
      map = Lf.map(mapEl.current);
      Lf.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { attribution: "&copy; OpenStreetMap", maxZoom: 19 }).addTo(map);
      const pts = stream.map((s) => [s.lat, s.lng] as [number, number]);
      const line = Lf.polyline(pts, { color: "#a8f000", weight: 5 }).addTo(map);
      Lf.circleMarker(pts[0]!, { radius: 7, color: "#000", fillColor: "#a8f000", fillOpacity: 1 }).addTo(map).bindTooltip(L("Salida / Meta", "Start / Finish"));
      stream.forEach((s, i) => { if (i && Number.isInteger(Math.round(s.km * 10) / 10) && Math.abs(s.km - Math.round(s.km)) < 0.05 && s.km >= 1) Lf.marker([s.lat, s.lng], { icon: Lf.divIcon({ className: "", html: `<div style="background:#000;color:#a8f000;border:1px solid #a8f000;border-radius:9px;font:700 10px monospace;padding:1px 5px">${Math.round(s.km)}</div>` }) }).addTo(map!); });
      map.fitBounds(line.getBounds(), { padding: [20, 20] });
    });
    return () => { off = true; map?.remove(); };
  }, [stream]);

  if (!a) return <AppShell><div className="mx-auto max-w-4xl space-y-4"><TopBar /><p className="text-sm text-muted-foreground">{L("Actividad no encontrada.", "Activity not found.")}</p><Button asChild variant="outline"><Link to="/actividades">{L("Volver", "Back")}</Link></Button></div></AppShell>;

  const splits = Array.from({ length: Math.ceil(a.distanceKm) }, (_, k) => {
    const seg = stream.filter((s) => s.km > k && s.km <= k + 1);
    const len = Math.min(1, a.distanceKm - k);
    const avgP = seg.reduce((x, s) => x + s.pace, 0) / Math.max(seg.length, 1);
    return { k: k + 1, len, pace: avgP, hr: Math.round(seg.reduce((x, s) => x + s.hr, 0) / Math.max(seg.length, 1)), gain: seg.length > 1 ? seg[seg.length - 1]!.ele - seg[0]!.ele : 0 };
  });
  const best = Math.min(...splits.map((s) => s.pace)); const worst = Math.max(...splits.map((s) => s.pace));
  let gain = 0; stream.forEach((s, i) => { if (i && s.ele > stream[i - 1]!.ele) gain += s.ele - stream[i - 1]!.ele; });
  const avgHr = Math.round(stream.reduce((x, s) => x + s.hr, 0) / stream.length);
  const maxHr = Math.max(...stream.map((s) => s.hr));
  const avgCad = Math.round(stream.reduce((x, s) => x + s.cad, 0) / stream.length);
  const avgPace = a.durationMin / a.distanceKm;
  const tss = Math.round((a.durationMin / 60) * Math.pow(avgHr / 165, 2) * 100);
  const zoneTime = ZONES.map((z, i) => stream.filter((s) => s.hr <= z.max && s.hr > (ZONES[i - 1]?.max ?? 0)).length / stream.length);
  const kcal = Math.round(a.distanceKm * 68);
  const d = distance(a.distanceKm); const p = pace(avgPace);
  const shoe = shoes.find((s) => s.id === a.shoeId);
  const setShoe = (sid: string) => {
    const v = sid || undefined;
    if (a.source === "manual" || a.source === "record") setManual((m) => m.map((x) => (x.id === a.id ? { ...x, shoeId: v } : x)));
    else setImported((l) => l.map((x) => (x.id === a.id ? ({ ...x, shoeId: v } as RemoteActivity) : x)));
  };
  const metrics = { pace: { label: L("Ritmo", "Pace"), unit: "/km", color: "var(--primary)" }, ele: { label: L("Elevación", "Elevation"), unit: "m", color: "#38bdf8" }, hr: { label: L("Frec. cardíaca", "Heart rate"), unit: "ppm", color: "#f43f5e" }, cad: { label: L("Cadencia", "Cadence"), unit: "ppm", color: "#f97316" } } as const;

  const stats: [typeof Timer, string, string][] = [
    [Footprints, L("Distancia", "Distance"), `${d.value.toFixed(2)} ${d.unit}`],
    [Timer, L("Tiempo", "Time"), `${Math.floor(a.durationMin / 60)}:${String(Math.floor(a.durationMin % 60)).padStart(2, "0")}:${String(Math.round((a.durationMin % 1) * 60)).padStart(2, "0")}`],
    [Gauge, L("Ritmo medio", "Avg pace"), `${p.value} ${p.unit}`],
    [Mountain, L("Desnivel +", "Elev. gain"), `${Math.round(gain)} m`],
    [Heart, L("FC media / máx", "Avg / max HR"), `${avgHr} / ${maxHr}`],
    [Zap, "TSS · kcal", `${tss} · ${kcal}`],
  ];

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-4 md:space-y-6">
        <TopBar />
        <header className="border-b pb-3">
          <Button asChild variant="ghost" size="sm" className="-ml-3 mb-1"><Link to="/actividades"><ChevronLeft />{L("Actividades", "Activities")}</Link></Button>
          <h1 className="font-display text-2xl uppercase md:text-4xl">{a.name}</h1>
          <p className="mt-1 text-xs text-muted-foreground">{new Date(a.date).toLocaleString(locale === "es" ? "es-ES" : "en-US", { dateStyle: "full", timeStyle: "short" })} · {a.type}</p>
        </header>

        <section className="grid grid-cols-2 gap-2 md:grid-cols-6">
          {stats.map(([I, l, v]) => <div key={l} className="rounded-md border bg-card p-3"><p className="flex items-center gap-1.5 text-[10px] font-bold uppercase text-muted-foreground"><I className="size-3.5 text-primary" />{l}</p><p className="mt-1 font-mono text-lg font-semibold">{v}</p></div>)}
        </section>

        <section className="grid gap-4 lg:grid-cols-[1.3fr_.7fr]">
          <div className="overflow-hidden rounded-md border bg-card"><div className="relative aspect-[4/3] md:aspect-[16/10]"><div ref={mapEl} className="absolute inset-0 z-0" /></div></div>
          <div className="rounded-md border bg-card p-3">
            <h2 className="mb-2 font-display text-sm uppercase">{L("Parciales por km", "Km splits")}</h2>
            <div className="max-h-80 overflow-y-auto">
              <table className="w-full text-xs"><thead className="text-muted-foreground"><tr className="text-left"><th className="py-1">Km</th><th>{L("Ritmo", "Pace")}</th><th className="w-1/3" /><th className="text-right">FC</th><th className="text-right">Elev</th></tr></thead>
                <tbody className="font-mono">{splits.map((s) => (
                  <tr key={s.k} className="border-t"><td className="py-1.5">{s.len < 1 ? s.len.toFixed(2) : s.k}</td><td className={s.pace === best ? "font-bold text-primary" : ""}>{fmtPace(s.pace)}</td>
                    <td><div className="h-2 rounded-full bg-primary/70" style={{ width: `${40 + 60 * (1 - (s.pace - best) / Math.max(worst - best, 0.01))}%` }} /></td>
                    <td className="text-right">{s.hr}</td><td className="text-right">{s.gain >= 0 ? "+" : ""}{Math.round(s.gain)}</td></tr>))}</tbody></table>
            </div>
          </div>
        </section>

        <section className="rounded-md border bg-card p-3">
          <div className="mb-3 flex flex-wrap gap-2">{(Object.keys(metrics) as (keyof typeof metrics)[]).map((k) => <button key={k} onClick={() => setMetric(k)} className={`min-h-10 rounded-full border px-4 text-xs font-semibold ${metric === k ? "border-primary bg-primary text-primary-foreground" : "text-muted-foreground"}`}>{metrics[k].label}</button>)}</div>
          <div className="h-56"><ResponsiveContainer width="100%" height="100%">
            <AreaChart data={stream}><CartesianGrid strokeDasharray="3 3" stroke="var(--border)" /><XAxis dataKey="km" tick={{ fontSize: 10 }} unit=" km" /><YAxis tick={{ fontSize: 10 }} reversed={metric === "pace"} domain={["auto", "auto"]} tickFormatter={(v: number) => (metric === "pace" ? fmtPace(v) : String(Math.round(v)))} width={40} />
              <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", fontSize: 12 }} formatter={(v: number) => [metric === "pace" ? `${fmtPace(v)} /km` : `${Math.round(v)} ${metrics[metric].unit}`, metrics[metric].label]} labelFormatter={(l) => `${l} km`} />
              <Area type="monotone" dataKey={metric} stroke={metrics[metric].color} fill={metrics[metric].color} fillOpacity={0.2} strokeWidth={2} /></AreaChart>
          </ResponsiveContainer></div>
        </section>

        <section className="grid gap-4 md:grid-cols-3">
          <div className="rounded-md border bg-card p-3 md:col-span-2">
            <h2 className="mb-2 font-display text-sm uppercase">{L("Zonas de frecuencia cardíaca", "Heart rate zones")}</h2>
            {ZONES.map((z, i) => <div key={z.n} className="flex items-center gap-2 py-1 text-xs"><span className="w-6 font-bold">{z.n}</span><div className="h-3 flex-1 overflow-hidden rounded bg-muted"><div className="h-full" style={{ width: `${zoneTime[i]! * 100}%`, background: ["#64748b", "#38bdf8", "#a8f000", "#f97316", "#f43f5e"][i] }} /></div><span className="w-16 text-right font-mono">{Math.round(zoneTime[i]! * a.durationMin)} min</span></div>)}
            <p className="mt-2 text-[10px] text-muted-foreground">{L(`Cadencia media ${avgCad} ppm · Efecto aeróbico ${Math.min(5, tss / 25).toFixed(1)}`, `Avg cadence ${avgCad} spm · Aerobic effect ${Math.min(5, tss / 25).toFixed(1)}`)}</p>
          </div>
          <div className="rounded-md border bg-card p-3">
            <h2 className="mb-2 font-display text-sm uppercase">{L("Zapatillas", "Shoes")}</h2>
            {shoes.length === 0 ? <Button asChild variant="outline" className="min-h-11 w-full"><Link to="/equipo">{L("Añadir zapatillas", "Add shoes")}</Link></Button> : (
              <select value={a.shoeId ?? ""} onChange={(e) => setShoe(e.target.value)} className="min-h-11 w-full rounded-md border bg-background px-2 text-sm">
                <option value="">{L("Sin asignar", "Unassigned")}</option>
                {shoes.filter((s) => !s.retired || s.id === a.shoeId).map((s) => <option key={s.id} value={s.id}>{s.brand} {s.name}</option>)}
              </select>
            )}
            {shoe && <p className="mt-2 text-xs text-muted-foreground">{L("Esta actividad suma", "This run adds")} {d.value.toFixed(1)} {d.unit} {L("a tus", "to your")} {shoe.name}.</p>}
            <p className="mt-3 text-[10px] text-muted-foreground">{L("Trazado y sensores simulados hasta conectar archivos reales del dispositivo.", "Track and sensor data simulated until real device files are connected.")}</p>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
