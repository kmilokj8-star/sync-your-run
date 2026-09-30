import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Activity, CalendarDays, CheckCircle2, ChevronRight, Download, Home, Link2, Loader2, LogOut, Menu, RefreshCw, Settings, ShieldCheck, Trophy, Unlink, Watch, XCircle,
} from "lucide-react";
import logo from "@/assets/logo-mark.png.asset.json";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  PROVIDERS, remoteActivities, relTime, type Connection, type Frequency, type Provider, type ProviderId, type RemoteActivity,
} from "@/lib/integrations";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Apps y dispositivos — RUN" },
      { name: "description", content: "Conecta Garmin, Strava, Apple Health y Coros a RUN y sincroniza tus actividades." },
      { property: "og:title", content: "Apps y dispositivos — RUN" },
      { property: "og:description", content: "Conecta tus relojes y apps de running a RUN." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: ConnectedApps,
});

const STORE = "run_connections_v1";
const IMPORTED = "run_imported_v1";
const empty = (): Connection => ({ status: "disconnected", autoSync: true, frequency: "hourly", imported: 0 });
const initial = () => Object.fromEntries(PROVIDERS.map((p) => [p.id, empty()])) as Record<ProviderId, Connection>;

function ConnectedApps() {
  const [conns, setConns] = useState(initial);
  const [imported, setImported] = useState<RemoteActivity[]>([]);
  const [loaded, setLoaded] = useState(false);
  const [syncing, setSyncing] = useState<ProviderId | null>(null);
  const [connectFor, setConnectFor] = useState<Provider | null>(null);
  const [importFor, setImportFor] = useState<Provider | null>(null);

  useEffect(() => {
    try {
      const c = localStorage.getItem(STORE);
      if (c) setConns({ ...initial(), ...JSON.parse(c) });
      const i = localStorage.getItem(IMPORTED);
      if (i) setImported(JSON.parse(i));
    } catch { /* ignore */ }
    setLoaded(true);
  }, []);
  useEffect(() => {
    if (!loaded) return;
    localStorage.setItem(STORE, JSON.stringify(conns));
    localStorage.setItem(IMPORTED, JSON.stringify(imported));
  }, [conns, imported, loaded]);

  const update = (id: ProviderId, patch: Partial<Connection>) => setConns((c) => ({ ...c, [id]: { ...c[id], ...patch } }));

  const addActivities = (id: ProviderId, acts: RemoteActivity[]) => {
    let added = 0;
    setImported((prev) => {
      const ids = new Set(prev.map((a) => a.id));
      const fresh = acts.filter((a) => !ids.has(a.id));
      added = fresh.length;
      return [...fresh, ...prev].sort((a, b) => b.date.localeCompare(a.date));
    });
    setConns((c) => ({ ...c, [id]: { ...c[id], lastSync: new Date().toISOString(), imported: c[id].imported + added } }));
    return added;
  };

  const syncNow = async (p: Provider) => {
    setSyncing(p.id);
    await new Promise((r) => setTimeout(r, 1400));
    const n = addActivities(p.id, remoteActivities(p.id, 7));
    setSyncing(null);
    toast.success(n ? `${n} actividades nuevas desde ${p.name}` : `${p.name} ya está al día`);
  };

  const connected = PROVIDERS.filter((p) => conns[p.id].status === "connected");

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      <Sidebar />
      <main className="min-w-0 flex-1 px-4 py-5 sm:px-6 md:px-10 md:py-9">
        <div className="mx-auto max-w-6xl space-y-7">
          <div className="flex items-center justify-between border-b pb-4 md:hidden">
            <div className="flex items-center gap-2"><span className="size-6 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} /><span className="font-display text-lg uppercase">RUN</span></div>
            <Button variant="ghost" size="icon" aria-label="Abrir navegación"><Menu /></Button>
          </div>
          <header className="flex flex-col gap-5 border-b pb-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-xs font-bold uppercase text-primary">Ecosistema RUN / Integraciones</p>
              <h1 className="mt-2 font-display text-3xl uppercase sm:text-4xl">Apps y dispositivos</h1>
              <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                Centraliza tus datos de entrenamiento, salud y rendimiento en un solo lugar.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-3 py-2 text-xs font-semibold text-primary">
                <span className="relative flex size-2"><span className="absolute inline-flex size-full animate-ping rounded-full bg-primary opacity-60" /><span className="relative inline-flex size-2 rounded-full bg-primary" /></span>
                Sistema operativo
              </div>
              <Button disabled={!connected.length || !!syncing} onClick={async () => { for (const p of connected) await syncNow(p); }}>
                <RefreshCw className={syncing ? "animate-spin" : ""} /> Sincronizar todo
              </Button>
            </div>
          </header>

          <section className="grid border-y sm:grid-cols-3">
            <Stat label="Conectadas" value={`${connected.length}/${PROVIDERS.length}`} />
            <Stat label="Actividades importadas" value={String(imported.length)} />
            <Stat label="Sincronización automática" value={String(connected.filter((p) => conns[p.id].autoSync).length) + " activas"} />
          </section>

          <div className="flex items-center justify-between">
            <div><p className="text-xs font-bold uppercase text-primary">Fuentes de datos</p><h2 className="mt-1 font-display text-xl uppercase">Tus conexiones</h2></div>
            <span className="font-mono text-xs text-muted-foreground">{connected.length} EN LÍNEA</span>
          </div>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {PROVIDERS.map((p) => (
              <ProviderCard
                key={p.id}
                provider={p}
                conn={conns[p.id]}
                syncing={syncing === p.id}
                onConnect={() => setConnectFor(p)}
                onDisconnect={() => { update(p.id, { ...empty() }); toast(`${p.name} desvinculado`); }}
                onSync={() => syncNow(p)}
                onImport={() => setImportFor(p)}
                onChange={(patch) => update(p.id, patch)}
              />
            ))}
          </section>

          <section className="rounded-lg border bg-card p-5">
            <div className="flex items-center justify-between">
              <div><p className="text-xs font-bold uppercase text-primary">Registro</p><h2 className="mt-1 font-display text-lg uppercase">Actividades importadas</h2></div>
              {imported.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => { setImported([]); setConns((c) => Object.fromEntries(Object.entries(c).map(([k, v]) => [k, { ...v, imported: 0 }])) as typeof c); }}>
                  Vaciar
                </Button>
              )}
            </div>
            {imported.length === 0 ? (
              <div className="mt-5 flex min-h-32 flex-col items-center justify-center border border-dashed p-6 text-center"><Download className="mb-3 size-5 text-muted-foreground" /><p className="text-sm text-muted-foreground">Todavía no has importado actividades. Conecta una app y pulsa “Importar”.</p></div>
            ) : (
              <ul className="mt-3 divide-y">
                {imported.slice(0, 12).map((a) => <ActivityRow key={a.id} a={a} />)}
              </ul>
            )}
          </section>
        </div>
      </main>

      <ConnectDialog
        provider={connectFor}
        onClose={() => setConnectFor(null)}
        onDone={(p, account) => {
          update(p.id, { status: "connected", account, connectedAt: new Date().toISOString() });
          setConnectFor(null);
          toast.success(`${p.name} vinculado`);
          setImportFor(p);
        }}
      />
      <ImportDialog
        provider={importFor}
        importedIds={useMemo(() => new Set(imported.map((a) => a.id)), [imported])}
        onClose={() => setImportFor(null)}
        onImport={(p, acts) => {
          const n = addActivities(p.id, acts);
          setImportFor(null);
          toast.success(`${n || acts.length} actividades importadas desde ${p.name}`);
        }}
      />
    </div>
  );
}

