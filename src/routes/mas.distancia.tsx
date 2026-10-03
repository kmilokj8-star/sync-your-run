import { createFileRoute } from "@tanstack/react-router";
import { DistancePlannerPage } from "@/components/distance-planner";

export const Route = createFileRoute("/mas/distancia")({
  head: () => ({ meta: [{ title: "Distancia — Recorridos circulares | RUN" }, { name: "description", content: "Elige salida y distancia y RUN te propone recorridos que vuelven al mismo punto." }, { property: "og:title", content: "Distancia — Recorridos circulares | RUN" }, { property: "og:description", content: "Genera rutas circulares a la distancia que quieras desde tu ubicación." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: DistancePlannerPage,
});
