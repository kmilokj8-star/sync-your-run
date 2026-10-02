import type { ReactNode } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  Activity, Bell, BookOpen, CalendarDays, ChevronRight, CircleDot, Ellipsis, Footprints, Gift, Home, LogOut, Settings, ShieldCheck, Trophy, Watch,
} from "lucide-react";

type NavHref = "/" | "/calendario" | "/registrar" | "/actividades" | "/equipo" | "/retos" | "/puntos" | "/planes" | "/notificaciones" | "/dispositivos" | "/mas";
import logo from "@/assets/logo-mark.png.asset.json";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences";

export function AppShell({ children }: { children: ReactNode }) {
  const pathname = useLocation().pathname;
  return (
    <div className="flex min-h-screen bg-background pb-[calc(5.5rem+env(safe-area-inset-bottom))] text-foreground md:pb-0">
      <Sidebar pathname={pathname} />
      <main className="min-w-0 flex-1 px-3 py-3 sm:px-6 md:px-10 md:py-9">{children}</main>
      <MobileNav pathname={pathname} />
    </div>
  );
}

export function TopBar() {
  const { t } = usePreferences();
  return (
    <div className="sticky top-0 z-20 -mx-3 -mt-3 grid grid-cols-[minmax(0,1fr)_auto] items-center border-b bg-background/95 px-3 py-2.5 backdrop-blur md:hidden">
      <div className="flex min-w-0 items-center gap-2">
        <Link to="/" className="flex min-w-0 items-center gap-2">
          <span className="size-6 shrink-0 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} />
          <span className="truncate font-display text-base uppercase">RUN</span>
        </Link>
      </div>
       <Button asChild variant="ghost" size="icon" className="size-11 shrink-0" aria-label={t("settings")}><Link to="/mas/configuracion"><Settings className="size-5" /></Link></Button>
    </div>
  );
}

function Sidebar({ pathname }: { pathname: string }) {
  const { t, locale } = usePreferences();
  const L = (es: string, en: string) => (locale === "es" ? es : en);
  const items: { icon: typeof Home; label: string; href?: NavHref }[] = [
    { icon: Home, label: t("home"), href: "/" },
    { icon: CalendarDays, label: L("Calendario", "Calendar"), href: "/calendario" },
    { icon: CircleDot, label: L("Registrar", "Record"), href: "/registrar" },
    { icon: Activity, label: L("Actividades", "Activities"), href: "/actividades" },
    { icon: Footprints, label: L("Equipo", "Gear"), href: "/equipo" },
    { icon: Trophy, label: L("Retos", "Challenges"), href: "/retos" },
    { icon: Gift, label: L("Puntos", "Points"), href: "/puntos" },
    { icon: BookOpen, label: L("Planes", "Plans"), href: "/planes" },
    { icon: Bell, label: L("Notificaciones", "Notifications"), href: "/notificaciones" },
    { icon: Watch, label: t("appsDevices"), href: "/dispositivos" },
    { icon: Ellipsis, label: t("more"), href: "/mas" },
  ];
  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r bg-sidebar p-5 md:flex">
      <div className="mb-10 flex items-center gap-3 px-2">
        <Link to="/" className="flex items-center gap-3">
          <span className="size-8 bg-primary" style={{ mask: `url(${logo.url}) center/contain no-repeat`, WebkitMask: `url(${logo.url}) center/contain no-repeat` }} />
          <span className="font-display text-2xl uppercase">run</span>
        </Link>
      </div>
       <p className="mb-3 px-3 text-[10px] font-bold uppercase text-muted-foreground">{t("training")}</p>
      <nav className="space-y-1">
         {items.map(({ icon: I, label, href }) => {
           const active = href === "/mas" ? pathname.startsWith("/mas") : href === pathname;
          return href ? (
            <Link
              key={label}
              to={href}
              aria-current={active ? "page" : undefined}
              className={`flex items-center gap-3 rounded-md border-l-2 px-3 py-2.5 text-sm transition-colors ${active ? "border-primary bg-sidebar-accent font-semibold text-sidebar-accent-foreground" : "border-transparent text-muted-foreground hover:bg-sidebar-accent/50 hover:text-foreground"}`}
            >
              <I className="size-4" /> <span className="flex-1">{label}</span>{active && <ChevronRight className="size-3" />}
            </Link>
          ) : (
            <div key={label} className="flex cursor-default items-center gap-3 rounded-md border-l-2 border-transparent px-3 py-2.5 text-sm text-muted-foreground/60">
              <I className="size-4" /> <span className="flex-1">{label}</span>
            </div>
          );
        })}
      </nav>
      <div className="mt-auto space-y-4">
        <div className="rounded-md border bg-muted/40 p-3">
           <div className="flex items-center gap-2 text-xs font-semibold text-primary"><ShieldCheck className="size-4" /> {t("protectedData")}</div>
           <p className="mt-1 text-xs text-muted-foreground">{t("revokeAnytime")}</p>
        </div>
         <div className="flex items-center gap-3 px-3 py-2 text-sm text-muted-foreground"><LogOut className="size-4" /> {t("logout")}</div>
      </div>
    </aside>
  );
}

function MobileNav({ pathname }: { pathname: string }) {
  const { t, locale } = usePreferences();
  const items: { icon: typeof Home; label: string; href?: NavHref }[] = [
    { icon: Home, label: t("home"), href: "/" },
    { icon: Activity, label: t("activity"), href: "/actividades" },
    { icon: CircleDot, label: locale === "es" ? "Registrar" : "Record", href: "/registrar" },
    { icon: Watch, label: t("devices"), href: "/dispositivos" },
    { icon: Ellipsis, label: t("more"), href: "/mas" },
  ];
  return (
    <nav aria-label="Navegación principal" className="fixed inset-x-0 bottom-0 z-30 border-t bg-sidebar/95 shadow-[0_-8px_24px_color-mix(in_oklch,var(--background)_70%,transparent)] backdrop-blur-xl md:hidden">
      <div className="grid min-h-17 grid-cols-5 items-stretch px-1 pb-[max(env(safe-area-inset-bottom),0.25rem)] pt-1">
         {items.map(({ icon: Icon, label, href }) => {
           const active = href === "/mas" ? pathname.startsWith("/mas") : href === pathname;
          const classes = `relative flex h-auto min-h-14 min-w-0 flex-col items-center justify-center gap-1 rounded-md px-1 py-1.5 text-[10px] font-semibold ${active ? "bg-primary/10 text-primary" : "text-muted-foreground hover:text-foreground"}`;
          const content = (
            <>
              <Icon className="size-5 shrink-0" />
              <span className="max-w-full truncate">{label}</span>
              {active && <span aria-hidden="true" className="absolute inset-x-3 bottom-0 h-0.5 rounded-full bg-primary" />}
            </>
          );
          return href ? (
            <Link key={label} to={href} aria-current={active ? "page" : undefined} className={classes}>{content}</Link>
          ) : (
            <div key={label} aria-current={active ? "page" : undefined} className={classes}>{content}</div>
          );
        })}
      </div>
    </nav>
  );
}