function Sidebar() {
  const items = [
    { icon: Home, label: "Inicio" }, { icon: Activity, label: "Actividades" }, { icon: CalendarDays, label: "Calendario" },
    { icon: Trophy, label: "Retos" }, { icon: Watch, label: "Apps y dispositivos", active: true }, { icon: Settings, label: "Ajustes" },
  ];
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar p-5 md:flex">
      <div className="mb-10 flex items-center gap-3 px-2">
        <span className="size-8 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} />
        <span className="font-display text-2xl uppercase">run</span>
      </div>
      <p className="mb-3 px-3 text-[10px] font-bold uppercase text-muted-foreground">Entrenamiento</p>
      <nav className="space-y-1">
        {items.map(({ icon: I, label, active }) => (
          <div key={label} className={`flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors ${active ? "border-primary bg-sidebar-accent font-semibold text-sidebar-accent-foreground" : "border-transparent text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"}`}>
            <I className="size-4" /> <span className="flex-1">{label}</span>{active && <ChevronRight className="size-3" />}
          </div>
        ))}
      </nav>
      <div className="mt-auto space-y-4"><div className="rounded-md border bg-muted/40 p-3"><div className="flex items-center gap-2 text-xs font-semibold text-primary"><ShieldCheck className="size-4" /> Datos protegidos</div><p className="mt-1 text-xs text-muted-foreground">Tus permisos se pueden revocar en cualquier momento.</p></div><div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground"><LogOut className="size-4" /> Salir</div></div>
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-b p-4 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
      <p className="text-[11px] font-semibold uppercase text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold text-foreground">{value}</p>
    </div>
  );
}

