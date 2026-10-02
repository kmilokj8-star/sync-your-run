import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type LanguagePreference = "auto" | "es" | "en";
export type Units = "metric" | "imperial";
export type ThemePreference = "performance" | "contrast";

type Preferences = {
  language: LanguagePreference;
  units: Units;
  notifications: boolean;
  activityVisibility: "private" | "followers" | "public";
  theme: ThemePreference;
};

type Dictionary = typeof es;
export type TranslationKey = keyof Dictionary;

const es = {
  home: "Inicio", activity: "Actividad", devices: "Dispositivos", more: "Más", settings: "Ajustes",
  training: "Entrenamiento", protectedData: "Datos protegidos", revokeAnytime: "Tus permisos se pueden revocar en cualquier momento.", logout: "Salir",
  homeEyebrow: "Panel RUN / Resumen", homeTitle: "Inicio", homeSubtitle: "Tu semana de entrenamiento y el estado de tus dispositivos, en un vistazo.",
  week: "Semana", time: "Tiempo", moving: "en movimiento", avgPace: "Ritmo medio", sessions: "Sesiones", thisWeek: "esta semana",
  last7: "Últimos 7 días", totalKm: "KM TOTALES", connections: "Conexiones", manage: "Gestionar", noDevices: "Sin dispositivos conectados todavía.",
  connectDevice: "Conectar dispositivo", recentActivities: "Actividades recientes", viewAll: "Ver todas", noActivities: "Aún no has importado actividades. Conecta una app y trae tus entrenamientos.", importNow: "Importar ahora",
  moreTitle: "Más", moreSubtitle: "Tu cuenta, rendimiento, herramientas y preferencias.", athleteProfile: "Perfil del atleta", profileSummary: "Camilo Morales · Corredor", account: "Cuenta",
  devicesSensors: "Dispositivos y sensores", devicesSummary: "Relojes, apps y sincronización", performance: "Estadísticas y rendimiento", performanceSummary: "Zonas, récords y VO₂ Max",
  tools: "Entrenamiento y herramientas", toolsSummary: "Planes, rutas y carga", generalSettings: "Configuración general", settingsSummary: "Idioma, unidades, alertas y privacidad",
  help: "Ayuda e información", helpSummary: "Soporte, novedades y versión", profileTitle: "Perfil del atleta", editProfile: "Editar perfil", runnerSince: "Corredor desde 2024",
  weeklyGoal: "Objetivo semanal", preferredDistance: "Distancia favorita", performanceTitle: "Estadísticas y rendimiento", heartZones: "Zonas de frecuencia cardíaca",
  records: "Récords personales", estimatedVo2: "VO₂ Max estimado", notEnoughData: "Importa más actividades para mejorar esta estimación.", toolsTitle: "Entrenamiento y herramientas",
  plans: "Planes de entrenamiento", routes: "Rutas", trainingLoad: "Carga de entrenamiento", ctl: "Forma (CTL)", atl: "Fatiga (ATL)", tsb: "Balance (TSB)",
  settingsTitle: "Configuración general", language: "Idioma", automatic: "Automático (según dispositivo)", spanish: "Español", english: "Inglés",
  units: "Unidades de medida", metric: "Métrico (km / m)", imperial: "Imperial (mi / ft)", notifications: "Notificaciones y alertas", notificationsSummary: "Recordatorios de entrenamiento y sincronización",
  privacy: "Privacidad y seguridad", visibility: "Visibilidad de actividades", private: "Solo yo", followers: "Seguidores", public: "Público", appearance: "Personalización y tema", performanceTheme: "Rendimiento", contrastTheme: "Alto contraste",
  helpTitle: "Ayuda e información", support: "Centro de ayuda", contactSupport: "Contactar soporte", permissions: "Permisos y datos", version: "Versión de RUN", currentVersion: "Versión 1.0.0",
  back: "Volver", comingSoon: "Próximamente", connected: "conectados", connectedSingular: "conectado", syncNow: "Sincronizar ahora", appsDevices: "Apps y dispositivos",
  devicesSubtitle: "Centraliza tus datos de entrenamiento, salud y rendimiento en un solo lugar.", systemOnline: "Sistema operativo", syncAll: "Sincronizar todo", connectedStat: "Conectadas", importedStat: "Importadas", activeStat: "activas", dataSources: "Fuentes de datos", yourConnections: "Tus conexiones", online: "EN LÍNEA", log: "Registro", importedActivities: "Actividades importadas", clear: "Vaciar", emptyImports: "Todavía no has importado actividades. Conecta una app y pulsa “Importar”.", linked: "Vinculado", disconnected: "Sin conexión", error: "Error", autoSync: "Sincronización automática", frequency: "Frecuencia", realtime: "En tiempo real", hourly: "Cada hora", daily: "Una vez al día", lastSync: "Última sincronización", syncing: "sincronizando…", imported: "importadas", sync: "Sincronizar", import: "Importar", unlink: "Desvincular", connect: "Conectar", cancel: "Cancelar", authorize: "Autorizar en", connectIntro: "Te llevaremos al servicio para que autorices a RUN. Podrás desvincularlo en cualquier momento.", neverPublishes: "RUN nunca publica en tu cuenta sin permiso", waitingAuthorization: "Esperando autorización…", choosePeriod: "Elige el periodo y las actividades que quieres traer a RUN.", lastDays: "Últimos {days} días", selectAll: "Seleccionar todo", clearSelection: "Quitar selección", alreadyImported: "ya importada",
};

