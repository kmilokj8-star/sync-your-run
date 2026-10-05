import { Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import {
  Bell, Check, ChevronLeft, ChevronRight, Footprints, Gift, Pause, Play, Plus, Square, Trash2, Trophy,
} from "lucide-react";
import { toast } from "sonner";
import { AppShell, TopBar } from "@/components/app-shell";
import { ProviderMark } from "@/components/activity-row";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROVIDERS, type RemoteActivity } from "@/lib/integrations";
import { usePreferences } from "@/lib/preferences";
import {
  CHALLENGES, KEYS, PLANS, dayKey, kmSince, uid, useAllActivities, useStored,
  type PlannedWorkout, type RunActivity, type Shoe,
} from "@/lib/run-store";

function useL() {
  const { locale } = usePreferences();
  return (es: string, en: string) => (locale === "es" ? es : en);
}

function Page({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <AppShell>
      <div className="mx-auto max-w-4xl space-y-4 md:space-y-6">
        <TopBar />
        <header className="flex items-end justify-between gap-3 border-b pb-3 md:pb-5">
          <div className="min-w-0">
            <h1 className="font-display text-2xl uppercase md:text-4xl">{title}</h1>
            {subtitle && <p className="mt-1 text-xs text-muted-foreground md:text-sm">{subtitle}</p>}
          </div>
          {action}
        </header>
        {children}
      </div>
    </AppShell>
  );
}

function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <section className={`rounded-md border bg-card p-3 md:p-4 ${className}`}>{children}</section>;
}

function Empty({ text, action }: { text: string; action?: ReactNode }) {
  return <div className="rounded-md border border-dashed p-6 text-center text-sm text-muted-foreground">{text}{action && <div className="mt-3">{action}</div>}</div>;
}

function fmtDuration(min: number) {
  const h = Math.floor(min / 60);
  const m = Math.round(min % 60);
  return h ? `${h}h ${m}m` : `${m} min`;
}

function SourceMark({ a }: { a: RunActivity }) {
  const p = PROVIDERS.find((x) => x.id === a.source);
  if (p) return <ProviderMark p={p} size="size-9" />;
  return <div className="grid size-9 shrink-0 place-items-center rounded-lg bg-primary/15 text-primary"><Footprints className="size-4" /></div>;
}

/* ---------------- Actividades ---------------- */
export function ActivitiesPage() {
  const L = useL();
  const { locale, distance, pace } = usePreferences();
  const { all, setManual } = useAllActivities();
  const [filter, setFilter] = useState("all");
  const [open, setOpen] = useState(false);
  const list = all.filter((a) => filter === "all" || (filter === "manual" ? a.source === "manual" || a.source === "record" : a.source === filter));
  const total = distance(list.reduce((s, a) => s + a.distanceKm, 0));

  return (
    <Page
      title={L("Actividades", "Activities")}
      subtitle={`${list.length} · ${total.value.toFixed(1)} ${total.unit}`}
      action={<Button onClick={() => setOpen(true)} className="min-h-11 md:min-h-9"><Plus /> <span className="hidden sm:inline">{L("Añadir", "Add")}</span></Button>}
    >
      <div className="flex gap-2 overflow-x-auto pb-1">
        {[["all", L("Todas", "All")], ["manual", L("Manuales", "Manual")], ...PROVIDERS.map((p) => [p.id, p.name])].map(([id, label]) => (
          <button key={id} onClick={() => setFilter(id!)} className={`min-h-10 shrink-0 rounded-full border px-4 text-xs font-semibold ${filter === id ? "border-primary bg-primary text-primary-foreground" : "bg-card text-muted-foreground"}`}>{label}</button>
        ))}
      </div>
      {list.length === 0 ? (
        <Empty text={L("No hay actividades todavía.", "No activities yet.")} action={<div className="flex justify-center gap-2"><Button variant="outline" asChild><Link to="/dispositivos">{L("Importar", "Import")}</Link></Button><Button asChild><Link to="/registrar">{L("Registrar", "Record")}</Link></Button></div>} />
      ) : (
        <ul className="divide-y rounded-md border bg-card">
          {list.map((a) => {
            const d = distance(a.distanceKm);
            const p = pace(a.durationMin / Math.max(a.distanceKm, 0.01));
            const own = a.source === "manual" || a.source === "record";
            return (
              <li key={a.id} className="flex items-center gap-3 p-3">
                <Link to="/actividad/$id" params={{ id: a.id }} className="flex min-w-0 flex-1 items-center gap-3">
                <SourceMark a={a} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-semibold">{a.name}</p>
                  <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { weekday: "short", day: "numeric", month: "short" })} · {a.type} · {fmtDuration(a.durationMin)}</p>
                </div>
                <div className="text-right font-mono text-xs"><p className="font-semibold">{d.value.toFixed(1)} {d.unit}</p><p className="text-muted-foreground">{p.value} {p.unit}</p></div>
                <ChevronRight className="size-4 text-muted-foreground" />
                </Link>
                {own && <Button variant="ghost" size="icon" className="size-10" aria-label={L("Eliminar", "Delete")} onClick={() => setManual((m) => m.filter((x) => x.id !== a.id))}><Trash2 className="size-4" /></Button>}
              </li>
            );
          })}
        </ul>
      )}
      <ActivityDialog open={open} onOpenChange={setOpen} onSave={(a) => setManual((m) => [a, ...m])} />
    </Page>
  );
}

