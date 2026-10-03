import { PROVIDERS, type Provider, type RemoteActivity, type ProviderId } from "@/lib/integrations";
import { usePreferences } from "@/lib/preferences";

export function ProviderMark({ p, size = "size-11" }: { p: Provider; size?: string }) {
  const brandClass: Partial<Record<ProviderId, string>> = { garmin: "bg-sky-600", strava: "bg-orange-600", apple: "bg-rose-500", coros: "bg-neutral-800" };
  return (
    <div className={`${size} ${brandClass[p.id] ?? "bg-muted"} grid shrink-0 place-items-center rounded-lg text-lg font-bold text-primary-foreground`}>
      {p.id === "apple" ? "♥" : p.short}
    </div>
  );
}

export function ActivityRow({ a }: { a: RemoteActivity }) {
  const { locale, distance, pace } = usePreferences();
  const p = PROVIDERS.find((x) => x.id === a.provider);
  if (!p) return null;
  const displayDistance = distance(a.distanceKm);
  const displayPace = pace(a.durationMin / a.distanceKm);
  return (
    <li className="flex items-center gap-3 py-3 text-sm">
      <ProviderMark p={p} size="size-8" />
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{a.name}</p>
        <p className="text-xs text-muted-foreground">{new Date(a.date).toLocaleDateString(locale === "es" ? "es-ES" : "en-US", { weekday: "short", day: "numeric", month: "short" })} · {p.name}</p>
      </div>
      <div className="text-right font-mono text-xs">
        <p>{displayDistance.value.toFixed(1)} {displayDistance.unit}</p>
        <p className="text-muted-foreground">{displayPace.value} {displayPace.unit}</p>
      </div>
    </li>
  );
}