const en: Dictionary = {
  home: "Home", activity: "Activity", devices: "Devices", more: "More", settings: "Settings",
  training: "Training", protectedData: "Protected data", revokeAnytime: "You can revoke your permissions at any time.", logout: "Log out",
  homeEyebrow: "RUN dashboard / Overview", homeTitle: "Home", homeSubtitle: "Your training week and connected devices at a glance.",
  week: "Week", time: "Time", moving: "moving", avgPace: "Average pace", sessions: "Sessions", thisWeek: "this week",
  last7: "Last 7 days", totalKm: "TOTAL", connections: "Connections", manage: "Manage", noDevices: "No devices connected yet.",
  connectDevice: "Connect device", recentActivities: "Recent activities", viewAll: "View all", noActivities: "No activities imported yet. Connect an app to bring in your training.", importNow: "Import now",
  moreTitle: "More", moreSubtitle: "Your account, performance, tools and preferences.", athleteProfile: "Athlete profile", profileSummary: "Camilo Morales · Runner", account: "Account",
  devicesSensors: "Devices and sensors", devicesSummary: "Watches, apps and sync", performance: "Stats and performance", performanceSummary: "Zones, records and VO₂ Max",
  tools: "Training and tools", toolsSummary: "Plans, routes and load", generalSettings: "General settings", settingsSummary: "Language, units, alerts and privacy",
  help: "Help and information", helpSummary: "Support, updates and version", profileTitle: "Athlete profile", editProfile: "Edit profile", runnerSince: "Runner since 2024",
  weeklyGoal: "Weekly goal", preferredDistance: "Favorite distance", performanceTitle: "Stats and performance", heartZones: "Heart rate zones",
  records: "Personal records", estimatedVo2: "Estimated VO₂ Max", notEnoughData: "Import more activities to improve this estimate.", toolsTitle: "Training and tools",
  plans: "Training plans", routes: "Routes", trainingLoad: "Training load", ctl: "Fitness (CTL)", atl: "Fatigue (ATL)", tsb: "Balance (TSB)",
  settingsTitle: "General settings", language: "Language", automatic: "Automatic (device language)", spanish: "Spanish", english: "English",
  units: "Measurement units", metric: "Metric (km / m)", imperial: "Imperial (mi / ft)", notifications: "Notifications and alerts", notificationsSummary: "Training and sync reminders",
  privacy: "Privacy and security", visibility: "Activity visibility", private: "Only me", followers: "Followers", public: "Public", appearance: "Personalization and theme", performanceTheme: "Performance", contrastTheme: "High contrast",
  helpTitle: "Help and information", support: "Help center", contactSupport: "Contact support", permissions: "Permissions and data", version: "RUN version", currentVersion: "Version 1.0.0",
  back: "Back", comingSoon: "Coming soon", connected: "connected", connectedSingular: "connected", syncNow: "Sync now", appsDevices: "Apps and devices",
  devicesSubtitle: "Bring your training, health and performance data together in one place.", systemOnline: "System online", syncAll: "Sync all", connectedStat: "Connected", importedStat: "Imported", activeStat: "active", dataSources: "Data sources", yourConnections: "Your connections", online: "ONLINE", log: "Log", importedActivities: "Imported activities", clear: "Clear", emptyImports: "No activities imported yet. Connect an app and tap “Import”.", linked: "Linked", disconnected: "Not connected", error: "Error", autoSync: "Automatic sync", frequency: "Frequency", realtime: "Real time", hourly: "Hourly", daily: "Once a day", lastSync: "Last sync", syncing: "syncing…", imported: "imported", sync: "Sync", import: "Import", unlink: "Unlink", connect: "Connect", cancel: "Cancel", authorize: "Authorize with", connectIntro: "We will take you to the service to authorize RUN. You can unlink it at any time.", neverPublishes: "RUN never posts to your account without permission", waitingAuthorization: "Waiting for authorization…", choosePeriod: "Choose the period and activities you want to bring into RUN.", lastDays: "Last {days} days", selectAll: "Select all", clearSelection: "Clear selection", alreadyImported: "already imported",
};