function ActivityDialog({ open, onOpenChange, onSave, initial }: { open: boolean; onOpenChange: (o: boolean) => void; onSave: (a: RunActivity) => void; initial?: Partial<RunActivity> }) {
  const L = useL();
  const [shoes] = useStored<Shoe[]>(KEYS.shoes, []);
  const [name, setName] = useState("");
  const [date, setDate] = useState(dayKey(new Date()));
  const [km, setKm] = useState("5");
  const [min, setMin] = useState("30");
  const [type, setType] = useState<RemoteActivity["type"]>("Rodaje");
  useEffect(() => {
    if (open) {
      setName(initial?.name ?? L("Carrera", "Run"));
      setKm(String(initial?.distanceKm ?? 5));
      setMin(String(initial?.durationMin ?? 30));
      setDate(dayKey(new Date()));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);
  const save = () => {
    const distanceKm = parseFloat(km.replace(",", "."));
    const durationMin = parseFloat(min.replace(",", "."));
    if (!(distanceKm > 0) || !(durationMin > 0)) { toast.error(L("Distancia y tiempo deben ser mayores que 0", "Distance and time must be greater than 0")); return; }
    const def = shoes.find((s) => s.isDefault && !s.retired);
    onSave({ id: uid(), name: name.trim() || "Carrera", date: new Date(`${date}T08:00:00`).toISOString(), distanceKm, durationMin, type, source: initial?.source ?? "manual", shoeId: def?.id });
    toast.success(L("Actividad guardada", "Activity saved"));
    onOpenChange(false);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader><DialogTitle>{L("Nueva actividad", "New activity")}</DialogTitle></DialogHeader>
        <div className="grid gap-3">
          <div className="grid gap-1.5"><Label>{L("Nombre", "Name")}</Label><Input value={name} onChange={(e) => setName(e.target.value)} maxLength={80} /></div>
          <div className="grid grid-cols-2 gap-3">
            <div className="grid gap-1.5"><Label>{L("Fecha", "Date")}</Label><Input type="date" value={date} onChange={(e) => setDate(e.target.value)} /></div>
            <div className="grid gap-1.5"><Label>{L("Tipo", "Type")}</Label>
              <Select value={type} onValueChange={(v) => setType(v as RemoteActivity["type"])}><SelectTrigger><SelectValue /></SelectTrigger><SelectContent>{(["Rodaje", "Series", "Carrera", "Trail"] as const).map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
            </div>
            <div className="grid gap-1.5"><Label>{L("Distancia (km)", "Distance (km)")}</Label><Input inputMode="decimal" value={km} onChange={(e) => setKm(e.target.value)} /></div>
            <div className="grid gap-1.5"><Label>{L("Tiempo (min)", "Time (min)")}</Label><Input inputMode="decimal" value={min} onChange={(e) => setMin(e.target.value)} /></div>
          </div>
        </div>
        <DialogFooter><Button onClick={save} className="min-h-11">{L("Guardar", "Save")}</Button></DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

/* ---------------- Registrar ---------------- */
function haversine(a: GeolocationCoordinates, b: GeolocationCoordinates) {
  const R = 6371, toR = (x: number) => (x * Math.PI) / 180;
  const dLat = toR(b.latitude - a.latitude), dLon = toR(b.longitude - a.longitude);
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toR(a.latitude)) * Math.cos(toR(b.latitude)) * Math.sin(dLon / 2) ** 2;
  return 2 * R * Math.asin(Math.sqrt(h));
}

export function RecordPage() {
  const L = useL();
  const { distance, pace } = usePreferences();
  const { setManual } = useAllActivities();
  const [state, setState] = useState<"idle" | "running" | "paused">("idle");
  const [seconds, setSeconds] = useState(0);
  const [km, setKm] = useState(0);
  const [gps, setGps] = useState<"off" | "ok" | "denied">("off");
  const [saveOpen, setSaveOpen] = useState(false);
  const last = useRef<GeolocationCoordinates | null>(null);
  const watch = useRef<number | null>(null);

  useEffect(() => {
    if (state !== "running") return;
    const t = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, [state]);

  useEffect(() => {
    if (state !== "running" || !("geolocation" in navigator)) return;
    watch.current = navigator.geolocation.watchPosition(
      (pos) => {
        setGps("ok");
        if (pos.coords.accuracy > 40) return;
        if (last.current) {
          const d = haversine(last.current, pos.coords);
          if (d > 0.003) setKm((k) => k + d);
          if (d > 0.003) last.current = pos.coords;
        } else last.current = pos.coords;
      },
      () => setGps("denied"),
      { enableHighAccuracy: true, maximumAge: 2000 },
    );
    return () => { if (watch.current !== null) navigator.geolocation.clearWatch(watch.current); last.current = null; };
  }, [state]);

  const d = distance(km);
  const p = pace(km > 0.05 ? seconds / 60 / km : 0);
  const time = `${String(Math.floor(seconds / 3600)).padStart(2, "0")}:${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;
  const reset = () => { setState("idle"); setSeconds(0); setKm(0); };

  return (
    <Page title={L("Registrar", "Record")} subtitle={L("Graba tu carrera con el GPS del teléfono.", "Record your run with your phone's GPS.")}>
      <Card className="text-center">
        <p className="text-[10px] font-bold uppercase text-muted-foreground">{L("Tiempo", "Time")}</p>
        <p className="font-mono text-5xl font-semibold md:text-6xl">{time}</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          <div className="rounded-md border border-primary/30 bg-primary/10 p-3"><p className="text-[10px] font-bold uppercase text-primary">{L("Distancia", "Distance")}</p><p className="font-mono text-3xl font-semibold text-primary">{d.value.toFixed(2)}</p><p className="text-xs text-muted-foreground">{d.unit}</p></div>
          <div className="rounded-md border p-3"><p className="text-[10px] font-bold uppercase text-muted-foreground">{L("Ritmo", "Pace")}</p><p className="font-mono text-3xl font-semibold">{km > 0.05 ? p.value : "--:--"}</p><p className="text-xs text-muted-foreground">{p.unit}</p></div>
        </div>
        <p className="mt-3 text-xs text-muted-foreground">GPS: {gps === "ok" ? L("señal activa", "signal active") : gps === "denied" ? L("permiso denegado — puedes introducir la distancia al guardar", "permission denied — you can enter distance when saving") : L("en espera", "waiting")}</p>
        <div className="mt-5 flex justify-center gap-3">
          {state === "idle" && <Button size="lg" className="min-h-14 rounded-full px-10" onClick={() => setState("running")}><Play /> {L("Iniciar", "Start")}</Button>}
          {state === "running" && <Button size="lg" variant="outline" className="min-h-14 rounded-full px-8" onClick={() => setState("paused")}><Pause /> {L("Pausar", "Pause")}</Button>}
          {state === "paused" && <>
            <Button size="lg" className="min-h-14 rounded-full px-8" onClick={() => setState("running")}><Play /> {L("Reanudar", "Resume")}</Button>
            <Button size="lg" variant="destructive" className="min-h-14 rounded-full px-8" onClick={() => setSaveOpen(true)}><Square /> {L("Terminar", "Finish")}</Button>
          </>}
        </div>
      </Card>
      <ActivityDialog
        open={saveOpen}
        onOpenChange={setSaveOpen}
        initial={{ name: L("Carrera registrada", "Recorded run"), distanceKm: Math.max(0.1, Math.round(km * 100) / 100), durationMin: Math.max(1, Math.round(seconds / 6) / 10), source: "record" }}
        onSave={(a) => { setManual((m) => [a, ...m]); reset(); }}
      />
    </Page>
  );
}

/* ---------------- Calendario ---------------- */
export function CalendarPage() {
  const L = useL();
  const { locale, distance } = usePreferences();
  const { all } = useAllActivities();
  const [planned, setPlanned] = useStored<PlannedWorkout[]>(KEYS.planned, []);
  const [month, setMonth] = useState(() => { const d = new Date(); return new Date(d.getFullYear(), d.getMonth(), 1); });
  const [selected, setSelected] = useState(dayKey(new Date()));
  const [title, setTitle] = useState("");
  const [km, setKm] = useState("8");

  const byDay = useMemo(() => {
    const m: Record<string, { acts: RunActivity[]; plans: PlannedWorkout[] }> = {};
    all.forEach((a) => { const k = dayKey(a.date); (m[k] ??= { acts: [], plans: [] }).acts.push(a); });
    planned.forEach((p) => { (m[p.date] ??= { acts: [], plans: [] }).plans.push(p); });
    return m;
  }, [all, planned]);

  const startOffset = (month.getDay() + 6) % 7;
  const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
  const cells = Array.from({ length: Math.ceil((startOffset + daysInMonth) / 7) * 7 }, (_, i) => {
    const n = i - startOffset + 1;
    return n >= 1 && n <= daysInMonth ? new Date(month.getFullYear(), month.getMonth(), n) : null;
  });
  const weekdays = locale === "es" ? ["L", "M", "X", "J", "V", "S", "D"] : ["M", "T", "W", "T", "F", "S", "S"];
  const sel = byDay[selected] ?? { acts: [], plans: [] };
  const today = dayKey(new Date());

  const addPlan = () => {
    const n = parseFloat(km.replace(",", "."));
    if (!title.trim() || !(n > 0)) { toast.error(L("Completa título y distancia", "Fill in title and distance")); return; }
    setPlanned((p) => [...p, { id: uid(), date: selected, title: title.trim().slice(0, 60), distanceKm: n }]);
    setTitle("");
    toast.success(L("Entreno planificado", "Workout planned"));
  };

  return (
    <Page title={L("Calendario", "Calendar")} subtitle={L("Entrenos realizados y planificados.", "Completed and planned workouts.")}>
      <div className="grid gap-4 md:grid-cols-[1fr_300px]">
        <Card>
          <div className="mb-3 flex items-center justify-between">
            <Button variant="ghost" size="icon" className="size-11" aria-label="prev" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1))}><ChevronLeft /></Button>
            <p className="font-display text-sm uppercase">{month.toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { month: "long", year: "numeric" })}</p>
            <Button variant="ghost" size="icon" className="size-11" aria-label="next" onClick={() => setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1))}><ChevronRight /></Button>
          </div>
          <div className="grid grid-cols-7 gap-1 text-center text-[10px] font-bold uppercase text-muted-foreground">{weekdays.map((w, i) => <div key={i}>{w}</div>)}</div>
          <div className="mt-1 grid grid-cols-7 gap-1">
            {cells.map((d, i) => {
              if (!d) return <div key={i} />;
              const k = dayKey(d);
              const info = byDay[k];
              const kmDay = info?.acts.reduce((s, a) => s + a.distanceKm, 0) ?? 0;
              return (
                <button key={i} onClick={() => setSelected(k)} className={`flex aspect-square min-h-11 flex-col items-center justify-center rounded-md border text-xs ${selected === k ? "border-primary bg-primary/15" : k === today ? "border-primary/40" : "border-transparent bg-muted/30"}`}>
                  <span className="font-semibold">{d.getDate()}</span>
                  {kmDay > 0 && <span className="font-mono text-[9px] text-primary">{distance(kmDay).value.toFixed(0)}</span>}
                  {!kmDay && info?.plans.length ? <span className="size-1.5 rounded-full bg-muted-foreground" /> : null}
                </button>
              );
            })}
          </div>
        </Card>
        <Card className="space-y-3">
          <p className="font-display text-sm uppercase">{new Date(`${selected}T12:00:00`).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { weekday: "long", day: "numeric", month: "long" })}</p>
          {sel.acts.length === 0 && sel.plans.length === 0 && <p className="text-xs text-muted-foreground">{L("Sin entrenos este día.", "No workouts this day.")}</p>}
          {sel.acts.map((a) => <div key={a.id} className="flex items-center gap-2 text-sm"><SourceMark a={a} /><span className="flex-1 truncate">{a.name}</span><span className="font-mono text-xs">{distance(a.distanceKm).value.toFixed(1)} {distance(1).unit}</span></div>)}
          {sel.plans.map((p) => (
            <div key={p.id} className="flex items-center gap-2 rounded-md border border-dashed p-2 text-sm">
              <button aria-label="done" onClick={() => setPlanned((all) => all.map((x) => x.id === p.id ? { ...x, done: !x.done } : x))} className={`grid size-7 place-items-center rounded-full border ${p.done ? "border-primary bg-primary text-primary-foreground" : ""}`}>{p.done && <Check className="size-4" />}</button>
              <span className={`flex-1 truncate ${p.done ? "line-through text-muted-foreground" : ""}`}>{p.title}</span>
              <span className="font-mono text-xs">{distance(p.distanceKm).value.toFixed(1)}</span>
              <Button variant="ghost" size="icon" className="size-9" aria-label="delete" onClick={() => setPlanned((all) => all.filter((x) => x.id !== p.id))}><Trash2 className="size-4" /></Button>
            </div>
          ))}
          <div className="space-y-2 border-t pt-3">
            <Label>{L("Planificar entreno", "Plan a workout")}</Label>
            <Input placeholder={L("Ej. Rodaje suave", "e.g. Easy run")} value={title} onChange={(e) => setTitle(e.target.value)} />
            <div className="flex gap-2"><Input inputMode="decimal" value={km} onChange={(e) => setKm(e.target.value)} aria-label="km" /><Button onClick={addPlan} className="min-h-10"><Plus /> {L("Añadir", "Add")}</Button></div>
          </div>
        </Card>
      </div>
    </Page>
  );
}

/* ---------------- Retos ---------------- */
function usePoints() {
  const { all } = useAllActivities();
  const [joined] = useStored<string[]>(KEYS.challenges, []);
  const [redeemed] = useStored<{ id: string; cost: number; date: string; label: string }[]>(KEYS.redeemed, []);
  const kmPoints = Math.floor(all.reduce((s, a) => s + a.distanceKm, 0) * 10);
  const completed = CHALLENGES.filter((c) => joined.includes(c.id) && kmSince(all, c.days) >= c.goalKm);
  const challengePoints = completed.reduce((s, c) => s + c.points, 0);
  const spent = redeemed.reduce((s, r) => s + r.cost, 0);
  return { kmPoints, challengePoints, spent, balance: kmPoints + challengePoints - spent, completed, redeemed };
}

export function ChallengesPage() {
  const L = useL();
  const { distance } = usePreferences();
  const { all } = useAllActivities();
  const [joined, setJoined] = useStored<string[]>(KEYS.challenges, []);
  const { balance } = usePoints();
  return (
    <Page title={L("Retos", "Challenges")} subtitle={L("Únete, corre y gana puntos.", "Join, run and earn points.")} action={<Link to="/puntos" className="flex min-h-11 items-center gap-1 rounded-md border px-3 font-mono text-sm text-primary"><Gift className="size-4" />{balance}</Link>}>
      <div className="grid gap-3 md:grid-cols-2">
        {CHALLENGES.map((c) => {
          const isIn = joined.includes(c.id);
          const done = kmSince(all, c.days);
          const pct = Math.min(100, (done / c.goalKm) * 100);
          return (
            <Card key={c.id} className={isIn ? "border-primary/40" : ""}>
              <div className="flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary"><Trophy className="size-5" /></div>
                <div className="min-w-0 flex-1"><p className="font-semibold">{L(c.es, c.en)}</p><p className="text-xs text-muted-foreground">{L(c.descEs, c.descEn)}</p></div>
                <span className="font-mono text-xs text-primary">+{c.points}</span>
              </div>
              {isIn && <div className="mt-3 space-y-1"><Progress value={pct} /><p className="font-mono text-xs text-muted-foreground">{distance(Math.min(done, c.goalKm)).value.toFixed(1)} / {distance(c.goalKm).value.toFixed(1)} {distance(1).unit} {pct >= 100 && `· ${L("¡Completado!", "Completed!")}`}</p></div>}
              <Button variant={isIn ? "outline" : "default"} className="mt-3 min-h-11 w-full md:min-h-9" onClick={() => { setJoined((j) => isIn ? j.filter((x) => x !== c.id) : [...j, c.id]); toast.success(isIn ? L("Has salido del reto", "Left challenge") : L("¡Te has unido!", "Joined!")); }}>
                {isIn ? L("Abandonar", "Leave") : L("Unirme", "Join")}
              </Button>
            </Card>
          );
        })}
      </div>
    </Page>
  );
}

/* ---------------- Puntos ---------------- */
export function PointsPage() {
  const L = useL();
  const { locale } = usePreferences();
  const { kmPoints, challengePoints, balance, redeemed } = usePoints();
  const [, setRedeemed] = useStored<{ id: string; cost: number; date: string; label: string }[]>(KEYS.redeemed, []);
  const rewards = [{ id: "p15", cost: 500, label: L("15 días Premium", "15 days Premium") }, { id: "p30", cost: 1000, label: L("1 mes Premium", "1 month Premium") }];
  return (
    <Page title={L("Puntos", "Points")} subtitle={L("10 puntos por km + bonus de retos.", "10 points per km + challenge bonus.")}>
      <div className="grid grid-cols-3 gap-2">
        <Card className="border-primary/30 bg-primary/10"><p className="text-[10px] font-bold uppercase text-primary">{L("Saldo", "Balance")}</p><p className="font-mono text-2xl font-semibold text-primary">{balance}</p></Card>
        <Card><p className="text-[10px] font-bold uppercase text-muted-foreground">Km</p><p className="font-mono text-2xl font-semibold">{kmPoints}</p></Card>
        <Card><p className="text-[10px] font-bold uppercase text-muted-foreground">{L("Retos", "Challenges")}</p><p className="font-mono text-2xl font-semibold">{challengePoints}</p></Card>
      </div>
      <div className="grid gap-3 md:grid-cols-2">
        {rewards.map((r) => (
          <Card key={r.id} className="flex items-center gap-3">
            <Gift className="size-6 text-primary" />
            <div className="flex-1"><p className="font-semibold">{r.label}</p><p className="font-mono text-xs text-muted-foreground">{r.cost} pts</p></div>
            <Button disabled={balance < r.cost} className="min-h-11 md:min-h-9" onClick={() => { setRedeemed((x) => [...x, { id: uid(), cost: r.cost, label: r.label, date: new Date().toISOString() }]); toast.success(L("Canjeado", "Redeemed")); }}>{L("Canjear", "Redeem")}</Button>
          </Card>
        ))}
      </div>
      <Card>
        <p className="mb-2 text-[10px] font-bold uppercase text-primary">{L("Historial de canjes", "Redemption history")}</p>
        {redeemed.length === 0 ? <p className="text-xs text-muted-foreground">{L("Aún no has canjeado puntos.", "No redemptions yet.")}</p> : (
          <ul className="divide-y text-sm">{redeemed.map((r) => <li key={r.id} className="flex justify-between py-2"><span>{r.label}</span><span className="font-mono text-xs text-muted-foreground">−{r.cost} · {new Date(r.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US")}</span></li>)}</ul>
        )}
      </Card>
    </Page>
  );
}

/* ---------------- Planes ---------------- */
export function PlansPage() {
  const L = useL();
  const { distance } = usePreferences();
  const [active, setActive] = useStored<string | null>(KEYS.activePlan, null);
  const [, setPlanned] = useStored<PlannedWorkout[]>(KEYS.planned, []);
  const start = (planId: string) => {
    const plan = PLANS.find((p) => p.id === planId)!;
    const base = new Date();
    const workouts: PlannedWorkout[] = [];
    for (let w = 0; w < plan.weeks; w++) {
      [1, 3, 6].forEach((dayOffset, i) => {
        const d = new Date(base.getFullYear(), base.getMonth(), base.getDate() + w * 7 + dayOffset);
        const km = plan.perWeek[Math.min(i + Math.floor(w / 3), plan.perWeek.length - 1)]!;
        workouts.push({ id: uid(), date: dayKey(d), title: `${L(plan.es, plan.en)} · ${[L("Rodaje", "Easy"), L("Calidad", "Quality"), L("Tirada larga", "Long run")][i]}`, distanceKm: km, planId });
      });
    }
    setPlanned((p) => [...p.filter((x) => !x.planId), ...workouts]);
    setActive(planId);
    toast.success(L("Plan añadido a tu calendario", "Plan added to your calendar"));
  };
  const stop = () => { setPlanned((p) => p.filter((x) => !x.planId)); setActive(null); };
  return (
    <Page title={L("Planes", "Plans")} subtitle={L("Elige un plan y se cargará en tu calendario.", "Pick a plan and it loads into your calendar.")}>
      <div className="grid gap-3 md:grid-cols-2">
        {PLANS.map((p) => (
          <Card key={p.id} className={active === p.id ? "border-primary/50" : ""}>
            <p className="text-[10px] font-bold uppercase text-primary">{p.level} · {p.weeks} {L("semanas", "weeks")}</p>
            <p className="mt-1 font-display text-lg uppercase">{L(p.es, p.en)}</p>
            <p className="text-xs text-muted-foreground">3 {L("sesiones/semana", "sessions/week")} · {L("hasta", "up to")} {distance(Math.max(...p.perWeek)).value.toFixed(0)} {distance(1).unit}</p>
            {active === p.id ? (
              <div className="mt-3 flex gap-2"><Button asChild className="min-h-11 flex-1 md:min-h-9"><Link to="/calendario">{L("Ver calendario", "View calendar")}</Link></Button><Button variant="outline" className="min-h-11 md:min-h-9" onClick={stop}>{L("Detener", "Stop")}</Button></div>
            ) : <Button className="mt-3 min-h-11 w-full md:min-h-9" variant="outline" onClick={() => start(p.id)}>{L("Empezar plan", "Start plan")}</Button>}
          </Card>
        ))}
      </div>
    </Page>
  );
}

/* ---------------- Equipo (zapatillas) ---------------- */
export function GearPage() {
  const L = useL();
  const { distance } = usePreferences();
  const { all } = useAllActivities();
  const [shoes, setShoes] = useStored<Shoe[]>(KEYS.shoes, []);
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [brand, setBrand] = useState("");
  const [initialKm, setInitialKm] = useState("0");
  const [maxKm, setMaxKm] = useState("700");
  const used = (s: Shoe) => s.initialKm + all.filter((a) => a.shoeId === s.id).reduce((x, a) => x + a.distanceKm, 0);
  const add = () => {
    if (!name.trim()) { toast.error(L("Escribe un nombre", "Enter a name")); return; }
    setShoes((list) => [...list, { id: uid(), name: name.trim().slice(0, 50), brand: brand.trim().slice(0, 40), initialKm: parseFloat(initialKm) || 0, maxKm: parseFloat(maxKm) || 700, isDefault: list.length === 0, retired: false }]);
    setName(""); setBrand(""); setOpen(false);
  };
  return (
    <Page title={L("Equipo", "Gear")} subtitle={L("Controla el kilometraje de tus zapatillas.", "Track your shoes' mileage.")} action={<Button onClick={() => setOpen(true)} className="min-h-11 md:min-h-9"><Plus /> <span className="hidden sm:inline">{L("Añadir", "Add")}</span></Button>}>
      {shoes.length === 0 ? <Empty text={L("Añade tus zapatillas para sumar km automáticamente.", "Add your shoes to track km automatically.")} /> : (
        <div className="grid gap-3 md:grid-cols-2">
          {shoes.map((s) => {
            const km = used(s);
            const pct = Math.min(100, (km / s.maxKm) * 100);
            return (
              <Card key={s.id} className={s.retired ? "opacity-60" : ""}>
                <div className="flex items-start gap-3">
                  <Footprints className="mt-0.5 size-6 text-primary" />
                  <div className="min-w-0 flex-1"><p className="font-semibold">{s.name} {s.isDefault && <span className="ml-1 rounded bg-primary/15 px-1.5 py-0.5 text-[10px] text-primary">{L("Predeterminada", "Default")}</span>}</p><p className="text-xs text-muted-foreground">{s.brand}</p></div>
                  <Button variant="ghost" size="icon" className="size-10" aria-label="delete" onClick={() => setShoes((l) => l.filter((x) => x.id !== s.id))}><Trash2 className="size-4" /></Button>
                </div>
                <div className="mt-3 space-y-1"><Progress value={pct} /><p className="font-mono text-xs text-muted-foreground">{distance(km).value.toFixed(0)} / {distance(s.maxKm).value.toFixed(0)} {distance(1).unit}{pct > 85 && ` · ${L("cambio próximo", "replace soon")}`}</p></div>
                <div className="mt-3 flex gap-2">
                  {!s.isDefault && !s.retired && <Button variant="outline" size="sm" className="min-h-10" onClick={() => setShoes((l) => l.map((x) => ({ ...x, isDefault: x.id === s.id })))}>{L("Predeterminar", "Set default")}</Button>}
                  <Button variant="outline" size="sm" className="min-h-10" onClick={() => setShoes((l) => l.map((x) => x.id === s.id ? { ...x, retired: !x.retired, isDefault: false } : x))}>{s.retired ? L("Reactivar", "Reactivate") : L("Retirar", "Retire")}</Button>
                </div>
              </Card>
            );
          })}
        </div>
      )}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader><DialogTitle>{L("Nuevas zapatillas", "New shoes")}</DialogTitle></DialogHeader>
          <div className="grid gap-3">
            <div className="grid gap-1.5"><Label>{L("Modelo", "Model")}</Label><Input value={name} onChange={(e) => setName(e.target.value)} placeholder="Pegasus 41" /></div>
            <div className="grid gap-1.5"><Label>{L("Marca", "Brand")}</Label><Input value={brand} onChange={(e) => setBrand(e.target.value)} placeholder="Nike" /></div>
            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-1.5"><Label>{L("Km iniciales", "Initial km")}</Label><Input inputMode="decimal" value={initialKm} onChange={(e) => setInitialKm(e.target.value)} /></div>
              <div className="grid gap-1.5"><Label>{L("Vida útil (km)", "Lifespan (km)")}</Label><Input inputMode="decimal" value={maxKm} onChange={(e) => setMaxKm(e.target.value)} /></div>
            </div>
          </div>
          <DialogFooter><Button onClick={add} className="min-h-11">{L("Guardar", "Save")}</Button></DialogFooter>
        </DialogContent>
      </Dialog>
    </Page>
  );
}

/* ---------------- Notificaciones ---------------- */
export function NotificationsPage() {
  const L = useL();
  const { all } = useAllActivities();
  const [joined] = useStored<string[]>(KEYS.challenges, []);
  const [planned] = useStored<PlannedWorkout[]>(KEYS.planned, []);
  const [shoes] = useStored<Shoe[]>(KEYS.shoes, []);
  const [read, setRead] = useStored<string[]>(KEYS.readNotifs, []);
  const today = dayKey(new Date());
  const items: { id: string; text: string; to: "/retos" | "/calendario" | "/equipo" | "/actividades" }[] = [];
  CHALLENGES.filter((c) => joined.includes(c.id) && kmSince(all, c.days) >= c.goalKm).forEach((c) => items.push({ id: `ch-${c.id}`, text: L(`¡Completaste el reto "${c.es}"! +${c.points} pts`, `You completed "${c.en}"! +${c.points} pts`), to: "/retos" }));
  planned.filter((p) => p.date === today && !p.done).forEach((p) => items.push({ id: `pl-${p.id}`, text: L(`Hoy toca: ${p.title}`, `Today: ${p.title}`), to: "/calendario" }));
  shoes.filter((s) => !s.retired && s.initialKm + all.filter((a) => a.shoeId === s.id).reduce((x, a) => x + a.distanceKm, 0) > s.maxKm * 0.85).forEach((s) => items.push({ id: `sh-${s.id}`, text: L(`Tus ${s.name} están cerca del final de su vida útil`, `Your ${s.name} are near the end of their life`), to: "/equipo" }));
  all.slice(0, 3).forEach((a) => items.push({ id: `ac-${a.id}`, text: L(`Nueva actividad: ${a.name}`, `New activity: ${a.name}`), to: "/actividades" }));
  return (
    <Page title={L("Notificaciones", "Notifications")} action={items.length > 0 ? <Button variant="outline" className="min-h-11 md:min-h-9" onClick={() => setRead(items.map((i) => i.id))}>{L("Marcar leídas", "Mark read")}</Button> : undefined}>
      {items.length === 0 ? <Empty text={L("No tienes notificaciones.", "No notifications.")} /> : (
        <ul className="divide-y rounded-md border bg-card">
          {items.map((n) => (
            <li key={n.id}>
              <Link to={n.to} onClick={() => setRead((r) => [...new Set([...r, n.id])])} className="flex min-h-14 items-center gap-3 p-3 hover:bg-muted/50">
                <Bell className={`size-4 ${read.includes(n.id) ? "text-muted-foreground" : "text-primary"}`} />
                <span className={`flex-1 text-sm ${read.includes(n.id) ? "text-muted-foreground" : "font-semibold"}`}>{n.text}</span>
                <ChevronRight className="size-4 text-muted-foreground" />
              </Link>
            </li>
          ))}
        </ul>
      )}
    </Page>
  );
}
