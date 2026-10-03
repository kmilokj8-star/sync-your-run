export type ProviderId = "garmin" | "strava" | "apple" | "coros" | "trainingpeaks" | "adidas" | "suunto" | "polar" | "amazfit" | "samsung" | "huawei";

export type Provider = {
  id: ProviderId;
  name: string;
  short: string;
  description: string;
  kind: string;
  scopes: string[];
  swatch: string; // brand colour for the provider badge (third-party brand, not app theme)
};

export const PROVIDERS: Provider[] = [
  { id: "trainingpeaks", name: "TrainingPeaks", short: "TP", description: "Planes y análisis de entrenamiento estructurado.", kind: "Entrenamiento", scopes: ["Workouts","Planes","Actividades"], swatch: "#1677FF" },
  { id: "adidas", name: "adidas Running", short: "A", description: "Carreras, objetivos y retos desde adidas Running.", kind: "Running app", scopes: ["Actividades","Perfil","Retos"], swatch: "#000000" },
  { id: "suunto", name: "Suunto", short: "S", description: "Relojes outdoor con GPS, rutas y entrenamiento.", kind: "Reloj GPS", scopes: ["Actividades","Rutas","Entrenamientos"], swatch: "#111111" },
  { id: "polar", name: "Polar Flow", short: "P", description: "Entrenamiento, frecuencia cardiaca y recuperación.", kind: "Reloj GPS", scopes: ["Actividades","FC","Sueño"], swatch: "#D71920" },
  { id: "amazfit", name: "Amazfit", short: "A", description: "Relojes y datos deportivos de Amazfit.", kind: "Reloj GPS", scopes: ["Actividades","FC","Sueño"], swatch: "#1A1A1A" },
  { id: "samsung", name: "Samsung Health", short: "S", description: "Entrenamientos y salud desde Galaxy Watch y Samsung Health.", kind: "Salud / Wearable", scopes: ["Entrenamientos","FC","Salud"], swatch: "#1428A0" },
  { id: "huawei", name: "Huawei Health", short: "H", description: "Entrenamientos y salud desde wearables Huawei.", kind: "Salud / Wearable", scopes: ["Entrenamientos","FC","Salud"], swatch: "#CF0A2C" },
  {
    id: "garmin",
    name: "Garmin Connect",
    short: "G",
    description: "Relojes Forerunner, Fenix y Edge. Importa carreras con GPS, ritmo y frecuencia cardiaca.",
    kind: "Reloj GPS",
    scopes: ["Actividades", "Frecuencia cardiaca", "Sueño"],
    swatch: "#007CC3",
  },
  {
    id: "strava",
    name: "Strava",
    short: "S",
    description: "Sincroniza tus actividades públicas y privadas, segmentos y kudos.",
    kind: "Red social",
    scopes: ["Actividades", "Rutas", "Perfil"],
    swatch: "#FC4C02",
  },
  {
    id: "apple",
    name: "Apple Health",
    short: "",
    description: "Entrenamientos del Apple Watch y datos de salud desde tu iPhone.",
    kind: "Salud",
    scopes: ["Entrenamientos", "Frecuencia cardiaca", "Pasos"],
    swatch: "#FF2D55",
  },
  {
    id: "coros",
    name: "Coros",
    short: "C",
    description: "Relojes Pace, Apex y Vertix. Datos de carrera, potencia y carga de entrenamiento.",
    kind: "Reloj GPS",
    scopes: ["Actividades", "Carga", "Potencia"],
    swatch: "#1A1A1A",
  },
];

export type Frequency = "realtime" | "hourly" | "daily";

export type Connection = {
  status: "connected" | "disconnected" | "error";
  account?: string;
  connectedAt?: string;
  lastSync?: string;
  autoSync: boolean;
  frequency: Frequency;
  imported: number;
};

export type RemoteActivity = {
  id: string;
  provider: ProviderId;
  name: string;
  date: string;
  distanceKm: number;
  durationMin: number;
  type: "Carrera" | "Trail" | "Rodaje" | "Series";
};

const NAMES = ["Rodaje matinal", "Series 6x800", "Tirada larga", "Trail en la sierra", "Recuperación suave", "Fartlek", "Tempo 10K", "Cuestas"];
const TYPES: RemoteActivity["type"][] = ["Rodaje", "Series", "Carrera", "Trail", "Rodaje", "Series", "Carrera", "Series"];

/** Deterministic sample of activities available on the provider side. */
export function remoteActivities(provider: ProviderId, days: number): RemoteActivity[] {
  const seed = provider.charCodeAt(0) + provider.length;
  const out: RemoteActivity[] = [];
  const now = Date.now();
  for (let i = 0; i < days; i += 1 + ((i + seed) % 2)) {
    const k = (i + seed) % NAMES.length;
    out.push({
      id: `${provider}-${i}`,
      provider,
      name: NAMES[k]!,
      type: TYPES[k]!,
      date: new Date(now - i * 86400000).toISOString(),
      distanceKm: Math.round((5 + ((i * 7 + seed) % 17)) * 10) / 10,
      durationMin: Math.round((5 + ((i * 7 + seed) % 17)) * (4.5 + ((i * 3 + seed) % 20) / 10)),
    });
  }
  return out;
}

export function relTime(iso?: string) {
  if (!iso) return "Nunca";
  const m = Math.round((Date.now() - new Date(iso).getTime()) / 60000);
  if (m < 1) return "Hace un momento";
  if (m < 60) return `Hace ${m} min`;
  const h = Math.round(m / 60);
  if (h < 24) return `Hace ${h} h`;
  return `Hace ${Math.round(h / 24)} d`;
}

export const CONNS_KEY = "run_connections_v1";
export const IMPORTED_KEY = "run_imported_v1";

export const emptyConnection = (): Connection => ({ status: "disconnected", autoSync: true, frequency: "hourly", imported: 0 });

export const initialConnections = () =>
  Object.fromEntries(PROVIDERS.map((p) => [p.id, emptyConnection()])) as Record<ProviderId, Connection>;
