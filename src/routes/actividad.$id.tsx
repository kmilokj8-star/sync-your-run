import { createFileRoute } from "@tanstack/react-router";
import { ActivityViewerPage } from "@/components/activity-viewer";

export const Route = createFileRoute("/actividad/$id")({
  head: () => ({ meta: [{ title: "Detalle de actividad — RUN" }, { name: "description", content: "Mapa, parciales por kilómetro, ritmo, elevación y frecuencia cardíaca de tu carrera." }, { property: "og:title", content: "Detalle de actividad — RUN" }, { property: "og:description", content: "Analiza cada carrera con mapa, parciales y métricas de rendimiento." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }),
  component: ActivityViewerPage,
});
