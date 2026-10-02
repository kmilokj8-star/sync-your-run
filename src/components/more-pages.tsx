import { Link } from "@tanstack/react-router";
import {
  Activity, Bell, BookOpen, CalendarDays, ChevronLeft, ChevronRight, CircleHelp, Footprints, Gauge, Gift, Globe2, HeartPulse, Languages,
  LockKeyhole, Map, Medal, Palette, Route, Ruler, ShieldCheck, SlidersHorizontal, Target, Trophy, UserRound, Watch,
} from "lucide-react";
import { AppShell, TopBar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { usePreferences } from "@/lib/preferences";
import { CONNS_KEY, initialConnections, PROVIDERS } from "@/lib/integrations";
import { useState, type ReactNode } from "react";
import { useStored } from "@/lib/run-store";

type MoreRoute = "/mas/perfil" | "/mas/rendimiento" | "/mas/entrenamiento" | "/mas/configuracion" | "/mas/ayuda" | "/dispositivos" | "/calendario" | "/planes" | "/equipo" | "/retos" | "/puntos" | "/notificaciones";

export function MoreHome() {
  const { t, locale } = usePreferences();
  const L = (es: string, en: string) => (locale === "es" ? es : en);
  const [conns] = useStored(CONNS_KEY, initialConnections());
  const connected = PROVIDERS.filter((provider) => conns[provider.id].status === "connected").length;

  return (
    <Page title={t("moreTitle")} subtitle={t("moreSubtitle")}>
      <Link to="/mas/perfil" className="flex min-h-20 items-center gap-3 border-y bg-card px-3 py-3 transition-colors hover:bg-muted/60 md:rounded-md md:border">
        <div className="grid size-12 shrink-0 place-items-center rounded-full bg-primary/15 text-primary"><UserRound className="size-6" /></div>
        <div className="min-w-0 flex-1"><p className="font-semibold">{t("profileSummary")}</p><p className="text-xs text-muted-foreground">{t("runnerSince")}</p></div>
        <ChevronRight className="size-5 text-muted-foreground" />
      </Link>
      <MenuGroup label={t("account")}>
        <MenuRow to="/dispositivos" icon={<Watch />} title={t("devicesSensors")} subtitle={`${connected} ${connected === 1 ? t("connectedSingular") : t("connected")}`} />
        <MenuRow to="/mas/rendimiento" icon={<Gauge />} title={t("performance")} subtitle={t("performanceSummary")} />
        <MenuRow to="/mas/entrenamiento" icon={<Route />} title={t("tools")} subtitle={t("toolsSummary")} />
      </MenuGroup>
      <MenuGroup label={L("Entrenamiento", "Training")}>
        <MenuRow to="/calendario" icon={<CalendarDays />} title={L("Calendario", "Calendar")} subtitle={L("Entrenos realizados y planificados", "Completed and planned workouts")} />
        <MenuRow to="/planes" icon={<BookOpen />} title={L("Planes", "Plans")} subtitle={L("De 5K a maratón", "From 5K to marathon")} />
        <MenuRow to="/equipo" icon={<Footprints />} title={L("Equipo", "Gear")} subtitle={L("Kilometraje de zapatillas", "Shoe mileage")} />
      </MenuGroup>
      <MenuGroup label={L("Comunidad", "Community")}>
        <MenuRow to="/retos" icon={<Trophy />} title={L("Retos", "Challenges")} subtitle={L("Únete y gana puntos", "Join and earn points")} />
        <MenuRow to="/puntos" icon={<Gift />} title={L("Puntos", "Points")} subtitle={L("Canjea Premium", "Redeem Premium")} />
        <MenuRow to="/notificaciones" icon={<Bell />} title={L("Notificaciones", "Notifications")} subtitle={L("Avisos y novedades", "Alerts and updates")} />
      </MenuGroup>
      <MenuGroup label={t("settings")}>
        <MenuRow to="/mas/configuracion" icon={<SlidersHorizontal />} title={t("generalSettings")} subtitle={t("settingsSummary")} />
        <MenuRow to="/mas/ayuda" icon={<CircleHelp />} title={t("help")} subtitle={t("helpSummary")} />
      </MenuGroup>
    </Page>
  );
}

export function ProfilePage() {
  const { t, units } = usePreferences();
  return <Page title={t("profileTitle")} back>
    <section className="border-y bg-card p-4 md:rounded-md md:border">
      <div className="flex items-center gap-4"><div className="grid size-16 place-items-center rounded-full bg-primary text-xl font-bold text-primary-foreground">CM</div><div><h2 className="text-lg font-bold">Camilo Morales</h2><p className="text-sm text-muted-foreground">{t("runnerSince")}</p></div></div>
      <Button variant="outline" className="mt-4 w-full">{t("editProfile")}</Button>
    </section>
    <div className="grid grid-cols-2 gap-2"><Metric label={t("weeklyGoal")} value={units === "metric" ? "35 km" : "21.7 mi"} /><Metric label={t("preferredDistance")} value="10K" /></div>
  </Page>;
}

export function PerformancePage() {
  const { t } = usePreferences();
  return <Page title={t("performanceTitle")} back>
    <div className="grid grid-cols-2 gap-2 md:grid-cols-3"><Metric label={t("estimatedVo2")} value="48" active /><Metric label={t("records")} value="4" /><Metric label={t("heartZones")} value="5" /></div>
    <MenuGroup label={t("performance")}><InfoRow icon={<HeartPulse />} title={t("heartZones")} value="Z2 · 142–156" /><InfoRow icon={<Medal />} title={t("records")} value="10K · 47:32" /><InfoRow icon={<Gauge />} title={t("estimatedVo2")} value="48 ml/kg/min" /></MenuGroup>
    <p className="px-1 text-xs text-muted-foreground">{t("notEnoughData")}</p>
  </Page>;
}

export function TrainingPage() {
  const { t } = usePreferences();
  return <Page title={t("toolsTitle")} back>
    <div className="grid grid-cols-3 gap-2"><Metric label={t("ctl")} value="42" active /><Metric label={t("atl")} value="51" /><Metric label={t("tsb")} value="−9" /></div>
    <MenuGroup label={t("training")}><InfoRow icon={<Target />} title={t("plans")} value={t("comingSoon")} /><InfoRow icon={<Map />} title={t("routes")} value={t("comingSoon")} /><InfoRow icon={<Activity />} title={t("trainingLoad")} value="Óptima" /></MenuGroup>
  </Page>;
}

export function SettingsPage() {
  const p = usePreferences();
  return <Page title={p.t("settingsTitle")} back>
    <SettingsGroup label={p.t("language")} icon={<Languages />}>
      <Select value={p.language} onValueChange={(value) => p.update({ language: value as typeof p.language })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="auto">{p.t("automatic")}</SelectItem><SelectItem value="es">{p.t("spanish")}</SelectItem><SelectItem value="en">{p.t("english")}</SelectItem></SelectContent></Select>
    </SettingsGroup>
    <SettingsGroup label={p.t("units")} icon={<Ruler />}>
      <Select value={p.units} onValueChange={(value) => p.update({ units: value as typeof p.units })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="metric">{p.t("metric")}</SelectItem><SelectItem value="imperial">{p.t("imperial")}</SelectItem></SelectContent></Select>
    </SettingsGroup>
    <SettingsGroup label={p.t("notifications")} description={p.t("notificationsSummary")} icon={<Bell />} action={<Switch checked={p.notifications} onCheckedChange={(value) => p.update({ notifications: value })} />} />
    <SettingsGroup label={p.t("privacy")} icon={<LockKeyhole />}>
      <Select value={p.activityVisibility} onValueChange={(value) => p.update({ activityVisibility: value as typeof p.activityVisibility })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="private">{p.t("private")}</SelectItem><SelectItem value="followers">{p.t("followers")}</SelectItem><SelectItem value="public">{p.t("public")}</SelectItem></SelectContent></Select>
    </SettingsGroup>
    <SettingsGroup label={p.t("appearance")} icon={<Palette />}>
      <Select value={p.theme} onValueChange={(value) => p.update({ theme: value as typeof p.theme })}><SelectTrigger className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectItem value="performance">{p.t("performanceTheme")}</SelectItem><SelectItem value="contrast">{p.t("contrastTheme")}</SelectItem></SelectContent></Select>
    </SettingsGroup>
  </Page>;
}

export function HelpPage() {
  const { t } = usePreferences();
  return <Page title={t("helpTitle")} back><MenuGroup label={t("help")}><InfoRow icon={<CircleHelp />} title={t("support")} value={t("comingSoon")} /><InfoRow icon={<Globe2 />} title={t("contactSupport")} value="support@run.app" /><InfoRow icon={<ShieldCheck />} title={t("permissions")} value={t("manage")} /><InfoRow icon={<Activity />} title={t("version")} value={t("currentVersion")} /></MenuGroup></Page>;
}

function Page({ title, subtitle, back = false, children }: { title: string; subtitle?: string; back?: boolean; children: ReactNode }) {
  const { t } = usePreferences();
  return <AppShell><div className="mx-auto max-w-3xl space-y-4 md:space-y-6"><TopBar /><header className="border-b pb-3 md:pb-5">{back && <Button asChild variant="ghost" size="sm" className="mb-2 -ml-3"><Link to="/mas"><ChevronLeft />{t("back")}</Link></Button>}<h1 className="font-display text-2xl uppercase md:text-4xl">{title}</h1>{subtitle && <p className="mt-1 text-xs text-muted-foreground md:text-sm">{subtitle}</p>}</header>{children}</div></AppShell>;
}

function MenuGroup({ label, children }: { label: string; children: ReactNode }) { return <section><p className="mb-2 px-1 text-[10px] font-bold uppercase text-primary">{label}</p><div className="divide-y border-y bg-card md:rounded-md md:border">{children}</div></section>; }
function MenuRow({ to, icon, title, subtitle }: { to: MoreRoute; icon: ReactNode; title: string; subtitle: string }) { return <Link to={to} className="flex min-h-16 items-center gap-3 px-3 py-2.5 transition-colors hover:bg-muted/60"><span className="text-primary [&>svg]:size-5">{icon}</span><span className="min-w-0 flex-1"><span className="block text-sm font-semibold">{title}</span><span className="block truncate text-xs text-muted-foreground">{subtitle}</span></span><ChevronRight className="size-4 text-muted-foreground" /></Link>; }
function InfoRow({ icon, title, value }: { icon: ReactNode; title: string; value: string }) { return <div className="flex min-h-16 items-center gap-3 px-3 py-2.5"><span className="text-primary [&>svg]:size-5">{icon}</span><span className="min-w-0 flex-1 text-sm font-semibold">{title}</span><span className="max-w-[45%] text-right font-mono text-xs text-muted-foreground">{value}</span></div>; }
function Metric({ label, value, active = false }: { label: string; value: string; active?: boolean }) { return <div className={`min-w-0 rounded-md border p-3 ${active ? "border-primary/30 bg-primary/10" : "bg-card"}`}><p className={`truncate text-[9px] font-bold uppercase ${active ? "text-primary" : "text-muted-foreground"}`}>{label}</p><p className={`mt-1 font-mono text-xl font-semibold ${active ? "text-primary" : "text-foreground"}`}>{value}</p></div>; }
function SettingsGroup({ label, description, icon, action, children }: { label: string; description?: string; icon: ReactNode; action?: ReactNode; children?: ReactNode }) { return <section className="border-y bg-card p-3 md:rounded-md md:border"><div className="flex items-center gap-3"><span className="text-primary [&>svg]:size-5">{icon}</span><div className="min-w-0 flex-1"><h2 className="text-sm font-semibold">{label}</h2>{description && <p className="text-xs text-muted-foreground">{description}</p>}</div>{action}</div>{children && <div className="mt-3">{children}</div>}</section>; }