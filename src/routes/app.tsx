import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronRight, Download, Map as MapIcon, Watch, Activity, BarChart3, Gauge, Flame, Route as RouteIcon, GripVertical, Eye, EyeOff, Pencil, RotateCcw, Check, Settings2 } from "lucide-react";
import {
  BarChart, Bar, LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip,
  CartesianGrid, AreaChart, Area,
} from "recharts";
import { AppShell, TopBar } from "@/components/app-shell";
import { RunPlusCard } from "@/components/premium-card";
import { ActivityRow, ProviderMark } from "@/components/activity-row";
import { Button } from "@/components/ui/button";
import {
  CONNS_KEY, IMPORTED_KEY, PROVIDERS, initialConnections, relTime,
  type Connection, type RemoteActivity,
} from "@/lib/integrations";
import { usePreferences } from "@/lib/preferences";
import { useAllActivities, useStored } from "@/lib/run-store";

const DASHBOARD_KEY = "run_dashboard_layout_v1";
const DEFAULT_DASHBOARD = ["summary", "performance", "maps", "weekly", "connections", "plus", "activities"] as const;
type DashboardId = typeof DEFAULT_DASHBOARD[number];
type DashboardLayout = { order: DashboardId[]; hidden: DashboardId[] };

export const Route = createFileRoute("/app")({
  head: () => ({
    meta: [
      { title: "Inicio — RUN" },
      { name: "description", content: "Resumen de tu semana de entrenamiento, el estado de tus dispositivos conectados y tus últimas actividades en RUN." },
      { property: "og:title", content: "Inicio — RUN" },
      { property: "og:description", content: "Tu panel de rendimiento: volumen semanal, conexiones y actividades recientes." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Home,
});

function PerformanceOverview() {
  const { distance, pace, locale } = usePreferences();
  const L = (es: string, en: string) => (locale === "es" ? es : en);
  const { all } = useAllActivities();
  const [range, setRange] = useState<7 | 30 | 3650>(7);
  const fmtTime = (m: number) => (m >= 60 ? `${Math.floor(m / 60)}h ${String(Math.round(m % 60)).padStart(2, "0")}m` : `${Math.round(m)}m`);
  const last = all[0];
  const runs = all.filter((a) => a.distanceKm > 0 && a.durationMin >= 0);
  const totalKm = runs.reduce((s, a) => s + a.distanceKm, 0);
  const totalMin = runs.reduce((s, a) => s + a.durationMin, 0);
  const longest = runs.reduce((m, a) => Math.max(m, a.distanceKm), 0);
  const best = runs.reduce((m, a) => Math.min(m, a.durationMin / a.distanceKm), Infinity);
  const windowMs = range === 3650 ? 3650 * 86400000 : range * 86400000;
  const scoped = runs.filter((a) => Date.now() - new Date(a.date).getTime() <= windowMs);
  const recent7 = runs.filter((a) => Date.now() - new Date(a.date).getTime() <= 7 * 86400000);
  const recent30 = runs.filter((a) => Date.now() - new Date(a.date).getTime() <= 30 * 86400000);
  const previous7 = runs.filter((a) => {
    const age = Date.now() - new Date(a.date).getTime();
    return age > 7 * 86400000 && age <= 14 * 86400000;
  });
  const recentKm = recent7.reduce((s, a) => s + a.distanceKm, 0);
  const previousKm = previous7.reduce((s, a) => s + a.distanceKm, 0);
  const trend = previousKm > 0 ? ((recentKm - previousKm) / previousKm) * 100 : null;
  const activeDays30 = new Set(recent30.map((a) => new Date(a.date).toISOString().slice(0, 10))).size;
  const weeklyData = Array.from({ length: 8 }, (_, i) => {
    const end = new Date();
    end.setHours(23, 59, 59, 999);
    end.setDate(end.getDate() - (7 - i) * 7);
    const startDate = new Date(end);
    startDate.setDate(startDate.getDate() - 6);
    const items = runs.filter((a) => {
      const t = new Date(a.date).getTime();
      return t >= startDate.getTime() && t <= end.getTime();
    });
    const km = items.reduce((s, a) => s + a.distanceKm, 0);
    const min = items.reduce((s, a) => s + a.durationMin, 0);
    return { name: `S${i + 1}`, km: Number(km.toFixed(1)), pace: km ? Number((min / km).toFixed(2)) : null };
  });
  const activityMix = Object.entries(scoped.reduce<Record<string, number>>((acc, a) => {
    acc[a.type] = (acc[a.type] ?? 0) + 1;
    return acc;
  }, {})).map(([name, value]) => ({ name, value }));
  const d = (km: number) => { const x = distance(km); return `${x.value.toFixed(1)} ${x.unit}`; };
  const p = (v: number) => { const x = pace(v); return `${x.value} ${x.unit}`; };
  const sourceLabel = (source: string) => source === "manual" ? L("Manual", "Manual") : source === "record" ? L("Registrada", "Recorded") : source;
  return (
    <section aria-label={L("Estadísticas y rendimiento", "Stats & performance")} className="space-y-3 md:space-y-4">
      <div className="flex items-end justify-between gap-2">
        <div>
          <p className="text-[10px] font-bold uppercase text-primary">{L("Rendimiento", "Performance")}</p>
          <h2 className="font-display text-base uppercase md:text-xl">{L("Estadísticas y rendimiento", "Stats & performance")}</h2>
        </div>
        <Link to="/mas/rendimiento" className="text-xs font-semibold text-primary hover:underline">{L("Ver análisis", "View analysis")}</Link>
      </div>

      <div className="grid gap-3 md:grid-cols-[1.25fr_.75fr]">
        <div className="relative overflow-hidden rounded-md border bg-card p-3 md:p-5">
          <div className="absolute right-0 top-0 h-28 w-28 rounded-full bg-primary/10 blur-2xl" />
          <div className="relative">
            <div className="flex items-start justify-between gap-2">
              <div className="flex min-w-0 items-center gap-2">
                <div className="rounded-md border border-primary/30 bg-primary/10 p-2"><Activity className="size-5 text-primary" /></div>
                <div className="min-w-0">
                  <p className="text-[10px] font-bold uppercase text-primary">{L("Última actividad", "Last activity")}</p>
                  <h3 className="truncate font-display text-base uppercase md:text-lg">{last?.name ?? L("Sin actividades", "No activities")}</h3>
                </div>
              </div>
              {last && <span className="shrink-0 font-mono text-[10px] text-muted-foreground">{new Date(last.date).toLocaleDateString(locale)}</span>}
            </div>
            {last ? (
              <>
                <p className="mt-1 text-[10px] uppercase text-muted-foreground">{last.type} · {sourceLabel(last.source)}</p>
                <div className="mt-3 grid grid-cols-3 gap-2">
                  <StatCard label={L("Distancia", "Distance")} value={distance(last.distanceKm).value.toFixed(2)} detail={distance(last.distanceKm).unit} active />
                  <StatCard label={L("Tiempo", "Time")} value={fmtTime(last.durationMin)} detail="" />
                  <StatCard label={L("Ritmo", "Pace")} value={last.distanceKm > 0 ? pace(last.durationMin / last.distanceKm).value : "—"} detail={last.distanceKm > 0 ? pace(1).unit : ""} />
                </div>
                <div className="mt-3 rounded-md border bg-background/40 p-2.5">
                  <div className="mb-1 flex items-center justify-between text-[9px] font-bold uppercase text-muted-foreground">
                    <span>{L("Volumen reciente", "Recent volume")}</span><span>{d(recent7.reduce((s, a) => s + a.distanceKm, 0))}</span>
                  </div>
                  <div className="h-20 md:h-24">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={weeklyData}>
                        <defs><linearGradient id="runArea" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.32}/><stop offset="100%" stopColor="var(--primary)" stopOpacity={0}/></linearGradient></defs>
                        <Area type="monotone" dataKey="km" stroke="var(--primary)" strokeWidth={2} fill="url(#runArea)" />
                        <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </>
            ) : <p className="mt-4 text-xs text-muted-foreground">{L("Registra o importa tu primera actividad para ver sus métricas.", "Record or import your first activity to see its metrics.")}</p>}
          </div>
        </div>

        <div className="rounded-md border bg-card p-3 md:p-5">
          <div className="flex items-center gap-2"><Gauge className="size-5 text-primary" /><p className="text-[10px] font-bold uppercase text-primary">{L("Constancia", "Consistency")}</p></div>
          <div className="mt-3 flex items-center gap-4">
            <div className="relative size-24 shrink-0">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90">
                <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="9" className="text-muted/50" />
                <circle cx="50" cy="50" r="40" fill="none" stroke="var(--primary)" strokeWidth="9" strokeLinecap="round" strokeDasharray={251} strokeDashoffset={251 - (251 * Math.min(activeDays30 / 30, 1))} />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center font-mono text-sm font-bold">{activeDays30}/30</span>
            </div>
            <div className="min-w-0">
              <p className="font-display text-sm uppercase">{L("Días activos", "Active days")}</p>
              <p className="mt-1 text-xs text-muted-foreground">{trend === null ? L("Sigue acumulando historial para comparar tendencias.", "Keep building history to compare trends.") : `${trend >= 0 ? "+" : ""}${trend.toFixed(0)}% ${L("vs. semana anterior", "vs prior week")}`}</p>
            </div>
          </div>
          <div className="mt-4 grid grid-cols-2 gap-2">
            <StatCard label={L("Últimos 7 días", "Last 7 days")} value={d(recentKm)} detail="" active />
            <StatCard label={L("Últimos 30 días", "Last 30 days")} value={d(recent30.reduce((s, a) => s + a.distanceKm, 0))} detail="" />
          </div>
        </div>
      </div>

      <div className="rounded-md border bg-card p-3 md:p-5">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <div className="flex items-center gap-2"><BarChart3 className="size-5 text-primary" /><p className="text-[10px] font-bold uppercase text-primary">{L("Historial global", "Global history")}</p></div>
            <h3 className="mt-1 font-display text-sm uppercase md:text-base">{L("Carga y evolución", "Load & progression")}</h3>
          </div>
          <div className="flex rounded-md border bg-background p-0.5">
            {([[7, "7 días"], [30, "30 días"], [3650, "Todo"]] as const).map(([v, label]) => (
              <button key={v} type="button" onClick={() => setRange(v)} className={`min-h-9 rounded px-3 text-[10px] font-bold uppercase transition-colors ${range === v ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>{L(label === "7 días" ? "7 días" : label === "30 días" ? "30 días" : "Todo", label)}</button>
            ))}
          </div>
        </div>
        <div className="mt-3 grid gap-3 lg:grid-cols-[1.6fr_.8fr]">
          <div className="h-48 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={weeklyData} barCategoryGap="18%">
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} formatter={(value) => [`${value} km`, L("Distancia", "Distance")]} />
                <Bar dataKey="km" fill="var(--primary)" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="h-48 md:h-56">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyData}>
                <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
                <XAxis dataKey="name" tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                <YAxis hide domain={["auto", "auto"]} />
                <Tooltip contentStyle={{ background: "var(--card)", border: "1px solid var(--border)", borderRadius: 6, fontSize: 11 }} formatter={(value) => [value ? p(Number(value)) : "—", L("Ritmo", "Pace")]} />
                <Line type="monotone" dataKey="pace" stroke="var(--primary)" strokeWidth={2.5} dot={{ r: 2 }} connectNulls />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
        <div className="mt-2 grid grid-cols-2 gap-2 md:grid-cols-4">
          <StatCard label={L("Actividades", "Activities")} value={String(runs.length)} detail="" />
          <StatCard label={L("Distancia total", "Total distance")} value={d(totalKm)} detail="" active />
          <StatCard label={L("Tiempo total", "Total time")} value={fmtTime(totalMin)} detail="" />
          <StatCard label={L("Mejor ritmo", "Best pace")} value={Number.isFinite(best) ? p(best) : "—"} detail="" />
        </div>
      </div>

      {activityMix.length > 0 && (
        <div className="grid gap-3 md:grid-cols-[.8fr_1.2fr]">
          <div className="rounded-md border bg-card p-3 md:p-5">
            <div className="flex items-center gap-2"><RouteIcon className="size-5 text-primary" /><h3 className="font-display text-sm uppercase">{L("Tipos de actividad", "Activity mix")}</h3></div>
            <div className="mt-3 h-32">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={activityMix} layout="vertical" margin={{ left: 0, right: 12 }}>
                  <XAxis type="number" hide />
                  <YAxis type="category" dataKey="name" width={70} tick={{ fontSize: 9 }} axisLine={false} tickLine={false} />
                  <Bar dataKey="value" fill="var(--primary)" radius={[0,4,4,0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
          <div className="rounded-md border bg-card p-3 md:p-5">
            <div className="flex items-center gap-2"><Flame className="size-5 text-primary" /><h3 className="font-display text-sm uppercase">{L("Resumen de rendimiento", "Performance summary")}</h3></div>
            <div className="mt-3 grid grid-cols-2 gap-2 md:grid-cols-3">
              <StatCard label={L("Ritmo medio", "Avg pace")} value={totalKm ? p(totalMin / totalKm) : "—"} detail="" />
              <StatCard label={L("Más larga", "Longest")} value={longest ? d(longest) : "—"} detail="" />
              <StatCard label={L("Tendencia", "Trend")} value={trend === null ? "—" : `${trend >= 0 ? "+" : ""}${trend.toFixed(0)}%`} detail={L("7 días", "7 days")} active />
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
function DashboardLayout({
  blocks,
  labels,
  locale,
}: {
  blocks: Record<DashboardId, React.ReactNode>;
  labels: Record<DashboardId, string>;
  locale: string;
}) {
  const fallback: DashboardLayout = { order: [...DEFAULT_DASHBOARD], hidden: [] };
  const [layout, setLayout, loaded] = useStored<DashboardLayout>(DASHBOARD_KEY, fallback);
  const [editing, setEditing] = useState(false);
  const dragId = useRef<DashboardId | null>(null);
  const hoverId = useRef<DashboardId | null>(null);

  useEffect(() => {
    if (!loaded) return;
    const valid = new Set(DEFAULT_DASHBOARD);
    const order = [...layout.order.filter((id) => valid.has(id)), ...DEFAULT_DASHBOARD.filter((id) => !layout.order.includes(id))];
    const hidden = layout.hidden.filter((id) => valid.has(id));
    if (order.join("|") !== layout.order.join("|") || hidden.join("|") !== layout.hidden.join("|")) setLayout({ order, hidden });
  }, [loaded, layout.order, layout.hidden, setLayout]);

  const move = (from: DashboardId, to: DashboardId) => setLayout((prev) => {
    const next = [...prev.order];
    const a = next.indexOf(from), b = next.indexOf(to);
    if (a < 0 || b < 0 || a === b) return prev;
    next.splice(a, 1); next.splice(b, 0, from);
    return { ...prev, order: next };
  });
  const hide = (id: DashboardId) => setLayout((prev) => ({ ...prev, hidden: prev.hidden.includes(id) ? prev.hidden.filter((x) => x !== id) : [...prev.hidden, id] }));
  const restore = () => setLayout(fallback);
  const visible = layout.order.filter((id) => !layout.hidden.includes(id));
  useEffect(() => {
    if (!editing) return;
    const onMove = (event: PointerEvent) => {
      const id = dragId.current;
      if (!id) return;
      const target = document.elementFromPoint(event.clientX, event.clientY)?.closest<HTMLElement>("[data-dashboard-id]");
      const targetId = target?.dataset["dashboardId"] as DashboardId | undefined;
      if (targetId && targetId !== id && targetId !== hoverId.current && layout.order.includes(targetId)) { hoverId.current = targetId; move(id, targetId); }
    };
    const onUp = () => { dragId.current = null; hoverId.current = null; };
    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerup", onUp);
    return () => { window.removeEventListener("pointermove", onMove); window.removeEventListener("pointerup", onUp); };
  }, [editing, layout.order]);
  const T = (es: string, en: string) => (locale === "es" ? es : en);

  return (
    <div className="space-y-3 md:space-y-4">
      <div className={`flex items-center justify-between gap-2 rounded-md border p-2.5 ${editing ? "border-primary/40 bg-primary/5" : "border-transparent"}`}>
        <div className="flex items-center gap-2">
          <Settings2 className={`size-4 ${editing ? "text-primary" : "text-muted-foreground"}`} />
          {editing && <span className="text-[10px] font-bold uppercase text-primary">{T("Arrastra para ordenar · toca el ojo para mostrar/ocultar", "Drag to reorder · tap the eye to show/hide")}</span>}
        </div>
        <div className="flex items-center gap-1.5">
          {editing && <button type="button" onClick={restore} className="min-h-9 rounded-md border px-2.5 text-[10px] font-bold uppercase hover:bg-muted"><RotateCcw className="mr-1 inline size-3.5" />{T("Restaurar", "Restore")}</button>}
          <button type="button" onClick={() => setEditing((v) => !v)} className="min-h-9 rounded-md border px-2.5 text-[10px] font-bold uppercase hover:bg-muted">
            {editing ? <><Check className="mr-1 inline size-3.5" />{T("Guardar", "Save")}</> : <><Pencil className="mr-1 inline size-3.5" />{T("Personalizar", "Customize")}</>}
          </button>
        </div>
      </div>
      {editing && (
        <div className="rounded-md border border-dashed bg-card/50 p-2">
          <p className="mb-2 px-1 text-[9px] font-bold uppercase text-muted-foreground">{T("Módulos del dashboard", "Dashboard modules")}</p>
          <div className="flex flex-wrap gap-1.5">
            {layout.order.map((id) => <button key={id} type="button" onClick={() => hide(id)} className={`inline-flex min-h-9 items-center gap-1.5 rounded-md border px-2.5 text-[10px] font-semibold ${layout.hidden.includes(id) ? "opacity-50" : "bg-primary/10 border-primary/20"}`}>{layout.hidden.includes(id) ? <EyeOff className="size-3.5" /> : <Eye className="size-3.5 text-primary" />}{labels[id]}</button>)}
          </div>
        </div>
      )}
      {visible.map((id) => (
        <div key={id} data-dashboard-id={id} className={editing ? "relative rounded-lg ring-1 ring-transparent transition hover:ring-primary/40" : ""}>
          {editing && <div className="pointer-events-none absolute left-2 top-2 z-20 flex items-center gap-1 rounded-md border bg-card/95 px-1.5 py-1 shadow-sm">
            <span role="button" tabIndex={0} aria-label={T("Arrastrar módulo", "Drag module")} onPointerDown={(e) => { e.preventDefault(); dragId.current = id; hoverId.current = null; }} className="pointer-events-auto cursor-grab touch-none p-1 text-muted-foreground active:cursor-grabbing"><GripVertical className="size-4" /></span>
            <button type="button" onClick={() => hide(id)} className="pointer-events-auto rounded p-1 text-muted-foreground hover:text-foreground" aria-label={T("Ocultar", "Hide")}><EyeOff className="size-3.5" /></button>
          </div>}
          {blocks[id]}
        </div>
      ))}
      {editing && layout.hidden.length > 0 && <div className="rounded-md border border-dashed p-3">
        <p className="mb-2 text-[9px] font-bold uppercase text-muted-foreground">{T("Ocultos · toca para mostrar", "Hidden · tap to show")}</p>
        <div className="flex flex-wrap gap-1.5">{layout.hidden.map((id) => <button key={id} type="button" onClick={() => hide(id)} className="inline-flex min-h-9 items-center gap-1.5 rounded-md border px-2.5 text-[10px] font-semibold"><Eye className="size-3.5 text-primary" />{labels[id]}</button>)}</div>
      </div>}
    </div>
  );
}

function Home() {
  const { t, distance, pace, locale } = usePreferences();
  const L = (es: string, en: string) => (locale === "es" ? es : en);
  const [conns] = useStored(CONNS_KEY, initialConnections());
  const [imported] = useStored<RemoteActivity[]>(IMPORTED_KEY, []);

  const week = useMemo(() => {
    const now = Date.now();
    const days = Array.from({ length: 7 }, (_, idx) => {
      const d = new Date(now - (6 - idx) * 86400000);
      return { key: d.toISOString().slice(0, 10), label: "DLMMXJVS"[d.getDay()]!, km: 0, min: 0, runs: 0 };
    });
    const byKey = new Map(days.map((d) => [d.key, d]));
    for (const a of imported) {
      const day = byKey.get(new Date(a.date).toISOString().slice(0, 10));
      if (day) { day.km += a.distanceKm; day.min += a.durationMin; day.runs += 1; }
    }
    return days;
  }, [imported]);

  const totalKm = week.reduce((s, d) => s + d.km, 0);
  const totalMin = week.reduce((s, d) => s + d.min, 0);
  const totalRuns = week.reduce((s, d) => s + d.runs, 0);
  const timeStr = !totalMin
    ? "0 m"
    : totalMin >= 60
      ? `${Math.floor(totalMin / 60)} h ${String(Math.round(totalMin % 60)).padStart(2, "0")} m`
      : `${Math.round(totalMin)} m`;
  const displayTotal = distance(totalKm);
  const displayPace = totalKm > 0 ? pace(totalMin / totalKm) : null;
  const maxKm = Math.max(...week.map((d) => d.km), 1);
  const connected = PROVIDERS.filter((p) => conns[p.id]?.status === "connected");

  return (
    <AppShell>
      <div className="mx-auto max-w-6xl space-y-4 md:space-y-7">
        <TopBar />

        <header className="border-b pb-3 md:pb-6">
           <p className="hidden text-xs font-bold uppercase text-primary md:block">{t("homeEyebrow")}</p>
           <h1 className="font-display text-2xl uppercase md:mt-2 md:text-4xl">{t("homeTitle")}</h1>
          <p className="mt-1 text-xs text-muted-foreground md:mt-2 md:max-w-2xl md:text-sm">
             {t("homeSubtitle")}
          </p>
        </header>

        <DashboardLayout
          locale={locale}
          labels={{ summary: L("Resumen semanal", "Weekly summary"), performance: L("Estadísticas y rendimiento", "Stats & performance"), maps: L("Mapas y recorridos", "Maps & routes"), weekly: L("Volumen semanal", "Weekly volume"), connections: L("Integraciones", "Integrations"), plus: "RUN+", activities: L("Actividades recientes", "Recent activities") }}
          blocks={{
            summary: <section aria-label="Resumen semanal" className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3"><StatCard label={t("week")} value={displayTotal.value.toFixed(1)} detail={displayTotal.unit} active /><StatCard label={t("time")} value={timeStr} detail={t("moving")} /><StatCard label={t("avgPace")} value={displayPace?.value ?? "—"} detail={displayPace?.unit ?? (displayTotal.unit === "km" ? "min/km" : "min/mi")} /><StatCard label={t("sessions")} value={String(totalRuns)} detail={t("thisWeek")} /></section>,
            performance: <PerformanceOverview />,
            maps: <Link to="/rutas" className="flex min-h-16 items-center gap-3 rounded-md border border-primary/30 bg-primary/5 p-3 transition-colors hover:bg-primary/10"><MapIcon className="size-6 shrink-0 text-primary" /><span className="min-w-0 flex-1"><span className="block font-display text-sm uppercase">{L("Mapas y recorridos", "Maps & routes")}</span><span className="block truncate text-xs text-muted-foreground">{L("Planifica rutas, revisa trayectos y territorio", "Plan routes, review tracks and territory")}</span></span><ChevronRight className="size-4 text-muted-foreground" /></Link>,
            weekly: <section aria-label="Volumen semanal" className="rounded-md border bg-card p-3 md:rounded-lg md:p-5"><div className="flex items-end justify-between gap-2"><div><p className="hidden text-xs font-bold uppercase text-primary md:block">Entrenamiento</p><h2 className="font-display text-base uppercase md:mt-1 md:text-lg">{t("last7")}</h2></div><span className="shrink-0 font-mono text-[10px] text-muted-foreground md:text-xs">{displayTotal.value.toFixed(1)} {displayTotal.unit.toUpperCase()} {t("totalKm")}</span></div><div className="mt-4 flex h-28 items-end gap-1.5 md:mt-6 md:h-44 md:gap-3">{week.map((d) => <div key={d.key} className="flex min-w-0 flex-1 flex-col items-center gap-1.5"><span className="h-4 font-mono text-[9px] leading-4 text-primary md:h-5 md:text-[10px] md:leading-5">{d.km > 0 ? d.km.toFixed(1) : ""}</span><div className="flex w-full flex-1 items-end"><div className={`w-full rounded-sm ${d.km > 0 ? "bg-primary/80" : "bg-muted"}`} style={{ height: `${d.km > 0 ? Math.max(10, (d.km / maxKm) * 100) : 6}%` }} /></div><span className="text-[9px] font-semibold text-muted-foreground md:text-[10px]">{d.label}</span></div>)}</div></section>,
            connections: <section aria-label="Conexiones" className="rounded-md border bg-card p-3 md:rounded-lg md:p-5"><div className="flex items-end justify-between gap-2"><div><p className="hidden text-xs font-bold uppercase text-primary md:block">Integraciones</p><h2 className="font-display text-base uppercase md:mt-1 md:text-lg">{t("connections")}</h2></div><Link to="/dispositivos" className="shrink-0 text-xs font-semibold text-primary hover:underline">{t("manage")}</Link></div>{connected.length === 0 ? <div className="mt-4 rounded-md border border-dashed p-4 text-center"><Watch className="mx-auto mb-2 size-5 text-muted-foreground" /><p className="text-xs text-muted-foreground md:text-sm">{t("noDevices")}</p><Button asChild size="sm" className="mt-3 min-h-11 md:min-h-8"><Link to="/dispositivos">{t("connectDevice")}</Link></Button></div> : <ul className="mt-2 divide-y md:mt-3">{connected.map((p) => <li key={p.id}><Link to="/dispositivos" className="flex w-full items-center gap-3 rounded-md px-1 py-2.5 text-left transition-colors hover:bg-muted/50"><ProviderMark p={p} size="size-8 md:size-9" /><div className="min-w-0 flex-1"><p className="truncate text-sm font-semibold">{p.name}</p><p className="truncate font-mono text-[10px] uppercase text-muted-foreground">{relTime(conns[p.id].lastSync)}</p></div><ChevronRight className="size-4 shrink-0 text-muted-foreground" /></Link></li>)}</ul>}</section>,
            plus: <RunPlusCard compact />,
            activities: <section aria-label="Actividades recientes" className="rounded-md border bg-card p-3 md:rounded-lg md:p-5"><div className="flex items-end justify-between gap-2"><div><p className="hidden text-xs font-bold uppercase text-primary md:block">Registro</p><h2 className="font-display text-base uppercase md:mt-1 md:text-lg">{t("recentActivities")}</h2></div>{imported.length > 0 && <Link to="/dispositivos" className="shrink-0 text-xs font-semibold text-primary hover:underline">{t("viewAll")}</Link>}</div>{imported.length === 0 ? <div className="mt-4 flex min-h-24 flex-col items-center justify-center border border-dashed p-4 text-center md:mt-5 md:min-h-32 md:p-6"><Download className="mb-2 size-5 text-muted-foreground md:mb-3" /><p className="text-xs text-muted-foreground md:text-sm">{t("noActivities")}</p><Button asChild size="sm" variant="outline" className="mt-3 min-h-11 md:min-h-8"><Link to="/dispositivos">{t("importNow")}</Link></Button></div> : <ul className="mt-2 divide-y md:mt-3">{imported.slice(0, 5).map((a) => <ActivityRow key={a.id} a={a} />)}</ul>}</section>,
          }}
        />
      </div>
    </AppShell>
  );
}

function StatCard({ label, value, detail, active = false }: { label: string; value: string; detail: string; active?: boolean }) {
  return (
    <div className={`min-w-0 rounded-md border p-3 md:p-4 ${active ? "border-primary/30 bg-primary/10" : "bg-card"}`}>
      <p className={`truncate text-[9px] font-bold uppercase md:text-[11px] ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</p>
      <div className="mt-1 flex items-baseline gap-1 md:mt-1.5">
        <span className={`shrink-0 font-mono text-xl font-semibold leading-none md:text-2xl ${active ? "text-primary" : "text-foreground"}`}>{value}</span>
        <span className="min-w-0 truncate text-[9px] font-medium text-muted-foreground md:text-[11px]">{detail}</span>
      </div>
    </div>
  );
}
