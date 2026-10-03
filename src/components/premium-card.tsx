import { Link } from "@tanstack/react-router";
import { Brain, ChevronRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePreferences } from "@/lib/preferences";
import { useSubscription } from "@/lib/subscription";

export function RunPlusCard({ compact = false }: { compact?: boolean }) {
  const { locale } = usePreferences();
  const { tier, trialActive } = useSubscription();
  const es = locale === "es";
  const active = tier !== "free" || trialActive;

  return (
    <section className={`rounded-md border border-primary/30 bg-primary/5 ${compact ? "p-3" : "p-4 md:p-5"}`}>
      <div className="flex items-start gap-3">
        <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary/15 text-primary">
          <Sparkles className="size-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <p className="font-display uppercase">RUN+</p>
            {active && <span className="rounded-full bg-primary/15 px-2 py-0.5 text-[10px] font-bold uppercase text-primary">{es ? "Activo" : "Active"}</span>}
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            {es ? "Análisis avanzado, planificación, IA y predicciones." : "Advanced analytics, planning, AI and predictions."}
          </p>
        </div>
        <Brain className="hidden size-5 text-primary sm:block" />
      </div>
      {!active && (
        <div className="mt-3 grid gap-2 text-xs text-muted-foreground sm:grid-cols-3">
          <span>✓ {es ? "Carga avanzada" : "Advanced load"}</span>
          <span>✓ {es ? "IA de entrenamiento" : "Training AI"}</span>
          <span>✓ {es ? "Dashboard personal" : "Custom dashboard"}</span>
        </div>
      )}
      <Button asChild variant={active ? "outline" : "default"} className="mt-4 min-h-10 w-full">
        <Link to="/mas/suscripcion">
          {active ? (es ? "Gestionar RUN+" : "Manage RUN+") : (es ? "Explorar RUN+" : "Explore RUN+")}
          <ChevronRight />
        </Link>
      </Button>
    </section>
  );
}
