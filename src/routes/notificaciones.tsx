import { createFileRoute } from "@tanstack/react-router";
import { NotificationsPage } from "@/components/run-pages";
export const Route = createFileRoute("/notificaciones")({ head: () => ({ meta: [{ title: "Notificaciones — RUN" }, { name: "description", content: "Avisos de retos, entrenos y equipo." }, { property: "og:title", content: "Notificaciones — RUN" }, { property: "og:description", content: "Avisos de retos, entrenos y equipo." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: NotificationsPage });
