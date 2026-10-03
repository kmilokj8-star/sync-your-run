import { useMemo } from "react";
import { useStored } from "@/lib/run-store";

export type RunTier = "free" | "plus" | "coach";

export type Entitlement =
  | "advancedAnalytics"
  | "advancedCalendar"
  | "advancedWorkouts"
  | "aiInsights"
  | "customDashboard"
  | "advancedPredictions"
  | "routeGenerator"
  | "coachWorkspace";

export const SUBSCRIPTION_KEY = "run_subscription_v1";

const FREE_ENTITLEMENTS: Entitlement[] = [];
const PLUS_ENTITLEMENTS: Entitlement[] = [
  "advancedAnalytics",
  "advancedCalendar",
  "advancedWorkouts",
  "aiInsights",
  "customDashboard",
  "advancedPredictions",
  "routeGenerator",
];
const COACH_ENTITLEMENTS: Entitlement[] = [...PLUS_ENTITLEMENTS, "coachWorkspace"];

export function entitlementsFor(tier: RunTier) {
  if (tier === "coach") return COACH_ENTITLEMENTS;
  if (tier === "plus") return PLUS_ENTITLEMENTS;
  return FREE_ENTITLEMENTS;
}

export function useSubscription() {
  const [state, setState] = useStored<{ tier: RunTier; trialEndsAt?: string }>(
    SUBSCRIPTION_KEY,
    { tier: "free" },
  );

  const trialActive = !!state.trialEndsAt && new Date(state.trialEndsAt).getTime() > Date.now();
  const effectiveTier: RunTier = trialActive && state.tier === "free" ? "plus" : state.tier;

  const value = useMemo(() => ({
    ...state,
    tier: effectiveTier,
    trialActive,
    can: (entitlement: Entitlement) => entitlementsFor(effectiveTier).includes(entitlement),
    startTrial: () => setState({ tier: "free", trialEndsAt: new Date(Date.now() + 30 * 86400000).toISOString() }),
    setTier: (tier: RunTier) => setState({ tier }),
    cancelTrial: () => setState({ tier: "free" }),
  }), [effectiveTier, setState, state, trialActive]);

  return value;
}
