import { createFileRoute } from "@tanstack/react-router";
import { PlansPage } from "@/components/run-pages";
export const Route = createFileRoute("/planes")({ head: () => ({ meta: [{ title: "Planes de entrenamiento — RUN" }, { name: "description", content: "Planes de 5K a maratón cargados en tu calendario." }, { property: "og:title", content: "Planes de entrenamiento — RUN" }, { property: "og:description", content: "Planes de 5K a maratón cargados en tu calendario." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: PlansPage });
