import { createFileRoute } from "@tanstack/react-router";
import { CalendarPage } from "@/components/run-pages";
export const Route = createFileRoute("/calendario")({ head: () => ({ meta: [{ title: "Calendario — RUN" }, { name: "description", content: "Entrenos realizados y planificados mes a mes." }, { property: "og:title", content: "Calendario — RUN" }, { property: "og:description", content: "Entrenos realizados y planificados mes a mes." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: CalendarPage });
