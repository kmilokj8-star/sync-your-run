import { useCallback, useEffect, useState } from "react";
import { IMPORTED_KEY, type ProviderId, type RemoteActivity } from "@/lib/integrations";

export type ActivitySource = ProviderId | "manual" | "record";
export type RunActivity = {
  id: string;
  name: string;
  date: string;
  distanceKm: number;
  durationMin: number;
  type: RemoteActivity["type"];
  source: ActivitySource;
  shoeId?: string | undefined;
  notes?: string;
};
export type PlannedWorkout = { id: string; date: string; title: string; distanceKm: number; done?: boolean; planId?: string };
export type Shoe = { id: string; name: string; brand: string; initialKm: number; maxKm: number; isDefault: boolean; retired: boolean };

export const KEYS = {
  manual: "run_manual_v1",
  planned: "run_planned_v1",
  challenges: "run_challenges_v1",
  redeemed: "run_redeemed_v1",
  shoes: "run_shoes_v1",
  activePlan: "run_active_plan_v1",
  readNotifs: "run_read_notifs_v1",
};

const EVENT = "run-store-change";

function read<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? (JSON.parse(raw) as T) : fallback;
  } catch {
    return fallback;
  }
}

/** localStorage-backed state shared across every mounted component. */
export function useStored<T>(key: string, fallback: T) {
  const [value, setValue] = useState<T>(fallback);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    setValue(read(key, fallback));
    setLoaded(true);
    const sync = (e: Event) => {
      const k = (e as CustomEvent<string>).detail ?? (e as StorageEvent).key;
      if (k === key) setValue(read(key, fallback));
    };
    window.addEventListener(EVENT, sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener("storage", sync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);
  const set = useCallback(
    (next: T | ((prev: T) => T)) => {
      const current = read(key, fallback);
      const resolved = typeof next === "function" ? (next as (p: T) => T)(current) : next;
      try { localStorage.setItem(key, JSON.stringify(resolved)); } catch { /* ignore */ }
      setValue(resolved);
      window.dispatchEvent(new CustomEvent(EVENT, { detail: key }));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key],
  );
  return [value, set, loaded] as const;
}

/** Imported (device) activities + manual/recorded ones, newest first. */
export function useAllActivities() {
  const [imported] = useStored<RemoteActivity[]>(IMPORTED_KEY, []);
  const [manual, setManual] = useStored<RunActivity[]>(KEYS.manual, []);
  const all: RunActivity[] = [
    ...manual,
    ...imported.map((a) => ({ ...a, source: a.provider as ActivitySource })),
  ].sort((a, b) => b.date.localeCompare(a.date));
  return { all, manual, setManual };
}

export const uid = () => Math.random().toString(36).slice(2, 10);
export const dayKey = (d: Date | string) => {
  const x = new Date(d);
  return `${x.getFullYear()}-${String(x.getMonth() + 1).padStart(2, "0")}-${String(x.getDate()).padStart(2, "0")}`;
};

export type Challenge = { id: string; es: string; en: string; descEs: string; descEn: string; goalKm: number; points: number; days: number };
export const CHALLENGES: Challenge[] = [
  { id: "c50", es: "50 km este mes", en: "50 km this month", descEs: "Acumula 50 km en 30 días.", descEn: "Log 50 km in 30 days.", goalKm: 50, points: 200, days: 30 },
  { id: "c100", es: "Club de los 100", en: "100 Club", descEs: "Corre 100 km en 30 días.", descEn: "Run 100 km in 30 days.", goalKm: 100, points: 500, days: 30 },
  { id: "c21", es: "Media maratón semanal", en: "Weekly half marathon", descEs: "Suma 21,1 km en 7 días.", descEn: "Add up 21.1 km in 7 days.", goalKm: 21.1, points: 120, days: 7 },
  { id: "c10", es: "Primeros 10K", en: "First 10K", descEs: "Completa 10 km en 7 días.", descEn: "Complete 10 km in 7 days.", goalKm: 10, points: 50, days: 7 },
];

export type Plan = { id: string; es: string; en: string; level: string; weeks: number; perWeek: number[] };
export const PLANS: Plan[] = [
  { id: "p5k", es: "Mi primer 5K", en: "My first 5K", level: "Principiante", weeks: 6, perWeek: [3, 3, 4] },
  { id: "p10k", es: "10K en 8 semanas", en: "10K in 8 weeks", level: "Intermedio", weeks: 8, perWeek: [5, 6, 8, 4] },
  { id: "p21k", es: "Media maratón", en: "Half marathon", level: "Intermedio", weeks: 12, perWeek: [6, 8, 10, 14] },
  { id: "p42k", es: "Maratón", en: "Marathon", level: "Avanzado", weeks: 16, perWeek: [8, 10, 12, 16, 24] },
];

export function kmSince(all: RunActivity[], days: number) {
  const since = Date.now() - days * 86400000;
  return all.filter((a) => new Date(a.date).getTime() >= since).reduce((s, a) => s + a.distanceKm, 0);
}