const STORAGE_KEY = "run_preferences_v1";
const defaults: Preferences = { language: "auto", units: "metric", notifications: true, activityVisibility: "private", theme: "performance" };

type PreferencesContextValue = Preferences & {
  locale: "es" | "en";
  t: (key: TranslationKey) => string;
  update: (patch: Partial<Preferences>) => void;
  distance: (km: number) => { value: number; unit: "km" | "mi" };
  pace: (minutesPerKm: number) => { value: string; unit: "min/km" | "min/mi" };
};

const PreferencesContext = createContext<PreferencesContextValue | null>(null);

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [preferences, setPreferences] = useState<Preferences>(defaults);
  const [browserLanguage, setBrowserLanguage] = useState<"es" | "en">("es");

  useEffect(() => {
    const detected = navigator.language.toLowerCase().startsWith("es") ? "es" : "en";
    setBrowserLanguage(detected);

    const load = () => {
      try {
        const saved = localStorage.getItem(STORAGE_KEY);
        if (saved) setPreferences({ ...defaults, ...JSON.parse(saved) });
      } catch { /* Keep current preferences when storage is unavailable. */ }
    };

    load();

    const onStorage = (event: StorageEvent) => {
      if (event.key === STORAGE_KEY) load();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const locale = preferences.language === "auto" ? browserLanguage : preferences.language;
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.classList.toggle("run-high-contrast", preferences.theme === "contrast");
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(preferences)); } catch { /* Keep current session state. */ }
  }, [locale, preferences]);

  const value = useMemo<PreferencesContextValue>(() => ({
    ...preferences,
    locale,
    t: (key) => (locale === "es" ? es : en)[key],
    update: (patch) => setPreferences((current) => ({ ...current, ...patch })),
    distance: (km) => preferences.units === "metric" ? { value: km, unit: "km" } : { value: km * 0.621371, unit: "mi" },
    pace: (minutesPerKm) => {
      const value = preferences.units === "metric" ? minutesPerKm : minutesPerKm / 0.621371;
      return { value: `${Math.floor(value)}:${String(Math.round((value % 1) * 60)).padStart(2, "0")}`, unit: preferences.units === "metric" ? "min/km" : "min/mi" };
    },
  }), [browserLanguage, locale, preferences]);

  return <PreferencesContext.Provider value={value}>{children}</PreferencesContext.Provider>;
}

export function usePreferences() {
  const value = useContext(PreferencesContext);
  if (!value) throw new Error("usePreferences must be used inside PreferencesProvider");
  return value;
}