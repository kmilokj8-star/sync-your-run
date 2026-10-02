import { createFileRoute } from "@tanstack/react-router";
import { ActivitiesPage } from "@/components/run-pages";
export const Route = createFileRoute("/actividades")({ head: () => ({ meta: [{ title: "Actividades — RUN" }, { name: "description", content: "Todas tus carreras importadas, manuales y registradas." }, { property: "og:title", content: "Actividades — RUN" }, { property: "og:description", content: "Todas tus carreras importadas, manuales y registradas." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: ActivitiesPage });
