import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Check, Sparkles } from "lucide-react";
import { AppShell, TopBar } from "@/components/app-shell";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences";
import { useSubscription } from "@/lib/subscription";

export const Route = createFileRoute("/mas/suscripcion")({
  head: () => ({ meta: [{ title: "RUN+ — RUN" }, { name: "description", content: "Funciones avanzadas de entrenamiento y análisis de RUN." }] }),
  component: SubscriptionPage,
});

function SubscriptionPage() {
  const { locale } = usePreferences();
  const { tier, trialActive, startTrial, cancelTrial, setTier } = useSubscription();
  const es = locale === "es";
  const plus = tier === "plus" || tier === "coach";

  return (
    <AppShell>
      <div className="mx-auto max-w-5xl space-y-4 md:space-y-6">
        <TopBar />
        <header className="border-b pb-4">
          <p className="text-xs font-bold uppercase text-primary">RUN / Premium</p>
          <h1 className="mt-1 font-display text-2xl uppercase md:text-4xl">RUN+</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
            {es ? "Mantén todas las funciones esenciales gratis y desbloquea profundidad, automatización y personalización cuando las necesites." : "Keep essential features free and unlock depth, automation and personalization when you need them."}
          </p>
        </header>

        <section className="grid gap-3 md:grid-cols-2">
          <PlanCard
            title="RUN Free"
            subtitle={es ? "Para todos los corredores." : "For every runner."}
            active={tier === "free" && !trialActive}
            items={es ? ["Registrar y guardar carreras", "Historial y mapas", "Calendario básico", "Planes gratuitos", "Comunidad y retos", "Integraciones disponibles"] : ["Record and save runs", "History and maps", "Basic calendar", "Free plans", "Community and challenges", "Available integrations"]}
            button={null}
          />
          <PlanCard
            title="RUN+"
            subtitle={es ? "Para entrenamiento más profundo." : "For deeper training."}
            active={plus || trialActive}
            items={es ? ["Carga y tendencias avanzadas", "Constructor de entrenamientos", "Planificación avanzada", "Predicciones de carrera", "Dashboard personalizable", "IA de entrenamiento"] : ["Advanced load and trends", "Advanced workout builder", "Advanced planning", "Race predictions", "Custom dashboard", "Training AI"]}
            button={
              trialActive ? (
                <Button variant="outline" className="w-full" onClick={cancelTrial}>{es ? "Cancelar prueba" : "Cancel trial"}</Button>
              ) : plus ? (
                <Button variant="outline" className="w-full" onClick={() => setTier("free")}>{es ? "Volver a Free" : "Return to Free"}</Button>
              ) : (
                <Button className="w-full" onClick={startTrial}>{es ? "Probar 30 días" : "Try 30 days"}</Button>
              )
            }
          />
        </section>

        {trialActive && (
          <div className="flex items-center gap-3 rounded-md border border-primary/30 bg-primary/10 p-3 text-sm">
            <Sparkles className="size-5 shrink-0 text-primary" />
            <span className="flex-1">{es ? "Tu prueba de RUN+ está activa durante 30 días. Tus datos no se perderán si vuelves a Free." : "Your RUN+ trial is active for 30 days. Your data is kept if you return to Free."}</span>
          </div>
        )}

        <section className="rounded-md border bg-card p-4 md:p-5">
          <h2 className="font-display uppercase">{es ? "Principio de RUN" : "RUN principle"}</h2>
          <p className="mt-2 text-sm text-muted-foreground">{es ? "RUN no bloquea el registro ni el historial básico detrás de un pago. RUN+ cobra por profundidad, automatización y personalización." : "RUN does not lock recording or basic history behind a paywall. RUN+ is for depth, automation and personalization."}</p>
        </section>
      </div>
    </AppShell>
  );
}

function PlanCard({ title, subtitle, items, active, button }: { title: string; subtitle: string; items: string[]; active: boolean; button: ReactNode }) {
  return (
    <section className={`rounded-md border bg-card p-4 md:p-5 ${active ? "border-primary/50" : ""}`}>
      <div className="flex items-start justify-between gap-3">
        <div><h2 className="font-display text-xl uppercase">{title}</h2><p className="mt-1 text-xs text-muted-foreground">{subtitle}</p></div>
        {active && <span className="rounded-full bg-primary/15 px-2 py-1 text-[10px] font-bold uppercase text-primary">Active</span>}
      </div>
      <ul className="mt-4 space-y-2 text-sm">{items.map((item) => <li key={item} className="flex gap-2"><Check className="mt-0.5 size-4 text-primary" /><span>{item}</span></li>)}</ul>
      {button && <div className="mt-5">{button}</div>}
    </section>
  );
}