function ProviderMark({ p, size = "size-11" }: { p: Provider; size?: string }) {
  const brandClass: Record<ProviderId, string> = { garmin: "bg-sky-600", strava: "bg-orange-600", apple: "bg-rose-500", coros: "bg-neutral-800" };
  return (
    <div className={`${size} ${brandClass[p.id]} grid shrink-0 place-items-center rounded-lg text-lg font-bold text-primary-foreground`}>
      {p.id === "apple" ? "♥" : p.short}
    </div>
  );
}

const FREQ: Record<Frequency, string> = { realtime: "En tiempo real", hourly: "Cada hora", daily: "Una vez al día" };

function ProviderCard({ provider: p, conn, syncing, onConnect, onDisconnect, onSync, onImport, onChange }: {
  provider: Provider; conn: Connection; syncing: boolean;
  onConnect: () => void; onDisconnect: () => void; onSync: () => void; onImport: () => void; onChange: (p: Partial<Connection>) => void;
}) {
  const on = conn.status === "connected";
  return (
    <article className={`group relative flex min-h-80 flex-col overflow-hidden rounded-lg border bg-card p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/50 ${on ? "border-primary/40" : "border-dashed bg-card/70"}`}>
      <div className={`absolute inset-x-0 top-0 h-0.5 ${on ? "bg-primary" : "bg-border"}`} />
      <div className="flex items-start gap-3">
        <ProviderMark p={p} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="text-lg font-bold">{p.name}</h3>
            {on ? (
              <Badge className="gap-1"><CheckCircle2 className="size-3" /> Vinculado</Badge>
            ) : conn.status === "error" ? (
              <Badge variant="destructive" className="gap-1"><XCircle className="size-3" /> Error</Badge>
            ) : (
              <Badge variant="secondary" className="uppercase">Sin conexión</Badge>
            )}
          </div>
          <p className="text-xs uppercase text-muted-foreground">{on ? conn.account : p.kind}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>

      {on ? (
        <div className="mt-4 space-y-3 rounded-md border bg-muted/60 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span className="font-semibold">Sincronización automática</span>
            <Switch checked={conn.autoSync} onCheckedChange={(v) => onChange({ autoSync: v })} />
          </div>
          {conn.autoSync && (
            <div className="flex items-center justify-between gap-2">
              <span className="text-muted-foreground">Frecuencia</span>
              <Select value={conn.frequency} onValueChange={(v) => onChange({ frequency: v as Frequency })}>
                <SelectTrigger className="h-8 w-40 bg-card"><SelectValue /></SelectTrigger>
                <SelectContent>{Object.entries(FREQ).map(([k, v]) => <SelectItem key={k} value={k}>{v}</SelectItem>)}</SelectContent>
              </Select>
            </div>
          )}
          <div className="flex justify-between font-mono text-[10px] uppercase text-muted-foreground">
            <span>Última sincronización: {syncing ? "sincronizando…" : relTime(conn.lastSync)}</span>
            <span className="font-mono">{conn.imported} importadas</span>
          </div>
        </div>
      ) : (
        <div className="mt-4 space-y-2 border-t pt-3">
          {p.scopes.map((s) => <div key={s} className="flex items-center gap-2 text-xs text-muted-foreground"><span className="size-1.5 rounded-full bg-primary/70" />{s}</div>)}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {on ? (
          <>
            <Button size="sm" onClick={onSync} disabled={syncing}>
              {syncing ? <Loader2 className="animate-spin" /> : <RefreshCw />} Sincronizar ahora
            </Button>
            <Button size="sm" variant="outline" onClick={onImport}><Download /> Importar</Button>
            <Button size="icon" variant="ghost" className="ml-auto text-muted-foreground" onClick={onDisconnect} title="Desvincular"><Unlink /><span className="sr-only">Desvincular {p.name}</span></Button>
          </>
        ) : (
          <Button size="sm" onClick={onConnect}><Link2 /> Conectar {p.name}</Button>
        )}
      </div>
    </article>
  );
}

function ConnectDialog({ provider, onClose, onDone }: { provider: Provider | null; onClose: () => void; onDone: (p: Provider, account: string) => void }) {
  const [step, setStep] = useState<"consent" | "auth">("consent");
  useEffect(() => { if (provider) setStep("consent"); }, [provider]);
  if (!provider) return null;
  const authorize = () => {
    setStep("auth");
    setTimeout(() => onDone(provider, `corredor@${provider.id}.com`), 1600);
  };
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent>
        <DialogHeader>
          <div className="mb-2 flex items-center gap-3">
            <ProviderMark p={provider} size="size-10" />
            <span className="text-muted-foreground">⇄</span>
            <span className="grid size-10 place-items-center rounded-xl bg-primary font-bold text-primary-foreground">R</span>
          </div>
          <DialogTitle>Conectar {provider.name}</DialogTitle>
          <DialogDescription>Te llevaremos a {provider.name} para que autorices a RUN. Podrás desvincularlo en cualquier momento.</DialogDescription>
        </DialogHeader>
        {step === "consent" ? (
          <ul className="space-y-2 text-sm">
            {provider.scopes.map((s) => (
              <li key={s} className="flex items-center gap-2"><CheckCircle2 className="size-4 text-primary" /> Leer {s.toLowerCase()}</li>
            ))}
            <li className="flex items-center gap-2 text-muted-foreground"><XCircle className="size-4" /> RUN nunca publica en tu cuenta sin permiso</li>
          </ul>
        ) : (
          <div className="flex items-center gap-3 rounded-lg bg-muted p-4 text-sm"><Loader2 className="size-4 animate-spin" /> Esperando autorización de {provider.name}…</div>
        )}
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button onClick={authorize} disabled={step === "auth"}>Autorizar en {provider.name}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ImportDialog({ provider, importedIds, onClose, onImport }: {
  provider: Provider | null; importedIds: Set<string>; onClose: () => void; onImport: (p: Provider, a: RemoteActivity[]) => void;
}) {
  const [range, setRange] = useState("30");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const list = useMemo(() => (provider ? remoteActivities(provider.id, Number(range)) : []), [provider, range]);
  useEffect(() => { setSelected(new Set(list.filter((a) => !importedIds.has(a.id)).map((a) => a.id))); }, [list]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!provider) return null;
  const toggle = (id: string) => setSelected((s) => { const n = new Set(s); n.has(id) ? n.delete(id) : n.add(id); return n; });
  return (
    <Dialog open onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Importar desde {provider.name}</DialogTitle>
          <DialogDescription>Elige el periodo y las actividades que quieres traer a RUN.</DialogDescription>
        </DialogHeader>
        <div className="flex items-center justify-between gap-2">
          <Select value={range} onValueChange={setRange}>
            <SelectTrigger className="w-44"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="7">Últimos 7 días</SelectItem>
              <SelectItem value="30">Últimos 30 días</SelectItem>
              <SelectItem value="90">Últimos 90 días</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="ghost" size="sm" onClick={() => setSelected(selected.size ? new Set() : new Set(list.filter((a) => !importedIds.has(a.id)).map((a) => a.id)))}>
            {selected.size ? "Quitar selección" : "Seleccionar todo"}
          </Button>
        </div>
        <ul className="max-h-80 divide-y overflow-y-auto rounded-lg border">
          {list.map((a) => {
            const done = importedIds.has(a.id);
            return (
              <li key={a.id}>
                <label className={`flex items-center gap-3 px-3 py-2 text-sm ${done ? "opacity-50" : "cursor-pointer hover:bg-muted/60"}`}>
                  <Checkbox checked={done || selected.has(a.id)} disabled={done} onCheckedChange={() => toggle(a.id)} />
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-medium">{a.name}</p>
                    <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })} · {a.type}{done ? " · ya importada" : ""}</p>
                  </div>
                  <span className="font-mono text-xs">{a.distanceKm} km</span>
                </label>
              </li>
            );
          })}
        </ul>
        <DialogFooter>
          <Button variant="ghost" onClick={onClose}>Cancelar</Button>
          <Button disabled={!selected.size} onClick={() => onImport(provider, list.filter((a) => selected.has(a.id)))}>
            <Download /> Importar {selected.size} actividades
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function ActivityRow({ a }: { a: RemoteActivity }) {
  const p = PROVIDERS.find((x) => x.id === a.provider);
  if (!p) return null;
  const pace = a.durationMin / a.distanceKm;
  return (
    <li className="flex items-center gap-3 py-3 text-sm">
      <ProviderMark p={p} size="size-8" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{a.name}</p>
        <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString("es-ES", { weekday: "short", day: "numeric", month: "short" })} · {p.name}</p>
      </div>
      <div className="text-right font-mono text-xs">
        <p>{a.distanceKm} km</p>
        <p className="text-muted-foreground">{Math.floor(pace)}:{String(Math.round((pace % 1) * 60)).padStart(2, "0")} /km</p>
      </div>
    </li>
  );
}
