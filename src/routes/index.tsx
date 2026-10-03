import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { ChevronRight, Download, Watch } from "lucide-react";
import { AppShell, TopBar } from "@/components/app-shell";
import { RunPlusCard } from "@/components/premium-card";
import { ActivityRow, ProviderMark } from "@/components/activity-row";
import { Button } from "@/components/ui/button";
import {
  CONNS_KEY, IMPORTED_KEY, PROVIDERS, initialConnections, relTime,
  type Connection, type RemoteActivity,
} from "@/lib/integrations";
import { usePreferences } from "@/lib/preferences";
import { useStored } from "@/lib/run-store";

export const Route = createFileRoute("/")({
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

function Home() {
  const { t, distance, pace } = usePreferences();
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

        <section aria-label="Resumen semanal" className="grid grid-cols-2 gap-2 md:grid-cols-4 md:gap-3">
           <StatCard label={t("week")} value={displayTotal.value.toFixed(1)} detail={displayTotal.unit} active />
           <StatCard label={t("time")} value={timeStr} detail={t("moving")} />
           <StatCard label={t("avgPace")} value={displayPace?.value ?? "—"} detail={displayPace?.unit ?? (displayTotal.unit === "km" ? "min/km" : "min/mi")} />
           <StatCard label={t("sessions")} value={String(totalRuns)} detail={t("thisWeek")} />
        </section>

        <div className="grid gap-4 md:grid-cols-3">
          <section aria-label="Volumen semanal" className="rounded-md border bg-card p-3 md:col-span-2 md:rounded-lg md:p-5">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="hidden text-xs font-bold uppercase text-primary md:block">Entrenamiento</p>
                 <h2 className="font-display text-base uppercase md:mt-1 md:text-lg">{t("last7")}</h2>
              </div>
               <span className="shrink-0 font-mono text-[10px] text-muted-foreground md:text-xs">{displayTotal.value.toFixed(1)} {displayTotal.unit.toUpperCase()} {t("totalKm")}</span>
            </div>
            <div className="mt-4 flex h-28 items-end gap-1.5 md:mt-6 md:h-44 md:gap-3">
              {week.map((d) => (
                <div key={d.key} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                  <span className="h-4 font-mono text-[9px] leading-4 text-primary md:h-5 md:text-[10px] md:leading-5">{d.km > 0 ? d.km.toFixed(1) : ""}</span>
                  <div className="flex w-full flex-1 items-end">
                    <div
                      className={`w-full rounded-sm ${d.km > 0 ? "bg-primary/80" : "bg-muted"}`}
                      style={{ height: `${d.km > 0 ? Math.max(10, (d.km / maxKm) * 100) : 6}%` }}
                    />
                  </div>
                  <span className="text-[9px] font-semibold text-muted-foreground md:text-[10px]">{d.label}</span>
                </div>
              ))}
            </div>
          </section>

          <section aria-label="Conexiones" className="rounded-md border bg-card p-3 md:rounded-lg md:p-5">
            <div className="flex items-end justify-between gap-2">
              <div>
                <p className="hidden text-xs font-bold uppercase text-primary md:block">Integraciones</p>
                 <h2 className="font-display text-base uppercase md:mt-1 md:text-lg">{t("connections")}</h2>
              </div>
               <Link to="/dispositivos" className="shrink-0 text-xs font-semibold text-primary hover:underline">{t("manage")}</Link>
            </div>
            {connected.length === 0 ? (
              <div className="mt-4 rounded-md border border-dashed p-4 text-center">
                <Watch className="mx-auto mb-2 size-5 text-muted-foreground" />
                 <p className="text-xs text-muted-foreground md:text-sm">{t("noDevices")}</p>
                 <Button asChild size="sm" className="mt-3 min-h-11 md:min-h-8"><Link to="/dispositivos">{t("connectDevice")}</Link></Button>
              </div>
            ) : (
              <ul className="mt-2 divide-y md:mt-3">
                {connected.map((p) => (
                  <li key={p.id}>
                     <Link to="/dispositivos" className="flex w-full items-center gap-3 rounded-md px-1 py-2.5 text-left transition-colors hover:bg-muted/50">
                      <ProviderMark p={p} size="size-8 md:size-9" />
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold">{p.name}</p>
                        <p className="truncate font-mono text-[10px] uppercase text-muted-foreground">{relTime(conns[p.id].lastSync)}</p>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-muted-foreground" />
                     </Link>
                  </li>
                ))}
              </ul>
            )}
          </section>
        </div>

        <RunPlusCard compact />

        <section aria-label="Actividades recientes" className="rounded-md border bg-card p-3 md:rounded-lg md:p-5">
          <div className="flex items-end justify-between gap-2">
            <div>
              <p className="hidden text-xs font-bold uppercase text-primary md:block">Registro</p>
               <h2 className="font-display text-base uppercase md:mt-1 md:text-lg">{t("recentActivities")}</h2>
            </div>
            {imported.length > 0 && (
               <Link to="/dispositivos" className="shrink-0 text-xs font-semibold text-primary hover:underline">{t("viewAll")}</Link>
            )}
          </div>
          {imported.length === 0 ? (
            <div className="mt-4 flex min-h-24 flex-col items-center justify-center border border-dashed p-4 text-center md:mt-5 md:min-h-32 md:p-6">
              <Download className="mb-2 size-5 text-muted-foreground md:mb-3" />
               <p className="text-xs text-muted-foreground md:text-sm">{t("noActivities")}</p>
               <Button asChild size="sm" variant="outline" className="mt-3 min-h-11 md:min-h-8"><Link to="/dispositivos">{t("importNow")}</Link></Button>
            </div>
          ) : (
            <ul className="mt-2 divide-y md:mt-3">
              {imported.slice(0, 5).map((a) => <ActivityRow key={a.id} a={a} />)}
            </ul>
          )}
        </section>
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
