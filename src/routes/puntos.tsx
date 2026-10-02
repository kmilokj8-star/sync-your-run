import { createFileRoute } from "@tanstack/react-router";
import { PointsPage } from "@/components/run-pages";
export const Route = createFileRoute("/puntos")({ head: () => ({ meta: [{ title: "Puntos — RUN" }, { name: "description", content: "Saldo de puntos y canje de recompensas Premium." }, { property: "og:title", content: "Puntos — RUN" }, { property: "og:description", content: "Saldo de puntos y canje de recompensas Premium." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }] }), component: PointsPage });
