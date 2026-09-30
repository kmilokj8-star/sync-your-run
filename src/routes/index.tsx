import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  Activity, CalendarDays, CheckCircle2, Download, Home, Link2, Loader2, LogOut, RefreshCw, Settings, Trophy, Unlink, Watch, XCircle,
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
    <div className="flex min-h-screen bg-background">
      <Sidebar />
      <main className="flex-1 px-4 py-8 md:px-10">
        <div className="mx-auto max-w-5xl space-y-8">
          <header className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-primary">Ajustes · Integraciones</p>
              <h1 className="mt-1 text-3xl font-bold tracking-tight">Apps y dispositivos</h1>
              <p className="mt-1 max-w-xl text-sm text-muted-foreground">
                Vincula tus relojes y apps de running para traer tus actividades a RUN automáticamente o cuando tú quieras.
              </p>
            </div>
            <Button disabled={!connected.length || !!syncing} onClick={async () => { for (const p of connected) await syncNow(p); }}>
              <RefreshCw className={syncing ? "animate-spin" : ""} /> Sincronizar todo
            </Button>
          </header>

          <section className="grid gap-3 sm:grid-cols-3">
            <Stat label="Conectadas" value={`${connected.length}/${PROVIDERS.length}`} />
            <Stat label="Actividades importadas" value={String(imported.length)} />
            <Stat label="Sincronización automática" value={String(connected.filter((p) => conns[p.id].autoSync).length) + " activas"} />
          </section>

          <section className="grid gap-4 md:grid-cols-2">
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

          <section className="rounded-xl border bg-card p-5">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold">Actividades importadas</h2>
              {imported.length > 0 && (
                <Button variant="ghost" size="sm" onClick={() => { setImported([]); setConns((c) => Object.fromEntries(Object.entries(c).map(([k, v]) => [k, { ...v, imported: 0 }])) as typeof c); }}>
                  Vaciar
                </Button>
              )}
            </div>
            {imported.length === 0 ? (
              <p className="mt-6 py-8 text-center text-sm text-muted-foreground">Todavía no has importado actividades. Conecta una app y pulsa “Importar”.</p>
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
    <aside className="hidden w-60 shrink-0 flex-col border-r bg-sidebar p-4 md:flex">
      <div className="mb-8 flex items-center gap-2 px-2">
        <span className="size-8 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} />
        <span className="text-2xl font-extrabold tracking-tight" style={{ fontFamily: "var(--font-display)" }}>run</span>
      </div>
      <nav className="space-y-1">
        {items.map(({ icon: I, label, active }) => (
          <div key={label} className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm ${active ? "bg-accent font-semibold text-accent-foreground" : "text-muted-foreground"}`}>
            <I className="size-4" /> {label}
          </div>
        ))}
      </nav>
      <div className="mt-auto flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground"><LogOut className="size-4" /> Salir</div>
    </aside>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-xl border bg-card p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className="mt-1 font-mono text-2xl font-semibold">{value}</p>
    </div>
  );
}

function ProviderMark({ p, size = "size-11" }: { p: Provider; size?: string }) {
  return (
    <div className={`${size} grid shrink-0 place-items-center rounded-xl text-lg font-bold text-primary-foreground`} style={{ backgroundColor: p.swatch, color: "#fff" }}>
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
    <article className={`flex flex-col rounded-xl border bg-card p-5 transition ${on ? "ring-1 ring-primary/40" : ""}`}>
      <div className="flex items-start gap-3">
        <ProviderMark p={p} />
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h3 className="font-semibold">{p.name}</h3>
            {on ? (
              <Badge className="gap-1"><CheckCircle2 className="size-3" /> Vinculado</Badge>
            ) : conn.status === "error" ? (
              <Badge variant="destructive" className="gap-1"><XCircle className="size-3" /> Error</Badge>
            ) : (
              <Badge variant="secondary">No vinculado</Badge>
            )}
          </div>
          <p className="text-xs text-muted-foreground">{on ? conn.account : p.kind}</p>
        </div>
      </div>
      <p className="mt-3 text-sm text-muted-foreground">{p.description}</p>

      {on ? (
        <div className="mt-4 space-y-3 rounded-lg bg-muted/60 p-3 text-sm">
          <div className="flex items-center justify-between">
            <span>Sincronización automática</span>
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
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Última sincronización: {syncing ? "sincronizando…" : relTime(conn.lastSync)}</span>
            <span className="font-mono">{conn.imported} importadas</span>
          </div>
        </div>
      ) : (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {p.scopes.map((s) => <span key={s} className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">{s}</span>)}
        </div>
      )}

      <div className="mt-auto flex flex-wrap gap-2 pt-4">
        {on ? (
          <>
            <Button size="sm" onClick={onSync} disabled={syncing}>
              {syncing ? <Loader2 className="animate-spin" /> : <RefreshCw />} Sincronizar ahora
            </Button>
            <Button size="sm" variant="outline" onClick={onImport}><Download /> Importar</Button>
            <Button size="sm" variant="ghost" className="ml-auto text-muted-foreground" onClick={onDisconnect}><Unlink /> Desvincular</Button>
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
  const p = PROVIDERS.find((x) => x.id === a.provider)!;
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
